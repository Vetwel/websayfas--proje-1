import Link from "next/link";
import { getInternalSetupStatus } from "@/lib/internal-config";

export const dynamic = "force-dynamic";

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
  const aiReady = status.workersAI;

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
              Uygulama Cloudflare Workers üzerinde çalışır. Bu ekran gizli anahtarların kendisini göstermez;
              yalnızca Worker ortamının değişkenleri görüp görmediğini ve formatlarını kontrol eder.
            </p>
          </div>
        </section>

        <section className="info-panel">
          <StatusRow label="Cloudflare Worker" ready detail="vetwel-internal-ai yapılandırması hazır." />
          <StatusRow
            label="Clerk Publishable Key"
            ready={status.clerkPublishableKey}
            detail={status.clerkPublishableKey
              ? "Anahtar görüldü ve formatı geçerli."
              : `Worker görüyor: ${status.clerkPublishablePresent ? "Evet" : "Hayır"} · Karakter: ${status.clerkPublishableLength} · pk_live_/pk_test_ ile başlıyor: ${status.clerkPublishablePrefix ? "Evet" : "Hayır"}`}
          />
          <StatusRow
            label="Clerk Secret Key"
            ready={status.clerkSecretKey}
            detail={status.clerkSecretKey
              ? "Anahtar görüldü ve formatı geçerli."
              : `Worker görüyor: ${status.clerkSecretPresent ? "Evet" : "Hayır"} · Karakter: ${status.clerkSecretLength} · sk_live_/sk_test_ ile başlıyor: ${status.clerkSecretPrefix ? "Evet" : "Hayır"}`}
          />
          <StatusRow
            label="Clerk çalışan girişi"
            ready={status.clerk}
            detail={status.clerk ? "Kimlik doğrulama aktif." : "İki Clerk anahtarı da geçerli olmalı."}
          />
          <StatusRow
            label={status.aiProvider}
            ready={status.workersAI}
            detail={`${status.aiBillingMode}; OpenAI API anahtarı kullanılmıyor.`}
          />
        </section>

        <section className="section placeholder">
          <h2>Güvenli teşhis modu</h2>
          <p>
            Bu ekran gizli anahtar değerlerini hiçbir zaman göstermez. Yalnızca değişkenin mevcut olup
            olmadığını, toplam karakter sayısını ve beklenen Clerk önekiyle başlayıp başlamadığını gösterir.
          </p>
          {status.clerk ? (
            <p className="placeholder-note"><Link href="/sign-in">Ekip girişine geç →</Link></p>
          ) : (
            <p className="placeholder-note">Clerk bağlantısı için yukarıdaki iki teşhis satırını kontrol et.</p>
          )}
          {status.clerk && aiReady ? (
            <p><Link className="back-link" href="/dashboard">Ana panele git →</Link></p>
          ) : null}
        </section>
      </div>
    </main>
  );
}
