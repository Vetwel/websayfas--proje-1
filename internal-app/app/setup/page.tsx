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
            <h1>Altyapı hazır, bağlantılar kontrol ediliyor.</h1>
            <p>
              Uygulama Vercel üzerinde çalışıyor. Bu ekran gizli anahtarların kendisini göstermez;
              yalnızca formatlarının geçerli olup olmadığını kontrol eder.
            </p>
          </div>
        </section>

        <section className="info-panel">
          <StatusRow label="Vercel uygulaması" ready detail="Next.js production deployment çalışıyor." />
          <StatusRow
            label="Clerk Publishable Key"
            ready={status.clerkPublishableKey}
            detail={status.clerkPublishableKey ? "pk_live_ / pk_test_ formatı geçerli." : "Publishable Key formatı geçersiz veya eksik."}
          />
          <StatusRow
            label="Clerk Secret Key"
            ready={status.clerkSecretKey}
            detail={status.clerkSecretKey ? "sk_live_ / sk_test_ formatı geçerli." : "Secret Key formatı geçersiz veya eksik."}
          />
          <StatusRow
            label="Clerk çalışan girişi"
            ready={status.clerk}
            detail={status.clerk ? "Kimlik doğrulama aktif." : "İki Clerk anahtarı da geçerli olmalı."}
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
          <h2>Güvenli teşhis modu</h2>
          <p>
            Geçersiz Clerk anahtarı artık uygulamayı 500 hatasına düşürmez. Sistem kurulum modunda
            kalır ve hangi bağlantının düzeltilmesi gerektiğini burada gösterir.
          </p>
          {status.clerk ? (
            <p className="placeholder-note"><Link href="/sign-in">Ekip girişine geç →</Link></p>
          ) : (
            <p className="placeholder-note">Clerk anahtar formatlarından biri henüz geçerli değil.</p>
          )}
          {status.clerk && aiReady ? (
            <p><Link className="back-link" href="/dashboard">Ana panele git →</Link></p>
          ) : null}
        </section>
      </div>
    </main>
  );
}
