import Link from "next/link";
import { getInternalSetupStatus } from "@/lib/internal-config";

function StatusRow({ label, ready, detail }: { label: string; ready: boolean; detail: string }) {
  return (
    <div className="progress-row">
      <div>
        <strong>{label}</strong>
        <span>{detail}</span>
      </div>
      <span className="status">{ready ? "Hazır" : "Bekliyor"}</span>
    </div>
  );
}

export default function SetupPage() {
  const status = getInternalSetupStatus();
  const aiReady = status.openaiKey && status.vectorStore;

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">V</span>
          <span className="brand-copy">
            <strong>VetWel®</strong>
            <small>Ekip Asistanı</small>
          </span>
        </div>
        <span className="secure-badge"><span className="secure-dot" />Kurulum modu</span>
      </header>

      <div className="page">
        <section className="hero-row">
          <div>
            <span className="eyebrow">VetWel Internal</span>
            <h1>Altyapı hazır, bağlantılar bekleniyor.</h1>
            <p>
              Uygulama Vercel üzerinde çalışıyor. Giriş sistemi ve özel AI bilgi tabanı
              anahtarları eklendiğinde çalışan paneli otomatik olarak aktif olacak.
            </p>
          </div>
        </section>

        <section className="info-panel">
          <StatusRow label="Vercel uygulaması" ready detail="Next.js production deployment çalışıyor." />
          <StatusRow
            label="Clerk çalışan girişi"
            ready={status.clerk}
            detail={status.clerk ? "Kimlik doğrulama aktif." : "Publishable Key + Secret Key bekleniyor."}
          />
          <StatusRow
            label="OpenAI erişimi"
            ready={status.openaiKey}
            detail={status.openaiKey ? `Model yapılandırıldı: ${status.model}` : "Server-side API key bekleniyor."}
          />
          <StatusRow
            label="Özel VetWel bilgi tabanı"
            ready={status.vectorStore}
            detail={status.vectorStore ? "Vector Store bağlı." : "Private Vector Store ID bekleniyor."}
          />
        </section>

        <section className="section placeholder">
          <h2>Şu anda ne tamamlandı?</h2>
          <p>
            Dashboard, ürün eğitim alanı, satış koçu, onboarding/sınav alanı ve özel bilgi
            tabanına bağlanacak AI soru-cevap altyapısı hazır. Gizli VetWel bilgi dosyası
            public GitHub deposuna konulmadı.
          </p>
          {status.clerk ? (
            <p className="placeholder-note"><Link href="/sign-in">Ekip girişine geç →</Link></p>
          ) : (
            <p className="placeholder-note">
              Kurulum modu güvenli biçimde açık. Anahtarlar eklenene kadar özel çalışan alanları açılmaz.
            </p>
          )}
          {status.clerk && aiReady ? (
            <p><Link className="back-link" href="/dashboard">Ana panele git →</Link></p>
          ) : null}
        </section>
      </div>
    </main>
  );
}
