import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isClerkConfigured } from "@/lib/internal-config";
import { trainingModules } from "@/lib/training-content";

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
    opening: "Hepatik destek konuşulacaksa doğrulanmış eğitim şu an LiverWel Tablet üzerindedir.",
    boundary: "LiverWel Liquid doğrulanmadan Tablet dozunu veya içeriğini Liquid forma taşıma.",
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
    boundary: "Ara kilo yuvarlaması ve tam 20 içerik listesi doğrulanmadan kesinleştirilmez.",
  },
  {
    need: "Sindirim / mikrobiyota",
    slugs: ["lactowel-tablet"],
    opening: "Sindirim ve mikrobiyota desteğinde LactoWel, probiotic + botanical yaklaşımıyla konuşulur.",
    boundary: "Ara kilo yuvarlamasını veya doğrulanmamış tam formülü tahmin etme.",
  },
  {
    need: "Solunum sistemi desteği",
    slugs: ["breathe-ease"],
    opening: "Solunum sistemi desteğinde Breathe Ease kedi ve köpek için konuşulabilir.",
    boundary: "22 lb üzeri köpek dozu doğrulanmadan tahmin edilmez; tedavi/cough-relief iddiası kullanılmaz.",
  },
  {
    need: "Struvit ilişkili üriner klinik kullanım",
    slugs: ["cleanse"],
    opening: "Cleanse yalnız veteriner klinik protokolü bağlamında ele alınır.",
    boundary: "Pet sahibine evde uygulama talimatı verme; güçlü ham klinik claim'i aynen kullanma.",
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

        <section className="match-grid">
          {needMap.map((item, index) => {
            const modules = item.slugs
              .map((slug) => trainingModules.find((module) => module.slug === slug))
              .filter(Boolean);

            return (
              <article className="match-card" key={item.need}>
                <div className="match-head">
                  <span className="scenario-index">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <span className="eyebrow">İhtiyaç alanı</span>
                    <h2>{item.need}</h2>
                  </div>
                </div>

                <p className="match-opening">{item.opening}</p>

                <div className="match-products">
                  {modules.map((module) => module && (
                    <Link className="match-product" href={`/training/${module.slug}`} key={module.slug}>
                      <div>
                        <strong>{module.product} {module.form}</strong>
                        <span>{module.supportArea}</span>
                      </div>
                      <span className={module.status === "ONAYLI" ? "content-badge content-badge-ready" : "content-badge content-badge-partial"}>
                        {module.status}
                      </span>
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
          <div className="framework-steps framework-steps-three">
            <article><span>1</span><strong>Hangi destek alanı?</strong><p>Önce konuşmanın renal, hepatik, stres, deri, sindirim, solunum veya üriner klinik eksenini netleştir.</p></article>
            <article><span>2</span><strong>Hangi form?</strong><p>Tablet/Liquid/saşe/steril sıvı ayrımını netleştir; bir formun bilgisini diğerine taşıma.</p></article>
            <article><span>3</span><strong>Veri statüsü ne?</strong><p>ONAYLI ise kayıtlı bilgiyi kullan; KISMEN ONAYLI ise yalnız doğrulanmış kısmı söyle; eksikte dur ve doğrula.</p></article>
          </div>
        </section>

        <section className="section placeholder">
          <h2>AI ile ürün eşleştirme provası</h2>
          <p>
            AI&apos;a bir klinik görüşme bağlamı ver: “Veteriner renal destek ürünleriyle ilgileniyor. Hangi VetWel ürün ailesiyle başlamalıyım ve hangi sınırları korumalıyım?” Asistan yalnız doğrulanmış VetWel kayıtları üzerinden cevap vermelidir.
          </p>
          <p><Link className="back-link" href="/ask">AI ile çalış →</Link></p>
        </section>
      </div>
    </main>
  );
}
