import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isClerkConfigured } from "@/lib/internal-config";
import { trainingModules, verificationQueue } from "@/lib/training-content";

export default async function TrainingPage() {
  if (!isClerkConfigured()) {
    redirect("/setup");
  }

  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const approvedCount = trainingModules.filter((module) => module.status === "ONAYLI").length;
  const limitedCount = trainingModules.filter((module) => module.status === "KISMEN ONAYLI").length;

  return (
    <main className="shell">
      <div className="page">
        <Link className="back-link" href="/dashboard">← Ana panele dön</Link>
        <span className="eyebrow">Modül 01</span>
        <h1 className="module-title">Ürün Eğitimi</h1>
        <p className="module-subtitle">
          Eğitimler VetWel bilgi tabanındaki veri statüsüne göre açılır. ONAYLI modüllerde
          doğrulanmış ürün/form bilgileri kullanılır; KISMEN ONAYLI modüllerde ise çalışan
          hangi bilginin güvenle söylenebileceğini ve hangi noktada durması gerektiğini öğrenir.
        </p>

        <section className="section">
          <div className="section-head">
            <div>
              <span className="eyebrow">Aktif eğitimler</span>
              <h2>Ürün ve form modülleri</h2>
            </div>
            <p>{approvedCount} onaylı • {limitedCount} sınırlı modül</p>
          </div>

          <div className="product-grid">
            {trainingModules.map((module) => {
              const partial = module.status === "KISMEN ONAYLI";
              return (
                <Link className="product-card product-card-link" href={`/training/${module.slug}`} key={module.slug}>
                  <div className="product-card-topline">
                    <span className={`content-badge ${partial ? "content-badge-partial" : "content-badge-ready"}`}>
                      {module.status}
                    </span>
                    <span className="product-form">{module.form}</span>
                  </div>
                  <strong>{module.product}</strong>
                  <span>{module.supportArea}</span>
                  <p>{module.positioning}</p>
                  <span className="module-cta">{partial ? "Sınırlarıyla öğren →" : "Eğitime başla →"}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <span className="eyebrow">Henüz modül açılmadı</span>
              <h2>Doğrulama bekleyen ürün/formlar</h2>
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
            Her modül konumlandırma, kayıtlı doz/kullanım, formülasyon mantığı, klinikte
            söylenebilir kısa anlatım ve “söyle / söyleme” sınırlarını içerir. Kısmen onaylı
            modüllerde ayrıca veri eksikleri görünür biçimde gösterilir.
          </p>
          <p className="placeholder-note">
            Temel kural: “DOĞRULAMA GEREKİYOR” olan bir bilgi için çalışan veya AI tahminde
            bulunmaz. Doğru profesyonel yanıt, bilgi sınırını açıkça belirtmektir.
          </p>
        </section>
      </div>
    </main>
  );
}
