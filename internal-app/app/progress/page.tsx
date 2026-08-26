import Link from "next/link";
import { auth } from "@/lib/clerk-server";
import { redirect } from "next/navigation";
import { isClerkConfigured } from "@/lib/internal-config";
import ProgressClient from "./progress-client";

export default async function ProgressPage() {
  if (!isClerkConfigured()) redirect("/setup");
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <main className="shell">
      <div className="page">
        <Link className="back-link" href="/dashboard">← Ana panele dön</Link>
        <span className="eyebrow">Kişisel gelişim</span>
        <h1 className="module-title">İlerlemem</h1>
        <p className="module-subtitle">
          Tamamladığın ürün eğitimlerini, temel ve ileri saha sınavlarındaki en iyi puanlarını
          ve sıradaki öğrenme adımlarını burada görürsün. Kayıtlar VetWel kullanıcı hesabına bağlıdır.
        </p>
        <ProgressClient />
      </div>
    </main>
  );
}
