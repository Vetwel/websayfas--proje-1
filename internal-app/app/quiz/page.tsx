import Link from "next/link";
import { auth } from "@/lib/clerk-server";
import { redirect } from "next/navigation";
import { isClerkConfigured } from "@/lib/internal-config";
import QuizClient from "./quiz-client";

export default async function QuizPage() {
  if (!isClerkConfigured()) {
    redirect("/setup");
  }

  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <main className="shell">
      <div className="page">
        <Link className="back-link" href="/dashboard">← Ana panele dön</Link>
        <span className="eyebrow">Modül 03</span>
        <h1 className="module-title">Sınav & Onboarding</h1>
        <p className="module-subtitle">
          Eğitim iki seviyeli ilerler. Seviye 1 temel ürün bilgisi ve bilgi güvenliğini; Seviye 2 ise gerçek veteriner görüşmesinde doğru saha kararını ölçer.
        </p>

        <section className="product-grid">
          <article className="product-card">
            <div className="product-card-topline">
              <span className="content-badge content-badge-ready">SEVİYE 1</span>
              <span className="product-form">14 soru</span>
            </div>
            <strong>Temel Yetkinlik</strong>
            <span>Doz, form ayrımı, bilgi sınırları ve VetWel iletişim standardı</span>
            <p>Geçme hedefi %80. Yanlış cevaplarda nedenini ve doğru saha yaklaşımını görürsün.</p>
          </article>

          <Link className="product-card product-card-link" href="/quiz/advanced">
            <div className="product-card-topline">
              <span className="content-badge content-badge-partial">SEVİYE 2</span>
              <span className="product-form">8 senaryo</span>
            </div>
            <strong>Saha Yetkinliği</strong>
            <span>Gerçek veteriner soruları, ürün/form seçimi ve bilgi sınırları</span>
            <p>Bilgiyi ezberlemek yerine gerçek görüşmede doğru kararı verip veremediğini ölçer.</p>
            <span className="module-cta">Seviye 2&apos;ye geç →</span>
          </Link>
        </section>

        <section className="info-panel onboarding-summary section">
          <div className="progress-row">
            <div><strong>1. Temel ürün bilgisi</strong><span>KidneyWel Tablet/Liquid, LiverWel Tablet ve CalmWel Tablet temelleri</span></div>
            <span className="status">Aktif</span>
          </div>
          <div className="progress-row">
            <div><strong>2. Ürün bilgi sınırları</strong><span>SkinWel, LactoWel, Breathe Ease ve Cleanse’de neyin bilindiğini ve hangi noktada tahmin yürütülmemesi gerektiğini öğrenme</span></div>
            <span className="status">Aktif</span>
          </div>
          <div className="progress-row">
            <div><strong>3. Form ayrımı</strong><span>Tablet bilgisini Liquid forma taşımama disiplini</span></div>
            <span className="status">Aktif</span>
          </div>
          <div className="progress-row">
            <div><strong>4. Saha iletişimi</strong><span>Tedavi iddiası yerine destek amacı, kayıtlı bilgi ve profesyonel sınır kullanma</span></div>
            <span className="status">Aktif</span>
          </div>
        </section>

        <section className="section">
          <QuizClient />
        </section>
      </div>
    </main>
  );
}
