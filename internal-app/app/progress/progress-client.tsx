"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { VetWelProgress } from "@/lib/progress";
import { trainingModules } from "@/lib/training-content";
import styles from "./progress.module.css";

export default function ProgressClient() {
  const [progress, setProgress] = useState<VetWelProgress | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    void fetch("/api/progress", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("İlerleme alınamadı.");
        return response.json() as Promise<{ progress: VetWelProgress }>;
      })
      .then((data) => setProgress(data.progress))
      .catch(() => setError("İlerleme bilgisi şu anda yüklenemedi."));
  }, []);

  const completedCount = useMemo(
    () => progress ? trainingModules.filter((module) => Boolean(progress.completedTraining[module.slug])).length : 0,
    [progress],
  );

  if (error) return <section className="placeholder"><h2>İlerleme yüklenemedi</h2><p>{error}</p></section>;
  if (!progress) return <section className="placeholder"><h2>İlerleme yükleniyor…</h2></section>;

  const trainingPercent = Math.round((completedCount / trainingModules.length) * 100);
  const basicBest = progress.basicQuiz?.best ?? 0;
  const advancedBest = progress.advancedQuiz?.best ?? 0;
  const roleplayAttempts = progress.roleplay?.attempts ?? 0;
  const overall = Math.round((trainingPercent + basicBest + advancedBest) / 3);

  return (
    <>
      <section className={styles.summaryGrid}>
        <article className={`${styles.stat} ${styles.statMain}`}>
          <span>Genel gelişim</span>
          <strong>%{overall}</strong>
          <p>Eğitim tamamlama + iki sınavın en iyi puanı.</p>
        </article>
        <article className={styles.stat}>
          <span>Ürün eğitimleri</span>
          <strong>{completedCount}/{trainingModules.length}</strong>
          <p>%{trainingPercent} tamamlandı</p>
        </article>
        <article className={styles.stat}>
          <span>Temel sınav</span>
          <strong>%{basicBest}</strong>
          <p>{progress.basicQuiz?.attempts ?? 0} deneme</p>
        </article>
        <article className={styles.stat}>
          <span>Seviye 2</span>
          <strong>%{advancedBest}</strong>
          <p>{progress.advancedQuiz?.attempts ?? 0} deneme</p>
        </article>
        <article className={styles.stat}>
          <span>AI rol-play</span>
          <strong>{roleplayAttempts}</strong>
          <p>{progress.roleplay?.lastPersona ? `Son: ${progress.roleplay.lastPersona}` : "Henüz değerlendirilmiş prova yok"}</p>
        </article>
      </section>

      {progress.roleplay?.lastProduct ? (
        <section className="section info-panel">
          <div className="progress-row">
            <div>
              <strong>Son AI saha provası</strong>
              <span>{progress.roleplay.lastProduct} • {progress.roleplay.lastPersona} • {progress.roleplay.lastDifficulty}</span>
            </div>
            <Link className="status" href="/advanced-coach">Tekrar prova →</Link>
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="section-head">
          <div><span className="eyebrow">Ürün bazlı</span><h2>Eğitim durumu</h2></div>
          <p>{completedCount} tamamlandı</p>
        </div>
        <div className={styles.moduleList}>
          {trainingModules.map((module) => {
            const done = Boolean(progress.completedTraining[module.slug]);
            return (
              <Link className={styles.moduleRow} href={`/training/${module.slug}`} key={module.slug}>
                <div>
                  <strong>{module.product} {module.form}</strong>
                  <span>{module.supportArea}</span>
                </div>
                <span className={`${styles.pill} ${done ? styles.pillDone : ""}`}>
                  {done ? "✓ Tamamlandı" : "Başlanabilir"}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div><span className="eyebrow">Sıradaki adım</span><h2>Önerilen gelişim yolu</h2></div>
        </div>
        <div className="info-panel">
          {completedCount < trainingModules.length ? (
            <div className="progress-row"><div><strong>Eksik ürün eğitimlerini tamamla</strong><span>Önce tüm ürün/form modüllerini bitir.</span></div><Link className="status" href="/training">Eğitime git →</Link></div>
          ) : null}
          {basicBest < 80 ? (
            <div className="progress-row"><div><strong>Temel yetkinliği geç</strong><span>Hedef en az %80.</span></div><Link className="status" href="/quiz">Sınava git →</Link></div>
          ) : null}
          {advancedBest < 80 ? (
            <div className="progress-row"><div><strong>Seviye 2 saha sınavını geç</strong><span>Gerçek veteriner senaryolarında hedef en az %80.</span></div><Link className="status" href="/quiz/advanced">Seviye 2 →</Link></div>
          ) : null}
          {roleplayAttempts < 3 ? (
            <div className="progress-row"><div><strong>En az 3 AI rol-play tamamla</strong><span>Farklı veteriner profilleriyle sahaya çıkmadan önce pratik yap.</span></div><Link className="status" href="/advanced-coach">Rol-play →</Link></div>
          ) : null}
          {completedCount === trainingModules.length && basicBest >= 80 && advancedBest >= 80 && roleplayAttempts >= 3 ? (
            <div className="progress-row"><div><strong>Temel saha hazırlık standardı tamamlandı</strong><span>Eğitim, sınav ve rol-play temel hedeflerini tamamladın; pratiği düzenli sürdür.</span></div><Link className="status" href="/meeting-prep">Görüşmeye hazırlan →</Link></div>
          ) : null}
        </div>
      </section>
    </>
  );
}
