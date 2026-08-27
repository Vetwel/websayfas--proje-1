import Link from "next/link";
import { auth } from "@/lib/clerk-server";
import { redirect } from "next/navigation";
import { isClerkConfigured } from "@/lib/internal-config";
import {
  internalTrainingModules as trainingModules,
  internalVerificationQueue as verificationQueue,
} from "@/lib/internal-training-content";

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
          Her ürün modülü VetWel ekibinin sahada ihtiyaç duyduğu ürün konumlandırmasını,
          kullanım bilgisini, formülasyon mantığını ve doğru iletişim sınırlarını tek yerde toplar.
        </p>

        <section className="section">
          <div className="section-head">
            <div>
              <span className="eyebrow">Ürün eğitimleri</span>
              <h2>Ürün ve form modülleri</h2>
            </div>
            <p>{trainingModules.length} ürün/form modülü</p>
          </div>

          <div className="product-grid">
            {trainingModules.map((module) => (
              <Link className="product-card product-card-link" href={`/training/${module.slug}`} key={module.slug}>
                <div className="product-card-topline">
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

        {verificationQueue.length ? (
          <section className="section">
            <div className="section-head">
              <div>
                <span className="eyebrow">İçerik geliştirme</span>
                <h2>Bilgisi tamamlanacak ürün/formlar</h2>
              </div>
              <p>Eksik bilgi AI tarafından uydurulmaz</p>
            </div>

            <div className="info-panel">
              {verificationQueue.map((item) => (
                <div className="progress-row" key={item.name}>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="section placeholder">
          <h2>Eğitim standardı</h2>
          <p>
            Her modül konumlandırma, kayıtlı doz/kullanım, formülasyon mantığı, klinikte
            söylenebilir kısa anlatım ve “söyle / söyleme” sınırlarını içerir. Bilginin eksik
            olduğu noktalarda çalışan veya AI tahmin yürütmez.
          </p>
          <p className="placeholder-note">
            Temel kural: Ürünle ilgili kesin kaydı bulunmayan doz, içerik, form farkı veya klinik
            sonuç bilgisi uydurulmaz; mevcut bilgi açık ve profesyonel şekilde aktarılır.
          </p>
        </section>
      </div>
    </main>
  );
}
