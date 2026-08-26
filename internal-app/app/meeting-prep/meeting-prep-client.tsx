"use client";

import { FormEvent, useState } from "react";
import styles from "./meeting-prep.module.css";

type Props = {
  products: string[];
};

export default function MeetingPrepClient({ products }: Props) {
  const [product, setProduct] = useState(products[0] || "");
  const [duration, setDuration] = useState("30 saniye");
  const [goal, setGoal] = useState("İlk kez tanıtım");
  const [context, setContext] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!product || loading) return;

    const prompt = [
      `Bir veteriner görüşmesine hazırlanıyorum. Ürün/form: ${product}.`,
      `Görüşme süresi: ${duration}.`,
      `Görüşme hedefi: ${goal}.`,
      context.trim() ? `Ek bağlam: ${context.trim()}.` : "",
      "Bana yalnız doğrulanmış VetWel bilgi tabanını kullanarak şu sırada saha planı hazırla:",
      "1) Açılış cümlesi, 2) 3 ana mesaj, 3) veterinerin sorabileceği 3 zor soru ve kısa cevap, 4) kesinlikle söylememem gereken 2 ifade, 5) doğal kapanış cümlesi.",
      "Ürün/form için eksik veya kısmen onaylı veri varsa bunu açıkça göster ve tahmin yapma.",
    ].filter(Boolean).join("\n");

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
      });
      const data = (await response.json()) as { answer?: string; error?: string };
      if (!response.ok || !data.answer) throw new Error(data.error || "Görüşme planı hazırlanamadı.");
      setAnswer(data.answer);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Beklenmeyen bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.layout}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="prep-product">Ürün / form</label>
          <select id="prep-product" value={product} onChange={(event) => setProduct(event.target.value)}>
            {products.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>

        <div className={styles.twoColumns}>
          <div className={styles.field}>
            <label htmlFor="prep-duration">Görüşme süresi</label>
            <select id="prep-duration" value={duration} onChange={(event) => setDuration(event.target.value)}>
              <option>30 saniye</option>
              <option>2 dakika</option>
              <option>5 dakika</option>
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="prep-goal">Hedef</label>
            <select id="prep-goal" value={goal} onChange={(event) => setGoal(event.target.value)}>
              <option>İlk kez tanıtım</option>
              <option>Ürünü yeniden hatırlatma</option>
              <option>İtirazı aşma</option>
              <option>Teknik ürün anlatımı</option>
              <option>Takip görüşmesi</option>
            </select>
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="prep-context">Ek bağlam <span>opsiyonel</span></label>
          <textarea
            id="prep-context"
            value={context}
            onChange={(event) => setContext(event.target.value)}
            placeholder="Örn. Veteriner renal vakalarla yoğun çalışıyor ve fosfor konusunu sık soruyor."
            rows={4}
            maxLength={800}
          />
        </div>

        <button className="primary-button" disabled={loading || !product} type="submit">
          {loading ? "VetWel bilgi tabanı kontrol ediliyor…" : "Görüşme planını hazırla"}
        </button>
        <p className={styles.note}>AI yalnız VetWel bilgi tabanındaki doğrulanmış alanları kullanmalı; veri boşluğunda tahmin yapmamalıdır.</p>
      </form>

      <section className={styles.result} aria-live="polite">
        <span className="eyebrow">AI Saha Planı</span>
        {!answer && !error && !loading ? (
          <div className={styles.empty}>
            <strong>Hazırlık planın burada görünecek.</strong>
            <p>Ürün/formu ve görüşme hedefini seç. AI kısa açılıştan itiraz cevaplarına kadar görüşme akışını hazırlasın.</p>
          </div>
        ) : null}
        {loading ? <div className={styles.empty}><strong>Hazırlanıyor…</strong><p>Doğrulanmış ürün/form kayıtları kontrol ediliyor.</p></div> : null}
        {error ? <div className={styles.error}>{error}</div> : null}
        {answer ? <div className={styles.answer}>{answer}</div> : null}
      </section>
    </div>
  );
}
