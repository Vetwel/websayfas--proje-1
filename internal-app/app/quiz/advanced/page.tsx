import Link from "next/link";
import { auth } from "@/lib/clerk-server";
import { redirect } from "next/navigation";
import { isClerkConfigured } from "@/lib/internal-config";
import AdvancedQuizClient from "./advanced-quiz-client";

export default async function AdvancedQuizPage() {
  if (!isClerkConfigured()) redirect("/setup");
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <main className="shell">
      <div className="page">
        <Link className="back-link" href="/quiz">← Sınav merkezine dön</Link>
        <span className="eyebrow">Saha Yetkinliği • Seviye 2</span>
        <h1 className="module-title">Senaryo Bazlı Saha Sınavı</h1>
        <p className="module-subtitle">
          Bu aşamada yalnız bilgiyi hatırlamak yetmez. Gerçek veteriner sorusunda doğru ürünü, doğru formu, doğru cümleyi ve gerektiğinde “bunu doğrulamamız gerekiyor” sınırını seçebilmen beklenir.
        </p>

        <section className="info-panel onboarding-summary">
          <div className="progress-row">
            <div><strong>Form ayrımı</strong><span>Tablet, Liquid, saşe ve klinik steril form bilgilerini karıştırmama</span></div>
            <span className="status">Ölçülüyor</span>
          </div>
          <div className="progress-row">
            <div><strong>Veri boşluğu yönetimi</strong><span>Ara kilo, yüksek kilo veya doğrulanmamış formda tahmin yapmama</span></div>
            <span className="status">Ölçülüyor</span>
          </div>
          <div className="progress-row">
            <div><strong>Veteriner iletişimi</strong><span>Güçlü ama kontrollü, destekleyici VetWel dili kullanma</span></div>
            <span className="status">Ölçülüyor</span>
          </div>
        </section>

        <section className="section">
          <AdvancedQuizClient />
        </section>
      </div>
    </main>
  );
}
