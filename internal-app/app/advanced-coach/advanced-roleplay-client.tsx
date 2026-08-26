"use client";

import { FormEvent, useState } from "react";
import styles from "./advanced-roleplay.module.css";

type Props = {
  products: string[];
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const personas = [
  "Kanıt odaklı veteriner",
  "Zamanı çok kısıtlı veteriner",
  "Şüpheci veteriner",
  "Mevcut ürüne sadık veteriner",
  "Pratik / uygulama odaklı veteriner",
];

export default function AdvancedRoleplayClient({ products }: Props) {
  const [product, setProduct] = useState(products[0] || "");
  const [persona, setPersona] = useState(personas[0]);
  const [difficulty, setDifficulty] = useState("Orta");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [started, setStarted] = useState(false);
  const [evaluated, setEvaluated] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function callAI(nextMessages: ChatMessage[]) {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = (await response.json()) as { answer?: string; error?: string };
      if (!response.ok || !data.answer) throw new Error(data.error || "Rol-play yanıtı alınamadı.");
      const completed: ChatMessage[] = [...nextMessages, { role: "assistant", content: data.answer }];
      setMessages(completed);
      return completed;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Beklenmeyen bir hata oluştu.");
      return nextMessages;
    } finally {
      setLoading(false);
    }
  }

  async function savePractice() {
    setSaveState("saving");
    try {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "roleplay_result",
          product,
          persona,
          difficulty,
        }),
      });
      if (!response.ok) throw new Error("save failed");
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  }

  async function startRoleplay() {
    if (!product || loading) return;
    const seed: ChatMessage = {
      role: "user",
      content: [
        "İleri VetWel saha rol-play'i başlat.",
        `Ürün/form: ${product}.`,
        `Veteriner profili: ${persona}.`,
        `Zorluk: ${difficulty}.`,
        "Sen veteriner hekim rolündesin; ben VetWel saha çalışanıyım.",
        "Gerçekçi davran. Her turda yalnız bir soru veya itiraz sor ve cevabımı bekle.",
        "Kolay onay verme; seçilen veteriner profilinin davranışını koru.",
        "Ürün hakkında yalnız VetWel bilgi tabanında doğrulanmış bilgiler üzerinden itiraz geliştir; doğrulanmamış bilgiyi gerçekmiş gibi kullanma.",
        "İlk veteriner sorusunu şimdi sor. Cevabımı henüz değerlendirme.",
      ].join("\n"),
    };
    setStarted(true);
    setEvaluated(false);
    setSaveState("idle");
    setMessages([]);
    setAnswer("");
    await callAI([seed]);
  }

  async function submitAnswer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const clean = answer.trim();
    if (!clean || loading || !started || evaluated) return;
    const next: ChatMessage[] = [...messages, { role: "user", content: clean }];
    setAnswer("");
    await callAI(next);
  }

  async function evaluateRoleplay() {
    if (!started || loading || messages.length < 3) return;
    const prompt: ChatMessage = {
      role: "user",
      content: [
        "Rol-play'i burada bitir ve performansımı değerlendir.",
        "100 puan üzerinden şu rubric ile puanla:",
        "- Bilgi doğruluğu 35 puan",
        "- Claim/veri sınırı disiplini 25 puan",
        "- Netlik ve profesyonel dil 20 puan",
        "- İhtiyacı anlama ve görüşme yönetimi 10 puan",
        "- Doğal kapanış / sonraki adım 10 puan",
        "Çıktı: Toplam puan, 5 alt puan, en iyi 2 yön, düzeltilmesi gereken 2 nokta ve bir sonraki prova önerisi.",
        "Yalnız doğrulanmış VetWel bilgisine göre değerlendir; eksik ürün bilgisini çalışana hata olarak yükleme.",
      ].join("\n"),
    };
    setEvaluated(true);
    await callAI([...messages, prompt]);
    await savePractice();
  }

  function reset() {
    setMessages([]);
    setAnswer("");
    setError("");
    setStarted(false);
    setEvaluated(false);
    setSaveState("idle");
  }

  const visibleMessages = messages.filter((message, index) => !(index === 0 && message.role === "user"));

  return (
    <div className={styles.layout}>
      <aside className={styles.setup}>
        <div className={styles.field}>
          <label htmlFor="role-product">Ürün / form</label>
          <select id="role-product" value={product} onChange={(event) => setProduct(event.target.value)} disabled={started && !evaluated}>
            {products.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="role-persona">Veteriner profili</label>
          <select id="role-persona" value={persona} onChange={(event) => setPersona(event.target.value)} disabled={started && !evaluated}>
            {personas.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="role-difficulty">Zorluk</label>
          <select id="role-difficulty" value={difficulty} onChange={(event) => setDifficulty(event.target.value)} disabled={started && !evaluated}>
            <option>Temel</option>
            <option>Orta</option>
            <option>Zor</option>
          </select>
        </div>

        {!started ? (
          <button className="primary-button" type="button" onClick={() => void startRoleplay()} disabled={!product || loading}>
            Rol-play başlat
          </button>
        ) : (
          <div className={styles.actions}>
            <button className="secondary-button" type="button" onClick={reset} disabled={loading}>Yeni prova</button>
            <button className="primary-button" type="button" onClick={() => void evaluateRoleplay()} disabled={loading || evaluated || messages.length < 3}>
              Provayı değerlendir
            </button>
          </div>
        )}
        <p className={styles.note}>AI gerçek veteriner rolünü oynar; ürün bilgisinde ise VetWel doğrulama sınırlarının dışına çıkmamalıdır.</p>
        {saveState !== "idle" ? (
          <p className={styles.note}>
            {saveState === "saving" ? "Prova etkinliği hesabına kaydediliyor…" : saveState === "saved" ? "✓ Prova etkinliği VetWel hesabına kaydedildi." : "Prova tamamlandı ancak etkinlik kaydı yapılamadı."}
          </p>
        ) : null}
      </aside>

      <section className={styles.chat} aria-live="polite">
        <div className={styles.chatHead}>
          <div>
            <span className="eyebrow">{persona}</span>
            <strong>{product || "Ürün seç"}</strong>
          </div>
          <span className={styles.level}>{difficulty}</span>
        </div>

        <div className={styles.messages}>
          {!started ? (
            <div className={styles.empty}>
              <strong>Gerçekçi bir veteriner görüşmesi başlat.</strong>
              <p>Profil ve zorluk seçildiğinde AI tek tek itiraz soracak; sen saha çalışanı gibi cevap vereceksin.</p>
            </div>
          ) : null}
          {visibleMessages.map((message, index) => {
            const isLastAssistant = evaluated && message.role === "assistant" && index === visibleMessages.length - 1;
            return (
              <article className={`${styles.message} ${message.role === "user" ? styles.employee : styles.vet}`} key={`${message.role}-${index}`}>
                <span>{message.role === "user" ? "Sen" : isLastAssistant ? "AI Koç" : "Veteriner"}</span>
                <p>{message.content}</p>
              </article>
            );
          })}
          {loading ? <div className={styles.loading}>Yanıt hazırlanıyor…</div> : null}
        </div>

        {error ? <div className={styles.error}>{error}</div> : null}

        {started && !evaluated ? (
          <form className={styles.composer} onSubmit={submitAnswer}>
            <label htmlFor="role-answer">Cevabın</label>
            <textarea
              id="role-answer"
              rows={3}
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              placeholder="Veterinere sahada nasıl cevap vereceksen öyle yaz…"
              maxLength={1500}
              disabled={loading}
            />
            <button className="primary-button" type="submit" disabled={loading || !answer.trim()}>Cevabı gönder</button>
          </form>
        ) : null}
      </section>
    </div>
  );
}
