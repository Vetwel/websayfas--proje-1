import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
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
          Bu sınav ürün ezberinden çok bilgi güvenliğini ölçer: doğrulanmış dozları bilmek,
          Tablet/Liquid formlarını ayırmak, kısmen onaylı veride sınırı korumak ve VetWel’in
          destekleyici iletişim standardını sahada uygulamak.
        </p>

        <section className="info-panel onboarding-summary">
          <div className="progress-row">
            <div><strong>1. Onaylı ürün bilgisi</strong><span>KidneyWel Tablet/Liquid, LiverWel Tablet ve CalmWel Tablet temelleri</span></div>
            <span className="status">Aktif</span>
          </div>
          <div className="progress-row">
            <div><strong>2. Kısmen onaylı ürün sınırları</strong><span>SkinWel, LactoWel, Breathe Ease ve Cleanse’de neyin bilindiğini ve neyin tahmin edilmemesi gerektiğini öğrenme</span></div>
            <span className="status">Aktif</span>
          </div>
          <div className="progress-row">
            <div><strong>3. Form ayrımı</strong><span>Tablet bilgisini Liquid forma taşımama disiplini</span></div>
            <span className="status">Aktif</span>
          </div>
          <div className="progress-row">
            <div><strong>4. Saha iletişimi</strong><span>Tedavi iddiası yerine destek amacı, doğrulanmış bilgi ve profesyonel sınır kullanma</span></div>
            <span className="status">Aktif</span>
          </div>
        </section>

        <section className="section placeholder">
          <h2>İlk yetkinlik standardı</h2>
          <p>
            Sınav 14 sorudan oluşur ve geçme hedefi %80’dir. Yanlış yanıtlar yalnız puan düşürmez;
            her sorunun altında neden yanlış olduğunu ve doğru saha yaklaşımını gösterir.
          </p>
        </section>

        <section className="section">
          <QuizClient />
        </section>
      </div>
    </main>
  );
}
