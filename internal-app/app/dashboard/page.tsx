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
    href: "/progress",
    code: "BEN",
    title: "İlerlemem",
    text: "Tamamladığın eğitimleri, temel ve Seviye 2 sınav puanlarını ve sıradaki gelişim adımını gör.",
  },
  {
    href: "/meeting-prep",
    code: "HAZ",
    title: "Görüşmeye Hazırlan",
    text: "Ürün, süre ve hedefi seç; AI sana doğrulanmış VetWel bilgisiyle açılış, ana mesajlar, itiraz cevapları ve kapanış hazırlasın.",
  },
  {
    href: "/field-guide",
    code: "HIZ",
    title: "Saha Hızlı Rehber",
    text: "Klinikte ürün/form statüsünü, kayıtlı doz bilgisini ve hangi noktada durup doğrulama gerektiğini saniyeler içinde kontrol et.",
  },
  {
    href: "/product-match",
    code: "04",
    title: "Ürün Eşleştirme",
    text: "Renal, hepatik, stres, deri, sindirim, solunum veya üriner destek konuşmasında hangi VetWel ürün ailesiyle başlayacağını çalış.",
  },
  {
    href: "/practice",
    code: "05",
    title: "Görüşme Simülasyonu",
    text: "Gerçek veteriner itirazlarını önce kendin yanıtla; sonra ideal cevap ve kırmızı bayraklarla performansını kontrol et.",
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
    text: "Temel ve ileri seviye sınavlarla ürün bilgisini, saha kararını ve bilgi güvenliği disiplinini ölç.",
  },
];

const managerModule = {
  href: "/manager",
  code: "YÖN",
  title: "Ekip Eğitim Paneli",
  text: "Çalışanların eğitim tamamlama durumunu, sınav puanlarını ve saha yetkinliği ilerlemesini izle.",
};

function metadataRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export default async function DashboardPage() {
  if (!isClerkConfigured()) {
    redirect("/setup");
  }

  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  const firstName = user?.firstName || "VetWel ekibi";
  const isAdmin = metadataRecord(user?.privateMetadata).vetwelRole === "admin";
  const visibleModules = isAdmin ? [...modules, managerModule] : modules;

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
              Bir ürün öğren, ilerlemeni takip et, görüşmeye hazırlan, doğru ürün ailesini eşleştir,
              veteriner itirazlarını çalış veya VetWel bilgi tabanına doğrudan soru sor.
            </p>
          </div>
        </section>

        <section className="grid" aria-label="Ekip asistanı modülleri">
          {visibleModules.map((module) => (
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
            <p>Eğitim ve sınav ilerlemesi artık kullanıcı hesabına kalıcı olarak kaydedilir.</p>
          </div>
          <div className="info-panel">
            <div className="progress-row">
              <div><strong>Kişisel ilerleme kaydı</strong><span>Tamamlanan eğitimler, en iyi sınav puanı ve deneme sayısı</span></div>
              <Link className="status" href="/progress">İlerlemem →</Link>
            </div>
            <div className="progress-row">
              <div><strong>VetWel bilgi güvenliği standardı</strong><span>Onaylı / kısmen onaylı / doğrulama gerekiyor ayrımı</span></div>
              <span className="status">Aktif</span>
            </div>
            <div className="progress-row">
              <div><strong>Ürün eğitimleri</strong><span>8 ürün/form için eğitim ve saha anlatımı</span></div>
              <span className="status">Aktif</span>
            </div>
            <div className="progress-row">
              <div><strong>AI görüşme hazırlığı</strong><span>Ürün, süre ve hedefe göre otomatik saha planı</span></div>
              <span className="status">Aktif</span>
            </div>
            <div className="progress-row">
              <div><strong>Ürün eşleştirme</strong><span>7 destek alanında doğru VetWel ürün ailesi ve iletişim sınırı</span></div>
              <span className="status">Aktif</span>
            </div>
            <div className="progress-row">
              <div><strong>Veteriner görüşmesi simülasyonu</strong><span>Temel, orta ve ileri seviye saha itiraz pratikleri</span></div>
              <span className="status">Aktif</span>
            </div>
            <div className="progress-row">
              <div><strong>Saha hızlı rehberi</strong><span>Doz, konumlandırma ve doğrulama sınırlarının hızlı kontrolü</span></div>
              <span className="status">Aktif</span>
            </div>
            <div className="progress-row">
              <div><strong>Yetkinlik sınavları</strong><span>14 soruluk temel sınav + 8 senaryolu Seviye 2 saha sınavı</span></div>
              <span className="status">Aktif</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
