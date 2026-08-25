import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="login-page">
      <section className="login-hero">
        <div className="brand" aria-label="VetWel Ekip Asistanı">
          <span className="brand-mark">V</span>
          <span className="brand-copy">
            <strong>VetWel®</strong>
            <small>Ekip Asistanı</small>
          </span>
        </div>

        <div className="login-message">
          <span className="login-kicker">Şirket içi • Yetkili erişim</span>
          <h1>VetWel bilgisini öğren. Sahada daha güçlü ol.</h1>
          <p>
            Ürün eğitimi, veteriner görüşme hazırlığı, satış koçluğu ve çalışan
            onboarding'i tek güvenli çalışma alanında.
          </p>
          <div className="login-points" aria-label="Platform özellikleri">
            <span>Ürün Eğitimi</span>
            <span>AI Soru-Cevap</span>
            <span>Satış Koçu</span>
            <span>Sınav & Onboarding</span>
          </div>
        </div>

        <small>VetWel Internal • Kamuya açık değildir</small>
      </section>

      <section className="login-panel">
        <div className="login-card">
          <h2>Ekip girişi</h2>
          <p>Yalnızca VetWel tarafından davet edilen kullanıcılar erişebilir.</p>
          <SignIn fallbackRedirectUrl="/dashboard" />
        </div>
      </section>
    </main>
  );
}
