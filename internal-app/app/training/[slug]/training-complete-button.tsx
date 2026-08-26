"use client";

import { useEffect, useState } from "react";
import type { VetWelProgress } from "@/lib/progress";
import styles from "./training-complete-button.module.css";

type Props = {
  slug: string;
};

export default function TrainingCompleteButton({ slug }: Props) {
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    void fetch("/api/progress", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("İlerleme bilgisi alınamadı.");
        return response.json() as Promise<{ progress: VetWelProgress }>;
      })
      .then((data) => {
        if (active) setCompleted(Boolean(data.progress.completedTraining[slug]));
      })
      .catch(() => {
        if (active) setError("İlerleme kaydı şu anda okunamadı.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [slug]);

  async function markComplete() {
    if (completed || saving) return;
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "complete_training", slug }),
      });
      if (!response.ok) throw new Error("Eğitim tamamlanamadı.");
      setCompleted(true);
    } catch {
      setError("Tamamlama kaydedilemedi. Tekrar deneyin.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={styles.completion}>
      <div>
        <span className="eyebrow">İlerleme</span>
        <h2>{completed ? "Bu eğitim tamamlandı" : "Modülü tamamladın mı?"}</h2>
        <p>
          {completed
            ? "Tamamlama VetWel hesabına kaydedildi."
            : "İçeriği ve kontrol sorularını bitirdiysen ilerlemene ekle."}
        </p>
      </div>
      <button
        className={`${styles.button} ${completed ? styles.done : ""}`}
        disabled={completed || loading || saving}
        onClick={markComplete}
        type="button"
      >
        {loading ? "Kontrol ediliyor…" : saving ? "Kaydediliyor…" : completed ? "✓ Tamamlandı" : "Eğitimi tamamladım"}
      </button>
      {error ? <span className={styles.error}>{error}</span> : null}
    </div>
  );
}
