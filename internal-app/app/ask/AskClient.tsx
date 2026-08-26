"use client";

import { FormEvent, useState } from "react";
import styles from "./AskClient.module.css";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const STARTER_PROMPTS = [
  "KidneyWel Tablet başlangıç protokolünü kısa anlat.",
  "Veteriner KidneyWel'de fosfor bağlayıcı var mı diye sorarsa ne söylemeliyim?",
  "KidneyWel Tablet ve Liquid arasındaki doğrulanmış farkları karşılaştır.",
  "15 kg köpek için SkinWel dozu sorulursa nasıl cevap vermeliyim?",
  "Breathe Ease için hangi doz bilgileri doğrulanmış, hangileri eksik?",
  "Cleanse hakkında pet sahibine hangi ifadeleri kullanmamalıyım?",
];

const WELCOME: ChatMessage = {
  role: "assistant",
  content:
    "VetWel Bilgi Asistanı hazır. Sorunu yaz; şirket içi bilgi tabanındaki doğrulanmış kayıtlara dayanarak yanıt vereceğim. Bir alan eksik, kısmen onaylı veya doğrulama bekliyorsa bunu açıkça belirteceğim ve tahmin yapmayacağım.",
};

export default function AskClient() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function sendQuestion(text: string) {
    const clean = text.trim();
    if (!clean || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: clean }];
    setMessages(nextMessages);
    setQuestion("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = (await response.json()) as { answer?: string; error?: string };

      if (!response.ok || !data.answer) {
        throw new Error(data.error || "AI yanıtı alınamadı.");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.answer as string },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Beklenmeyen bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendQuestion(question);
  }

  function resetChat() {
    if (loading) return;
    setMessages([WELCOME]);
    setQuestion("");
    setError("");
  }

  return (
    <section className={styles.panel} aria-label="VetWel Bilgi Asistanı">
      <div className={styles.toolbar}>
        <div>
          <strong>Şirket içi, doğrulanmış bilgi</strong>
          <span>Ürün, form, doz veya claim bilinmiyorsa asistan tahmin yapmaz.</span>
        </div>
        <button className={styles.reset} type="button" onClick={resetChat} disabled={loading}>
          Yeni konuşma
        </button>
      </div>

      <div className={styles.starters} aria-label="Örnek sorular">
        {STARTER_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => void sendQuestion(prompt)}
            disabled={loading}
          >
            {prompt}
          </button>
        ))}
      </div>

      <div className={styles.messages} aria-live="polite">
        {messages.map((message, index) => (
          <article
            className={[
              styles.message,
              message.role === "user" ? styles.user : styles.assistant,
            ].join(" ")}
            key={`${message.role}-${index}`}
          >
            <span className={styles.role}>{message.role === "user" ? "Siz" : "VetWel AI"}</span>
            <p>{message.content}</p>
          </article>
        ))}

        {loading && (
          <article className={[styles.message, styles.assistant, styles.loading].join(" ")}>
            <span className={styles.role}>VetWel AI</span>
            <p>Bilgi tabanı kontrol ediliyor…</p>
          </article>
        )}
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <form className={styles.composer} onSubmit={handleSubmit}>
        <label htmlFor="vetwel-question">Sorunuz</label>
        <textarea
          id="vetwel-question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Örn. 20 kg köpek için KidneyWel Tablet dozu nedir?"
          rows={4}
          maxLength={2500}
          disabled={loading}
        />
        <div className={styles.composerFooter}>
          <span>{question.length}/2500</span>
          <button type="submit" disabled={loading || !question.trim()}>
            {loading ? "Yanıt hazırlanıyor…" : "Gönder"}
          </button>
        </div>
      </form>

      <p className={styles.footnote}>
        Bu asistan VetWel&apos;in şirket içi kayıtlarını kullanır ve veri statüsünü koruyacak şekilde
        tasarlanmıştır. Klinik karar ve hasta değerlendirmesi veteriner hekimin sorumluluğundadır.
      </p>
    </section>
  );
}
