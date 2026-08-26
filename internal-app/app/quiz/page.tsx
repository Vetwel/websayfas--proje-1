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
          Bu ilk sınav ürün ezberinden çok bilgi güvenliğini ölçer: doğrulanmış dozları
          bilmek, Tablet/Liquid formlarını ayırmak, eksik veriyi tahmin etmemek ve VetWel’in
          destekleyici iletişim sınırlarını korumak.
        </p>

        <section className="info-panel onboarding-summary">
          <div className="progress-row">
            <div><strong>1. Doğrulanmış ürün bilgisi</strong><span>KidneyWel Tablet/Liquid, LiverWel Tablet ve CalmWel Tablet temelleri</span></div>
            <span className="status">Aktif</span>
          </div>
          <div className="progress-row">
            <div><strong>2. Form ayrımı</strong><span>Tablet bilgisini Liquid forma taşımama disiplini</span></div>
            <span className="status">Aktif</span>
          </div>
          <div className="progress-row">
            <div><strong>3. Veri güvenliği</strong><span>Doğrulanmamış doz ve yuvarlama kurallarında tahmin yapmama</span></div>
            <span className="status">Aktif</span>
          </div>
          <div className="progress-row">
            <div><strong>4. Saha iletişimi</strong><span>Tedavi iddiası yerine destek amacı ve formülasyon mantığını anlatma</span></div>
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
