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
    text: "Ürün bilgisini test et; eksik konuları gör ve eğitim ilerlemeni takip et.",
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
              Bugün bir ürün öğrenebilir, saha görüşmesine hazırlanabilir veya VetWel bilgi
              tabanına doğrudan soru sorabilirsin.
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
            <p>İlerleme takibi sonraki fazda kullanıcı bazında kaydedilecek.</p>
          </div>
          <div className="info-panel">
            <div className="progress-row">
              <div><strong>VetWel marka ve portföy temelleri</strong><span>Başlangıç modülü</span></div>
              <span className="status">Hazır</span>
            </div>
            <div className="progress-row">
              <div><strong>Ürün eğitimleri</strong><span>Ürün bazlı öğrenme modülleri</span></div>
              <span className="status">Kuruluyor</span>
            </div>
            <div className="progress-row">
              <div><strong>Saha sınavları</strong><span>Rol bazlı değerlendirme ve puanlama</span></div>
              <span className="status">Sonraki faz</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
