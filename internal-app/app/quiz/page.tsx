import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isClerkConfigured } from "@/lib/internal-config";

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
          Yeni çalışanların ürün bilgisini ölçmek, yanlış cevapları öğretmek ve hangi
          konularda tekrar eğitim gerektiğini göstermek için kullanılacak alan.
        </p>

        <section className="info-panel">
          <div className="progress-row">
            <div><strong>1. Marka ve portföy temelleri</strong><span>VetWel yaklaşımı, ürün grupları ve temel kanal dili</span></div>
            <span className="status">Planlandı</span>
          </div>
          <div className="progress-row">
            <div><strong>2. Ürün bazlı bilgi sınavları</strong><span>Doz, kullanım, formülasyon mantığı ve vaka eşleştirme</span></div>
            <span className="status">Planlandı</span>
          </div>
          <div className="progress-row">
            <div><strong>3. Veteriner görüşmesi simülasyonu</strong><span>AI ile gerçek saha senaryosu ve itiraz yönetimi</span></div>
            <span className="status">Planlandı</span>
          </div>
          <div className="progress-row">
            <div><strong>4. Yetkinlik sonucu</strong><span>Güçlü alanlar, eksikler ve tekrar önerisi</span></div>
            <span className="status">Planlandı</span>
          </div>
        </section>
      </div>
    </main>
  );
}
