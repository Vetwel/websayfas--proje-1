import Link from "next/link";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { isClerkConfigured } from "@/lib/internal-config";
import { normalizeProgress } from "@/lib/progress";
import { trainingModules } from "@/lib/training-content";
import styles from "../manager.module.css";

type Props = {
  params: Promise<{ userId: string }>;
};

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function dateLabel(value: string | undefined) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium" }).format(date);
}

export default async function EmployeeProgressPage({ params }: Props) {
  if (!isClerkConfigured()) redirect("/setup");
  const { userId: currentUserId } = await auth();
  if (!currentUserId) redirect("/sign-in");

  const client = await clerkClient();
  const current = await client.users.getUser(currentUserId);
  if (record(current.privateMetadata).vetwelRole !== "admin") redirect("/dashboard");

  const { userId } = await params;
  let user;
  try {
    user = await client.users.getUser(userId);
  } catch {
    notFound();
  }

  const metadata = record(user.privateMetadata);
  const progress = normalizeProgress(metadata.vetwelProgress);
  const primaryEmail = user.emailAddresses.find((item) => item.id === user.primaryEmailAddressId);
  const email = primaryEmail?.emailAddress || user.emailAddresses[0]?.emailAddress || "—";
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || email;
  const completed = trainingModules.filter((module) => Boolean(progress.completedTraining[module.slug])).length;
  const ready = completed === trainingModules.length && (progress.basicQuiz?.best ?? 0) >= 80 && (progress.advancedQuiz?.best ?? 0) >= 80;

  return (
    <main className="shell">
      <div className="page">
        <Link className="back-link" href="/manager">← Ekip paneline dön</Link>
        <span className="eyebrow">Çalışan detayı</span>
        <h1 className="module-title">{name}</h1>
        <p className="module-subtitle">{email}</p>

        <section className={styles.summary}>
          <article><span>Ürün eğitimi</span><strong>{completed}/{trainingModules.length}</strong></article>
          <article><span>Temel en iyi</span><strong>%{progress.basicQuiz?.best ?? 0}</strong></article>
          <article><span>Seviye 2 en iyi</span><strong>%{progress.advancedQuiz?.best ?? 0}</strong></article>
          <article><span>Durum</span><strong className={styles.statusWord}>{ready ? "Yetkin" : "Devam"}</strong></article>
        </section>

        <section className="section">
          <div className="section-head">
            <div><span className="eyebrow">Ürün bazlı</span><h2>Eğitim tamamlanma durumu</h2></div>
          </div>
          <div className={styles.detailList}>
            {trainingModules.map((module) => {
              const completedAt = progress.completedTraining[module.slug];
              return (
                <div className={styles.detailRow} key={module.slug}>
                  <div><strong>{module.product} {module.form}</strong><span>{module.supportArea}</span></div>
                  <div className={styles.detailStatus}>
                    <span className={completedAt ? styles.ready : styles.inProgress}>{completedAt ? "Tamamlandı" : "Eksik"}</span>
                    <small>{completedAt ? dateLabel(completedAt) : "—"}</small>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <div><span className="eyebrow">Sınav geçmişi</span><h2>Yetkinlik sonuçları</h2></div>
          </div>
          <div className={styles.examGrid}>
            <article>
              <span>Temel sınav</span>
              <strong>En iyi %{progress.basicQuiz?.best ?? 0}</strong>
              <p>Son: %{progress.basicQuiz?.last ?? 0} • Deneme: {progress.basicQuiz?.attempts ?? 0}</p>
              <small>Son kayıt: {dateLabel(progress.basicQuiz?.updatedAt)}</small>
            </article>
            <article>
              <span>Seviye 2 saha sınavı</span>
              <strong>En iyi %{progress.advancedQuiz?.best ?? 0}</strong>
              <p>Son: %{progress.advancedQuiz?.last ?? 0} • Deneme: {progress.advancedQuiz?.attempts ?? 0}</p>
              <small>Son kayıt: {dateLabel(progress.advancedQuiz?.updatedAt)}</small>
            </article>
          </div>
        </section>

        <section className="section placeholder">
          <h2>Yönetici yorumu</h2>
          <p>
            {ready
              ? "Bu çalışan mevcut VetWel temel saha yetkinliği standardını tamamlamış görünüyor: tüm ürün eğitimleri tamamlanmış ve iki sınavda da en iyi puan en az %80."
              : "Bu çalışan henüz temel saha yetkinliği standardını tamamlamadı. Eksik eğitimler veya %80 altındaki sınavlar yukarıda görülebilir."}
          </p>
        </section>
      </div>
    </main>
  );
}
