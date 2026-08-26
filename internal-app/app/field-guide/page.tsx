import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isClerkConfigured } from "@/lib/internal-config";
import { trainingModules, verificationQueue } from "@/lib/training-content";

const rules = [
  {
    title: "Önce ürün + formu doğrula",
    text: "KidneyWel Tablet ile KidneyWel Liquid gibi formlar ayrı kayıttır. Bir formun dozunu veya içeriğini diğerine taşıma.",
  },
  {
    title: "Statüye bak",
    text: "ONAYLI bilgi kullanılabilir. KISMEN ONAYLI bilgide yalnız doğrulanmış alanı kullan. DOĞRULAMA GEREKİYOR ise tahmin etme.",
  },
  {
    title: "Dozda boşluk varsa dur",
    text: "Ara kilo, yüksek kilo veya eksik kullanım süresi gibi alanlarda kendi klinik tahminini VetWel resmi bilgisi gibi sunma.",
  },
  {
    title: "Tedavi dili kullanma",
    text: "Ürünü tanı veya tedavinin yerine koyma. Destek alanını, formülasyon mantığını ve veteriner hekim bağlamını anlat.",
  },
];

const quickAnswers = [
  {
    q: "KidneyWel Tablet fosfor bağlayıcı mı?",
    a: "Hayır. Fosfor bağlayıcı olarak konumlandırılmaz; fosfor emilimini azaltmaya yönelik destek yaklaşımı ve antioksidan destek anlatılır.",
  },
  {
    q: "KidneyWel Liquid dozu?",
    a: "Her uygulamada 0,5 mL/kg, günde 2 kez. Kullanım süresi veteriner hekimin klinik değerlendirmesine göre belirlenir.",
  },
  {
    q: "15 kg köpek için SkinWel?",
    a: "Ara kilo yuvarlama kuralı doğrulanmamıştır. Kesin tablet sayısı tahmin edilmez; doğrulama gerekir.",
  },
  {
    q: "Breathe Ease 22 lb üzeri köpek?",
    a: "Resmi yüksek ağırlık doz tablosu doğrulanana kadar doz tahmin edilmez.",
  },
  {
    q: "Cleanse evde uygulanır mı?",
    a: "Mevcut kayıt veteriner klinik protokolü içindedir. Onaylanmış ev kullanım talimatı yoksa pet sahibine ev uygulaması önerilmez.",
  },
  {
    q: "LiverWel Liquid dozu?",
    a: "Doğrulama gerekiyor. LiverWel Tablet dozu Liquid forma taşınmaz.",
  },
];

export default async function FieldGuidePage() {
  if (!isClerkConfigured()) redirect("/setup");

  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <main className="shell">
      <div className="page">
        <Link className="back-link" href="/dashboard">← Ana panele dön</Link>
        <span className="eyebrow">Saha Hızlı Rehber</span>
        <h1 className="module-title">Klinikte 30 saniyede doğru bilgi</h1>
        <p className="module-subtitle">
          Görüşme öncesi veya görüşme sırasında ürün/form statüsünü, kayıtlı kullanım bilgisini
          ve iletişim sınırını hızlıca kontrol et. Bu ekran tahmin yapmak yerine doğru noktada
          durmayı da öğretir.
        </p>

        <section className="field-rule-grid">
          {rules.map((rule, index) => (
            <article className="field-rule" key={rule.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>{rule.title}</strong>
                <p>{rule.text}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <span className="eyebrow">Ürün / form matrisi</span>
              <h2>Hızlı saha kartları</h2>
            </div>
            <p>{trainingModules.length} eğitim kaydı</p>
          </div>

          <div className="field-product-grid">
            {trainingModules.map((module) => (
              <article className="field-product-card" key={module.slug}>
                <div className="product-card-topline">
                  <span className={`content-badge ${module.status === "ONAYLI" ? "content-badge-ready" : "content-badge-partial"}`}>
                    {module.status}
                  </span>
                  <span className="product-form">{module.form}</span>
                </div>
                <h3>{module.product}</h3>
                <p className="field-support">{module.supportArea}</p>
                <div className="field-mini-section">
                  <strong>Doz / kullanım</strong>
                  <p>{module.dose}</p>
                </div>
                <div className="field-mini-section">
                  <strong>Klinikte kısa anlatım</strong>
                  <p>“{module.clinicPitch}”</p>
                </div>
                {module.limitations?.length ? (
                  <div className="field-warning">
                    <strong>Dur ve doğrula</strong>
                    <ul>
                      {module.limitations.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                ) : null}
                <Link className="mini-link" href={`/training/${module.slug}`}>Tam eğitimi aç →</Link>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <span className="eyebrow">Hızlı cevap</span>
              <h2>Sahada sık gelecek sorular</h2>
            </div>
          </div>
          <div className="checkpoint-list">
            {quickAnswers.map((item) => (
              <details className="checkpoint" key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <span className="eyebrow">Kırmızı bölge</span>
              <h2>Şu anda kesin cevap verilmemesi gereken kayıtlar</h2>
            </div>
          </div>
          <div className="info-panel">
            {verificationQueue.map((item) => (
              <div className="progress-row" key={item.name}>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.note}</span>
                </div>
                <span className="status">{item.status}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section placeholder">
          <h2>Bir soru rehberde yoksa</h2>
          <p>
            AI Soru-Cevap alanına sor. Asistan önce VetWel bilgi tabanını arayacak; bilgi kayıtlı
            değilse veya doğrulama bekliyorsa bunu açıkça belirtmesi gerekir.
          </p>
          <p><Link className="back-link" href="/ask">AI’a sor →</Link></p>
        </section>
      </div>
    </main>
  );
}
