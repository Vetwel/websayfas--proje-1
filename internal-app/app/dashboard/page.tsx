import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isClerkConfigured } from "@/lib/internal-config";

const modules = [
  {
    href: "/training",
    code: "01",
    title: "Ürün Eğitimi",
    text: "VetWel ürünlerini sıfırdan öğren; kullanım alanı, formülasyon mantığı, doz ve saha anlatımını çalış.",
  },
  {
    href: "/field-guide",
    code: "HIZ",
    title: "Saha Hızlı Rehber",
    text: "Klinikte ürün/form statüsünü, kayıtlı doz bilgisini ve hangi noktada durup doğrulama gerektiğini saniyeler içinde kontrol et.",
  },
  {
    href: "/ask",
    code: "AI",
    title: "AI'a Sor",
    text: "Ürün, doz, içerik ve veteriner görüşmesiyle ilgili şirket içi sorularını VetWel bilgi tabanına sor.",
  },
  {
    href: "/coach",
    code: "02",
    title: "Satış Koçu",
    text: "Klinik görüşmesine hazırlan, itirazları çalış ve hangi ürünle nasıl yaklaşacağını planla.",
  },
  {
    href: "/quiz",
    code: "03",
    title: "Sınav & Onboarding",
    text: "Ürün bilgisini test et; eksik konuları gör ve bilgi güvenliği disiplinini ölç.",
  },
];

export default async function DashboardPage() {
  if (!isClerkConfigured()) {
    redirect("/setup");
  }

  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  const firstName = user?.firstName || "VetWel ekibi";

  return (
    <main className="shell">
      <header className="topbar">
        <Link className="brand" href="/dashboard">
          <span className="brand-mark">V</span>
          <span className="brand-copy">
            <strong>VetWel®</strong>
            <small>Ekip Asistanı</small>
          </span>
        </Link>
        <div className="topbar-actions">
          <span className="secure-badge"><span className="secure-dot" />Özel alan</span>
          <UserButton />
        </div>
      </header>

      <div className="page">
        <section className="hero-row">
          <div>
            <span className="eyebrow">VetWel Internal</span>
            <h1>Merhaba, {firstName}.</h1>
            <p>
              Bir ürün öğren, kliniğe girmeden hızlıca bilgiyi kontrol et, saha görüşmesine
              hazırlan veya VetWel bilgi tabanına doğrudan soru sor.
            </p>
          </div>
        </section>

        <section className="grid" aria-label="Ekip asistanı modülleri">
          {modules.map((module) => (
            <Link className="card" href={module.href} key={module.href}>
              <div className="card-icon">{module.code}</div>
              <h2>{module.title}</h2>
              <p>{module.text}</p>
              <span className="card-arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <span className="eyebrow">Onboarding</span>
              <h2>Eğitim yolculuğun</h2>
            </div>
            <p>Kullanıcı bazlı kalıcı ilerleme kaydı sonraki fazda eklenecek.</p>
          </div>
          <div className="info-panel">
            <div className="progress-row">
              <div><strong>VetWel bilgi güvenliği standardı</strong><span>Onaylı / kısmen onaylı / doğrulama gerekiyor ayrımı</span></div>
              <span className="status">Aktif</span>
            </div>
            <div className="progress-row">
              <div><strong>Ürün eğitimleri</strong><span>8 ürün/form için eğitim ve saha anlatımı</span></div>
              <span className="status">Aktif</span>
            </div>
            <div className="progress-row">
              <div><strong>Saha hızlı rehberi</strong><span>Doz, konumlandırma ve doğrulama sınırlarının hızlı kontrolü</span></div>
              <span className="status">Aktif</span>
            </div>
            <div className="progress-row">
              <div><strong>Saha sınavı</strong><span>14 soruluk temel yetkinlik ve bilgi güvenliği değerlendirmesi</span></div>
              <span className="status">Aktif</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
