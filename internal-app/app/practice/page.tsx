import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isClerkConfigured } from "@/lib/internal-config";

const cases = [
  {
    level: "Temel",
    title: "Veteriner: “KidneyWel fosfor bağlayıcı mı?”",
    task: "30 saniyede cevap ver. Ürün farkını anlat ama yanlış mekanizma iddiasına girme.",
    ideal: "Hayır. KidneyWel Tablet fosfor bağlayıcı olarak konumlandırılmıyor. Yaklaşım fosfor emilimini azaltmaya yönelik destek ve antioksidan destek üzerinden anlatılıyor.",
    redFlags: ["Güçlü fosfor bağlayıcıdır demek", "Böbrek hastalığını tedavi eder demek", "Liquid formu Tablet ile aynıymış gibi anlatmak"],
  },
  {
    level: "Temel",
    title: "Veteriner: “15 kg köpeğe SkinWel kaç tablet?”",
    task: "Doz bilgisini güvenli şekilde cevapla; veri boşluğunu saklama.",
    ideal: "Kayıtta köpek için her 10 kg başına 1 tablet/doz temeli var; ancak 15 kg gibi ara ağırlıklar için resmi yuvarlama kuralı doğrulanmış değil. Bu nedenle 1 veya 2 tablete kendi başıma yuvarlamam.",
    redFlags: ["Otomatik olarak 2 tablete yuvarlamak", "Ara kilo kuralını varmış gibi anlatmak", "Doz boşluğunu gizlemek"],
  },
  {
    level: "Orta",
    title: "Veteriner: “CalmWel sedatif mi?”",
    task: "Ürünü güçlü bir şekilde konumlandır ama sedasyon iddiasına kaçma.",
    ideal: "CalmWel Tablet sedatif olarak konumlandırılmıyor. Stresli veya değişken koşullarda sakinlik, davranış dengesi ve çevresel adaptasyon desteği üzerinden anlatılıyor; amaç belirgin sedasyon değil.",
    redFlags: ["Sedatiftir demek", "Davranış problemini tedavi eder demek", "CalmWel Liquid dozunu Tablet üzerinden söylemek"],
  },
  {
    level: "Orta",
    title: "Veteriner: “Breathe Ease’i 30 lb köpeğe nasıl verelim?”",
    task: "Kayıtlı bilgi ile veri boşluğunu ayır.",
    ideal: "Kedi için 1 tüp/gün ve köpekte 11 lb’a kadar 1 tüp, 11–22 lb için 2 tüp bilgisi kayıtlı. 22 lb üzeri için resmi doz tablosu doğrulanmadığı için 30 lb dozunu tahmin etmem; doğrulama gerekir.",
    redFlags: ["22 lb üzeri dozu matematikle tahmin etmek", "Cough relief gibi güçlü tedavi dili kullanmak", "Kedi ve köpek dozunu aynı kabul etmek"],
  },
  {
    level: "İleri",
    title: "Veteriner: “Cleanse’i sahibi evde uygulayabilir mi?”",
    task: "Klinik protokol sınırını koru.",
    ideal: "Mevcut VetWel kaydı Cleanse’i veteriner klinik protokolü içinde tarif ediyor. Evde kullanım güvenliği veya talimatı ayrıca onaylanmadıkça pet sahibine ev uygulaması önerilmez.",
    redFlags: ["Evde kullanım protokolü uydurmak", "Dozu değiştirip ev kullanımına çevirmek", "Ham güçlü klinik claim’i aynen kullanmak"],
  },
  {
    level: "İleri",
    title: "Veteriner: “Neden VetWel’i kullanayım; hepsi supplement değil mi?”",
    task: "Markayı abartısız ama ikna edici biçimde anlat.",
    ideal: "VetWel yaklaşımı tek bir genel supplement mesajından çok hedeflenen sağlık alanına, ürün/form ayrımına ve doğrulanmış kullanım bilgisine dayanıyor. Biz ürünün destek alanını, formülasyon mantığını ve hangi noktada neyi söylemememiz gerektiğini net tutuyoruz; ürünü tanı veya tedavinin yerine koymuyoruz.",
    redFlags: ["Rakiplerden kesin üstünlük iddiası", "Tedavi garantisi", "Doğrulanmamış klinik sonuçlar"],
  },
];

export default async function PracticePage() {
  if (!isClerkConfigured()) redirect("/setup");
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <main className="shell">
      <div className="page">
        <Link className="back-link" href="/dashboard">← Ana panele dön</Link>
        <span className="eyebrow">İleri Saha Eğitimi</span>
        <h1 className="module-title">Veteriner Görüşmesi Simülasyonu</h1>
        <p className="module-subtitle">
          Önce soruyu kendin cevapla. Sonra ideal cevabı aç ve hangi cümlelerin VetWel bilgi güvenliği standardını ihlal edeceğini kontrol et.
        </p>

        <section className="practice-list">
          {cases.map((item, index) => (
            <article className="practice-card" key={item.title}>
              <div className="practice-head">
                <span className="scenario-index">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <span className="eyebrow">{item.level}</span>
                  <h2>{item.title}</h2>
                </div>
              </div>
              <div className="practice-task">
                <strong>Görev</strong>
                <p>{item.task}</p>
              </div>
              <details className="checkpoint practice-answer">
                <summary>İdeal cevabı göster</summary>
                <p>{item.ideal}</p>
              </details>
              <details className="checkpoint practice-risks">
                <summary>Kırmızı bayrakları göster</summary>
                <ul className="training-list">
                  {item.redFlags.map((flag) => <li key={flag}>{flag}</li>)}
                </ul>
              </details>
            </article>
          ))}
        </section>

        <section className="section coach-framework">
          <div>
            <span className="eyebrow">Görüşme formülü</span>
            <h2>4 adımda güvenli ve güçlü cevap</h2>
          </div>
          <div className="framework-steps">
            <article><span>1</span><strong>Soruyu sahiplen</strong><p>Önce doğrudan ve kısa cevap ver; konuyu dağıtma.</p></article>
            <article><span>2</span><strong>Farkı anlat</strong><p>Doğrulanmış destek alanı, formülasyon mantığı veya kullanım avantajını ekle.</p></article>
            <article><span>3</span><strong>Sınırı koru</strong><p>Tedavi garantisi, form karışımı veya veri boşluğunda tahmin yapma.</p></article>
            <article><span>4</span><strong>Veteriner bağlamına dön</strong><p>Ürünü veteriner hekimin değerlendirme ve bakım planına destek olarak konumlandır.</p></article>
          </div>
        </section>

        <section className="section placeholder">
          <h2>Canlı AI provası</h2>
          <p>
            AI&apos;a “Veteriner rolüne gir. Bana zor bir VetWel itirazı sor. Cevabımı bekle, sonra doğru/kısmen doğru/düzelt şeklinde puanla.” yaz. Asistan her turda tek itirazla ilerleyecek şekilde yapılandırıldı.
          </p>
          <p><Link className="back-link" href="/ask">Canlı prova başlat →</Link></p>
        </section>
      </div>
    </main>
  );
}
