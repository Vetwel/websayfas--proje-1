import Link from "next/link";
import { auth } from "@/lib/clerk-server";
import { redirect } from "next/navigation";
import { isClerkConfigured } from "@/lib/internal-config";
import { trainingModules } from "@/lib/training-content";
import MeetingPrepClient from "./meeting-prep-client";

export default async function MeetingPrepPage() {
  if (!isClerkConfigured()) redirect("/setup");
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const products = trainingModules.map((module) => `${module.product} ${module.form}`);

  return (
    <main className="shell">
      <div className="page">
        <Link className="back-link" href="/dashboard">← Ana panele dön</Link>
        <span className="eyebrow">AI Saha Aracı</span>
        <h1 className="module-title">Görüşmeye Hazırlan</h1>
        <p className="module-subtitle">
          Kliniğe girmeden önce ürün/formu ve görüşme hedefini seç. VetWel AI sana doğrulanmış bilgi tabanından kısa açılış, ana mesajlar, zor sorular, iletişim sınırları ve kapanış hazırlasın.
        </p>

        <MeetingPrepClient products={products} />

        <section className="section placeholder">
          <h2>Görüşme standardı</h2>
          <p>
            Hazırlık çıktısı bir satış “scripti” değil, saha desteğidir. Çalışan yalnız doğrulanmış ürün/form bilgisini kullanmalı; eksik veri varsa bunu saklamak yerine açıkça doğrulama gerektiğini söylemelidir.
          </p>
        </section>
      </div>
    </main>
  );
}
