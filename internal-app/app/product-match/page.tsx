import Link from "next/link";
import { auth } from "@/lib/clerk-server";
import { redirect } from "next/navigation";
import { isClerkConfigured } from "@/lib/internal-config";
import { internalTrainingModules as trainingModules } from "@/lib/internal-training-content";
import styles from "./product-match.module.css";

const needMap = [
  {
    need: "Böbrek / renal destek",
    slugs: ["kidneywel-tablet", "kidneywel-liquid"],
    opening: "Renal sağlık desteği ihtiyacında önce KidneyWel ailesi konuşulur; Tablet ve Liquid ayrı form/doz kayıtlarıdır.",
    boundary: "Form seçimini veya dozu diğer formdan türetme. Klinik planın yerine koyma.",
  },
  {
    need: "Karaciğer / hepatik destek",
    slugs: ["liverwel-tablet"],
    opening: "Hepatik destek konuşulacaksa LiverWel Tablet’in kayıtlı ürün/form bilgisi üzerinden ilerlenir.",
    boundary: "LiverWel Liquid bilgisi netleşmeden Tablet dozunu veya içeriğini Liquid forma taşıma.",
  },
  {
    need: "Stres / sakinlik / adaptasyon",
    slugs: ["calmwel-tablet"],
    opening: "Sakinlik, davranış dengesi ve çevresel adaptasyon desteğinde CalmWel Tablet konuşulabilir.",
    boundary: "Sedasyon veya psikolojik bir problemi tedavi ettiği iddiasını kullanma.",
  },
  {
    need: "Deri ve tüy sağlığı",
    slugs: ["skinwel-tablet"],
    opening: "Deri ve tüy sağlığı desteğinde SkinWel konuşulur; kayıtlı doz temeli kullanılabilir.",
    boundary: "Ara kilo yuvarlaması ve tam 20 içerik listesi net değilse kesinleştirme.",
  },
  {
    need: "Sindirim / mikrobiyota",
    slugs: ["lactowel-tablet"],
    opening: "Sindirim ve mikrobiyota desteğinde LactoWel, probiotic + botanical yaklaşımıyla konuşulur.",
    boundary: "Ara kilo yuvarlamasını veya kaydı bulunmayan tam formülü tahmin etme.",
  },
  {
    need: "Solunum sistemi desteği",
    slugs: ["breathe-ease"],
    opening: "Solunum sistemi desteğinde Breathe Ease kedi ve köpek için konuşulabilir.",
    boundary: "22 lb üzeri köpek dozu net değilse tahmin edilmez; tedavi/cough-relief iddiası kullanılmaz.",
  },
  {
    need: "Struvit ilişkili üriner klinik kullanım",
    slugs: ["cleanse"],
    opening: "Cleanse yalnız veteriner klinik protokolü bağlamında ele alınır.",
    boundary: "Pet sahibine evde uygulama talimatı verme; güçlü ham klinik claim'i aynen kullanma.",
  },
  {
    need: "Onkolojik bakım / özel beslenme desteği",
    slugs: ["malign-detox"],
    opening: "Onkolojik bakım bağlamında Malign Detox ana tedavi planına tamamlayıcı genel kondisyon, besinsel ve antioksidan destek ekseninde konuşulur.",
    boundary: "Kanseri tedavi eder veya metastazı durdurur/önler şeklinde kesin klinik sonuç iddiası kullanma.",
  },
];

export default async function ProductMatchPage() {
  if (!isClerkConfigured()) redirect("/setup");
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <main className="shell">
      <div className="page">
        <Link className="back-link" href="/dashboard">← Ana panele dön</Link>
        <span className="eyebrow">İleri Saha Eğitimi</span>
        <h1 className="module-title">Hangi ihtiyaçta hangi VetWel?</h1>
        <p className="module-subtitle">
          Bu ekran tanı koymak için değil, veteriner görüşmesinde doğru VetWel ürün ailesini doğru destek alanıyla eşleştirmek için kullanılır. Nihai ürün/form ve kullanım kararı veteriner hekimin klinik değerlendirmesine bağlıdır.
        </p>

        <section className={styles.grid}>
          {needMap.map((item, index) => {
            const modules = item.slugs
              .map((slug) => trainingModules.find((module) => module.slug === slug))
              .filter(Boolean);

            return (
              <article className={styles.card} key={item.need}>
                <div className={styles.head}>
                  <span className="scenario-index">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <span className="eyebrow">İhtiyaç alanı</span>
                    <h2>{item.need}</h2>
                  </div>
                </div>

                <p className={styles.opening}>{item.opening}</p>

                <div className={styles.products}>
                  {modules.map((module) => module && (
                    <Link className={styles.product} href={`/training/${module.slug}`} key={module.slug}>
                      <div>
                        <strong>{module.product} {module.form}</strong>
                        <span>{module.supportArea}</span>
                      </div>
                      <span className="product-form">{module.form}</span>
                    </Link>
                  ))}
                </div>

                <div className="scenario-boundary">
                  <strong>Sınır</strong>
                  <span>{item.boundary}</span>
                </div>
              </article>
            );
          })}
        </section>

        <section className="section coach-framework">
          <div>
            <span className="eyebrow">3 soruluk saha filtresi</span>
            <h2>Ürünü konuşmadan önce</h2>
          </div>
          <div className="framework-steps">
            <article><span>1</span><strong>Hangi destek alanı?</strong><p>Önce konuşmanın renal, hepatik, stres, deri, sindirim, solunum, üriner klinik veya onkolojik destek eksenini netleştir.</p></article>
            <article><span>2</span><strong>Hangi form?</strong><p>Tablet/Liquid/saşe/steril sıvı ayrımını netleştir; bir formun bilgisini diğerine taşıma.</p></article>
            <article><span>3</span><strong>Bilgi kayıtta net mi?</strong><p>Kayıtlı bilgiyi kullan. Eksik veya net olmayan noktada tahmin yürütmeden dur ve resmi bilgiyi netleştir.</p></article>
          </div>
        </section>

        <section className="section placeholder">
          <h2>AI ile ürün eşleştirme provası</h2>
          <p>
            AI&apos;a bir klinik görüşme bağlamı ver: “Veteriner renal destek ürünleriyle ilgileniyor. Hangi VetWel ürün ailesiyle başlamalıyım ve hangi sınırları korumalıyım?” Asistan yalnız VetWel bilgi tabanında kayıtlı bilgiler üzerinden cevap vermelidir.
          </p>
          <p><Link className="back-link" href="/ask">AI ile çalış →</Link></p>
        </section>
      </div>
    </main>
  );
}
