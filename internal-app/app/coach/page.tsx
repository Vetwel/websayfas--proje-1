import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isClerkConfigured } from "@/lib/internal-config";
import { verifiedTrainingModules } from "@/lib/training-content";

const scenarios = [
  {
    title: "“KidneyWel fosfor bağlayıcı mı?”",
    answer:
      "Hayır. KidneyWel Tablet fosfor bağlayıcı olarak konumlandırılmıyor; yaklaşım fosfor emilimini azaltmaya yönelik destek ve antioksidan destektir.",
    boundary: "Mekanizma detayını doğrulanmış formülasyon metninin dışına taşırma.",
  },
  {
    title: "“Bu ürün hastalığı tedavi eder mi?”",
    answer:
      "VetWel iletişimi ürünü tanı veya tedavinin yerine koymaz. İlgili sağlık alanını destekleme amacı ve doğrulanmış formülasyon mantığı anlatılır.",
    boundary: "Tedavi eder, iyileştirir, kesin sonuç verir gibi güçlü ilaç dili kullanma.",
  },
  {
    title: "“15 kg köpeğe SkinWel kaç tablet?”",
    answer:
      "Veritabanında her 10 kg için 1 tablet/doz kuralı var; ancak 15 kg gibi ara ağırlıklarda resmi yuvarlama kuralı doğrulanmış değil. Tahmin etmeden doğrulama gerekir.",
    boundary: "1 veya 2 tablete kendi başına yuvarlama yapma.",
  },
  {
    title: "“LiverWel Liquid dozu Tablet ile aynı mı?”",
    answer:
      "Hayır, bunu varsayamayız. Liquid form ayrı ürün/form kaydıdır ve dozu doğrulanana kadar Tablet bilgisini taşımıyoruz.",
    boundary: "Formlar arasında doz, içerik veya claim kopyalama.",
  },
  {
    title: "“Cleanse evde uygulanabilir mi?”",
    answer:
      "Mevcut VetWel kaydı Cleanse’i veteriner klinik protokolü içinde tarif ediyor. Evde kullanım güvenliği veya talimatı ayrıca onaylanmadıkça önerilmez.",
    boundary: "Pet sahibine onaylanmamış ev uygulama protokolü verme.",
  },
];

const coachPrompts = [
  "10 dakika sonra bir veterinerle KidneyWel Tablet konuşacağım. Bana 30 saniyelik açılış, 3 temel fark ve 3 olası itiraz hazırla.",
  "Veteriner rolüne gir. Bana KidneyWel Liquid ile ilgili zor sorular sor; her cevabımdan sonra hatam varsa düzelt.",
  "CalmWel Tablet’i sedasyon iddiasına kaçmadan 30 saniyede nasıl anlatacağımı çalıştır.",
  "LiverWel Tablet görüşmesi için teknik ama kısa bir konuşma akışı hazırla ve sonunda beni sınava çek.",
];

export default async function CoachPage() {
  if (!isClerkConfigured()) {
    redirect("/setup");
  }

  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <main className="shell">
      <div className="page">
        <Link className="back-link" href="/dashboard">← Ana panele dön</Link>
        <span className="eyebrow">Modül 02</span>
        <h1 className="module-title">Satış Koçu</h1>
        <p className="module-subtitle">
          Amaç ezberlenmiş satış cümlesi vermek değil; veteriner görüşmesinde doğru bilgiyi kısa,
          kontrollü ve güvenilir şekilde aktarabilmek. Koçluk içerikleri yalnız doğrulanmış VetWel
          kayıtlarından ve onaylı iletişim sınırlarından oluşturulur.
        </p>

        <section className="section">
          <div className="section-head">
            <div>
              <span className="eyebrow">30 saniyelik ürün anlatımı</span>
              <h2>Doğrulanmış saha açılışları</h2>
            </div>
            <p>{verifiedTrainingModules.length} hazır ürün/form</p>
          </div>
          <div className="product-grid">
            {verifiedTrainingModules.map((module) => (
              <article className="product-card coach-pitch-card" key={module.slug}>
                <div className="product-card-topline">
                  <span className="content-badge content-badge-ready">{module.form}</span>
                  <Link className="mini-link" href={`/training/${module.slug}`}>Eğitim →</Link>
                </div>
                <strong>{module.product}</strong>
                <p>“{module.clinicPitch}”</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <span className="eyebrow">İtiraz provası</span>
              <h2>Gerçek saha sorularına doğru cevap</h2>
            </div>
          </div>
          <div className="scenario-grid">
            {scenarios.map((scenario, index) => (
              <article className="scenario-card" key={scenario.title}>
                <span className="scenario-index">{String(index + 1).padStart(2, "0")}</span>
                <h3>{scenario.title}</h3>
                <p className="scenario-answer">{scenario.answer}</p>
                <div className="scenario-boundary">
                  <strong>Sınır</strong>
                  <span>{scenario.boundary}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section coach-framework">
          <div>
            <span className="eyebrow">Saha standardı</span>
            <h2>VetWel cevap modeli</h2>
          </div>
          <div className="framework-steps">
            <article><span>1</span><strong>Kısa cevap</strong><p>Önce 1–3 cümlede klinikte söylenebilir net yanıt ver.</p></article>
            <article><span>2</span><strong>Doğrulanmış detay</strong><p>Gerekirse yalnız kayıtlı doz, formülasyon ve kullanım bilgisini ekle.</p></article>
            <article><span>3</span><strong>Sınırı koru</strong><p>Tedavi iddiası, form karışımı veya veri boşluğunda tahmin yapma.</p></article>
            <article><span>4</span><strong>Veteriner bağlamı</strong><p>Ürünü veteriner hekimin değerlendirme ve bakım planına destek olarak konumlandır.</p></article>
          </div>
        </section>

        <section className="section placeholder coach-prompts">
          <h2>AI ile canlı prova</h2>
          <p>AI Soru-Cevap alanına aşağıdaki promptlardan birini yazarak saha provası başlatabilirsin:</p>
          <div className="prompt-list">
            {coachPrompts.map((prompt) => <div className="prompt-chip" key={prompt}>{prompt}</div>)}
          </div>
          <p><Link className="back-link" href="/ask">AI ile prova başlat →</Link></p>
        </section>
      </div>
    </main>
  );
}
