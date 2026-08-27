import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@/lib/clerk-server";
import { redirect } from "next/navigation";
import { isClerkConfigured } from "@/lib/internal-config";
import { trainingModules } from "@/lib/training-content";

const modules = [
  {
    number: "01",
    title: "Ürün Eğitimi",
    description: "VetWel ürünlerini sıfırdan öğren. Formülasyon mantığı, kullanım alanı, doz ve saha anlatımı.",
    href: "/training",
    cta: "Eğitime başla",
  },
  {
    number: "02",
    title: "AI’a Sor",
    description: "Ürün, form, doz veya sahadaki bir soruyu VetWel bilgi tabanına sor.",
    href: "/ask",
    cta: "Asistanı aç",
  },
  {
    number: "03",
    title: "Satış Koçu",
    description: "Veteriner görüşmesine hazırlan, itirazlara çalış ve 30 saniyelik ürün anlatımını geliştir.",
    href: "/coach",
    cta: "Pratik yap",
  },
  {
    number: "04",
    title: "Sınav & Onboarding",
    description: "Ürün bilginizi ölçün. Yanlış cevapları görün ve eksik konuları tekrar edin.",
    href: "/quiz",
    cta: "Sınava gir",
  },
  {
    number: "05",
    title: "Saha Hazırlığı",
    description: "Veteriner tipine göre görüşme dili, klinik öncesi AI briefing ve gerçek saha senaryoları.",
    href: "/advanced-coach",
    cta: "Saha moduna geç",
  },
  {
    number: "06",
    title: "İlerlemem",
    description: "Tamamladığın ürün eğitimlerini, sınav sonuçlarını ve rol-play çalışmalarını tek ekranda gör.",
    href: "/progress",
    cta: "İlerlemeyi aç",
  },
];

export default async function DashboardPage() {
  if (!isClerkConfigured()) {
    redirect("/setup");
  }

  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  const firstName = user?.firstName || user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] || "VetWel ekibi";
  const privateMetadata = user?.privateMetadata as Record<string, unknown> | undefined;
  const isAdmin = privateMetadata?.vetwelRole === "admin";

  return (
    <main className="shell">
      <div className="page dashboard">
        <header className="internal-header">
          <div className="brand" aria-label="VetWel Ekip Asistanı">
            <span className="brand-mark">V</span>
            <span className="brand-copy">
              <strong>VetWel®</strong>
              <small>Ekip Asistanı</small>
            </span>
          </div>
          <div className="employee-menu">
            <span className="private-badge">Şirket İçi</span>
            <UserButton />
          </div>
        </header>

        <section className="dashboard-hero">
          <div>
            <span className="eyebrow">VetWel Akademi AI</span>
            <h1>Merhaba {firstName}.<br />Bugün ne üzerinde çalışalım?</h1>
            <p>
              Ürün bilgisini öğren, veteriner görüşmesine hazırlan, AI’a soru sor veya eğitim durumunu kontrol et.
            </p>
          </div>
          <div className="hero-stat-card">
            <span>Bilgi tabanı</span>
            <strong>{trainingModules.length}</strong>
            <small>aktif ürün / form modülü</small>
          </div>
        </section>

        <section className="module-grid" aria-label="Ekip asistanı modülleri">
          {modules.map((module) => (
            <Link className="module-card" href={module.href} key={module.number}>
              <span className="module-number">{module.number}</span>
              <div>
                <h2>{module.title}</h2>
                <p>{module.description}</p>
                <strong>{module.cta} →</strong>
              </div>
            </Link>
          ))}
          {isAdmin ? (
            <Link className="module-card" href="/manager">
              <span className="module-number">07</span>
              <div>
                <h2>Ekip Yönetimi</h2>
                <p>Çalışanların eğitim tamamlama, sınav ve rol-play ilerlemesini görüntüle.</p>
                <strong>Yönetici panelini aç →</strong>
              </div>
            </Link>
          ) : null}
        </section>

        <section className="dashboard-bottom-grid">
          <article className="info-card">
            <span className="eyebrow">Yeni çalışan yolu</span>
            <h2>Önce öğren → sonra prova → sonra sınav</h2>
            <ol className="onboarding-list">
              <li><span>1</span><div><strong>Ürünü öğren</strong><small>Destek alanı, formülasyon, doz, içerik ve sınırlar</small></div></li>
              <li><span>2</span><div><strong>Saha provasını yap</strong><small>Veteriner itirazları ve 30 saniyelik anlatım</small></div></li>
              <li><span>3</span><div><strong>Sınava gir</strong><small>Eksik konuları gör ve gerektiğinde tekrar et</small></div></li>
            </ol>
          </article>
          <article className="info-card safety-card">
            <span className="eyebrow">AI güvenlik standardı</span>
            <h2>Bilmediğinde tahmin etme.</h2>
            <p>
              VetWel Ekip Asistanı yalnız doğrulanmış kayıtları kesin bilgi olarak kullanır. Eksik veya formu belirsiz alanlar açıkça doğrulama gerektirir.
            </p>
            <div className="rule-pill">Tablet ≠ Liquid</div>
            <div className="rule-pill">Tedavi claim’i yok</div>
            <div className="rule-pill">Doz tahmini yok</div>
          </article>
        </section>
      </div>
    </main>
  );
}
