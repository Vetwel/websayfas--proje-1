import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isClerkConfigured } from "@/lib/internal-config";
import { verifiedTrainingModules, verificationQueue } from "@/lib/training-content";

export default async function TrainingPage() {
  if (!isClerkConfigured()) {
    redirect("/setup");
  }

  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <main className="shell">
      <div className="page">
        <Link className="back-link" href="/dashboard">← Ana panele dön</Link>
        <span className="eyebrow">Modül 01</span>
        <h1 className="module-title">Ürün Eğitimi</h1>
        <p className="module-subtitle">
          Buradaki eğitimler yalnız VetWel bilgi tabanında doğrulanmış ürün/form kayıtlarından
          oluşturulur. Bir ürünün Tablet ve Liquid formları ayrı bilgi olarak değerlendirilir;
          doğrulanmamış doz veya içerik tahmin edilmez.
        </p>

        <section className="section">
          <div className="section-head">
            <div>
              <span className="eyebrow">Eğitime hazır</span>
              <h2>Doğrulanmış ürün modülleri</h2>
            </div>
            <p>{verifiedTrainingModules.length} tam modül</p>
          </div>

          <div className="product-grid">
            {verifiedTrainingModules.map((module) => (
              <Link className="product-card product-card-link" href={`/training/${module.slug}`} key={module.slug}>
                <div className="product-card-topline">
                  <span className="content-badge content-badge-ready">ONAYLI</span>
                  <span className="product-form">{module.form}</span>
                </div>
                <strong>{module.product}</strong>
                <span>{module.supportArea}</span>
                <p>{module.positioning}</p>
                <span className="module-cta">Eğitime başla →</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <span className="eyebrow">Veri güvenliği</span>
              <h2>Doğrulama bekleyen ürünler</h2>
            </div>
            <p>Eksik bilgi AI tarafından tamamlanmaz</p>
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
          <h2>Eğitim standardı</h2>
          <p>
            Her tam modül beş parçadan oluşur: ürünün konumlandırması, doğrulanmış doz/kullanım,
            formülasyon mantığı, klinikte söylenebilir kısa anlatım ve kesinlikle söylenmemesi
            gereken ifadeler. Modül sonunda kontrol soruları bulunur.
          </p>
          <p className="placeholder-note">
            Kural: “DOĞRULAMA GEREKİYOR” olan bir bilgi için çalışan veya AI tahminde bulunmaz;
            doğru yanıt bilgi eksikliğini açıkça belirtmektir.
          </p>
        </section>
      </div>
    </main>
  );
}
