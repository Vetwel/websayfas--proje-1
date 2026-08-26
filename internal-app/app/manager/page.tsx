import Link from "next/link";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isClerkConfigured } from "@/lib/internal-config";
import { normalizeProgress } from "@/lib/progress";
import { trainingModules } from "@/lib/training-content";
import styles from "./manager.module.css";

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export default async function ManagerPage() {
  if (!isClerkConfigured()) redirect("/setup");
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const client = await clerkClient();
  const current = await client.users.getUser(userId);
  const currentMetadata = record(current.privateMetadata);
  if (currentMetadata.vetwelRole !== "admin") redirect("/dashboard");

  const result = await client.users.getUserList({ limit: 100 });
  const rows = result.data.map((user) => {
    const metadata = record(user.privateMetadata);
    const progress = normalizeProgress(metadata.vetwelProgress);
    const completed = trainingModules.filter((module) => Boolean(progress.completedTraining[module.slug])).length;
    const primaryEmail = user.emailAddresses.find((item) => item.id === user.primaryEmailAddressId);
    const email = primaryEmail?.emailAddress || user.emailAddresses[0]?.emailAddress || "—";
    const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || email;
    return {
      id: user.id,
      name,
      email,
      completed,
      basic: progress.basicQuiz?.best ?? 0,
      advanced: progress.advancedQuiz?.best ?? 0,
      attempts: (progress.basicQuiz?.attempts ?? 0) + (progress.advancedQuiz?.attempts ?? 0),
    };
  });

  const fullyTrained = rows.filter((row) => row.completed === trainingModules.length && row.basic >= 80 && row.advanced >= 80).length;
  const averageBasic = rows.length ? Math.round(rows.reduce((sum, row) => sum + row.basic, 0) / rows.length) : 0;
  const averageAdvanced = rows.length ? Math.round(rows.reduce((sum, row) => sum + row.advanced, 0) / rows.length) : 0;

  return (
    <main className="shell">
      <div className="page">
        <Link className="back-link" href="/dashboard">← Ana panele dön</Link>
        <span className="eyebrow">Yönetici alanı</span>
        <h1 className="module-title">Ekip Eğitim Paneli</h1>
        <p className="module-subtitle">
          VetWel kullanıcılarının ürün eğitimi tamamlama durumunu ve en iyi temel/Seviye 2 sınav puanlarını tek ekranda izler.
        </p>

        <section className={styles.summary}>
          <article><span>Aktif kullanıcı</span><strong>{rows.length}</strong></article>
          <article><span>Temel yetkinliği tamamlayan</span><strong>{fullyTrained}</strong></article>
          <article><span>Temel sınav ort.</span><strong>%{averageBasic}</strong></article>
          <article><span>Seviye 2 ort.</span><strong>%{averageAdvanced}</strong></article>
        </section>

        <section className="section">
          <div className="section-head">
            <div><span className="eyebrow">Ekip görünümü</span><h2>Çalışan ilerlemesi</h2></div>
            <p>Hedef: tüm eğitimler + her iki sınavda en az %80</p>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Çalışan</th>
                  <th>Eğitim</th>
                  <th>Temel</th>
                  <th>Seviye 2</th>
                  <th>Deneme</th>
                  <th>Durum</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const ready = row.completed === trainingModules.length && row.basic >= 80 && row.advanced >= 80;
                  return (
                    <tr key={row.id}>
                      <td><strong>{row.name}</strong><span>{row.email}</span></td>
                      <td>{row.completed}/{trainingModules.length}</td>
                      <td>%{row.basic}</td>
                      <td>%{row.advanced}</td>
                      <td>{row.attempts}</td>
                      <td><span className={ready ? styles.ready : styles.inProgress}>{ready ? "Yetkin" : "Devam ediyor"}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="section placeholder">
          <h2>Yetkilendirme</h2>
          <p>
            Bu sayfa yalnız Clerk private metadata alanında <strong>vetwelRole = admin</strong> olan hesaplara açılır. Normal çalışanlar yöneticilik verisini göremez.
          </p>
        </section>
      </div>
    </main>
  );
}
