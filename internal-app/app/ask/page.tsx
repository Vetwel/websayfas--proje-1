import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AskClient from "./AskClient";
import { isClerkConfigured } from "@/lib/internal-config";

export default async function AskPage() {
  if (!isClerkConfigured()) {
    redirect("/setup");
  }

  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <main className="shell">
      <div className="page">
        <Link className="back-link" href="/dashboard">← Ana panele dön</Link>
        <span className="eyebrow">VetWel Ekip Asistanı</span>
        <h1 className="module-title">AI&apos;a Sor</h1>
        <p className="module-subtitle">
          VetWel ürün eğitimi, saha hazırlığı ve doğrulanmış ürün bilgileri için şirket içi asistana sorun.
          Bu sürüm Cloudflare Workers AI&apos;ın ücretsiz kotasını kullanır; OpenAI API faturası oluşturmaz.
        </p>

        <AskClient />

        <p className="placeholder-note">
          Günlük ücretsiz AI kotası dolarsa sistem ücret çıkarmak yerine o gün için AI yanıtını durdurur.
        </p>
      </div>
    </main>
  );
}
