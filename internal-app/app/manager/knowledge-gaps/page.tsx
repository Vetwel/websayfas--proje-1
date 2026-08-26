import Link from "next/link";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isClerkConfigured } from "@/lib/internal-config";
import { verificationQueue } from "@/lib/training-content";

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export default async function KnowledgeGapsPage() {
  if (!isClerkConfigured()) redirect("/setup");
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const client = await clerkClient();
  const current = await client.users.getUser(userId);
  if (record(current.privateMetadata).vetwelRole !== "admin") redirect("/dashboard");

  const partial = verificationQueue.filter((item) => item.status === "KISMEN ONAYLI");
  const missing = verificationQueue.filter((item) => item.status === "DOĞRULAMA GEREKİYOR");

  return (
    <main className="shell">
      <div className="page">
        <Link className="back-link" href="/manager">← Yönetici paneline dön</Link>
        <span className="eyebrow">Bilgi yönetimi</span>
        <h1 className="module-title">Bilgi Açıkları Merkezi</h1>
        <p className="module-subtitle">
          AI’ın tahmin etmemesi gereken açık alanları burada görürsün. Bu liste tamamlandıkça ürün eğitimleri ve AI cevap kapsamı genişler.
        </p>

        <section className="training-facts">
          <article className="training-fact"><span>Kısmen onaylı</span><strong>{partial.length}</strong></article>
          <article className="training-fact"><span>Doğrulama gerekiyor</span><strong>{missing.length}</strong></article>
          <article className="training-fact"><span>Toplam açık kayıt</span><strong>{verificationQueue.length}</strong></article>
        </section>

        <section className="section">
          <div className="section-head">
            <div><span className="eyebrow">Önce tamamlanabilir</span><h2>Kısmen onaylı ürünler</h2></div>
            <p>Mevcut bilgi kullanılabilir; eksik alan tahmin edilmez.</p>
          </div>
          <div className="info-panel">
            {partial.map((item) => (
              <div className="progress-row" key={item.name}>
                <div><strong>{item.name}</strong><span>{item.note}</span></div>
                <span className="content-badge content-badge-partial">{item.status}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <div><span className="eyebrow">Veri gerekli</span><h2>Doğrulama bekleyen ürün/formlar</h2></div>
            <p>Bu alanlar kesin bilgi gibi kullanılamaz.</p>
          </div>
          <div className="info-panel">
            {missing.map((item) => (
              <div className="progress-row" key={item.name}>
                <div><strong>{item.name}</strong><span>{item.note}</span></div>
                <span className="status">{item.status}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section coach-framework">
          <div><span className="eyebrow">Doğrulama standardı</span><h2>Bir açığı kapatırken</h2></div>
          <div className="framework-steps">
            <article><span>1</span><strong>Formu netleştir</strong><p>Tablet, Liquid, saşe veya klinik form ayrı kayıt olarak ele alınır.</p></article>
            <article><span>2</span><strong>Resmi kaynağı kullan</strong><p>Etiket, spec sheet veya marka tarafından onaylanmış ürün metni esas alınır.</p></article>
            <article><span>3</span><strong>Dozu ayrı doğrula</strong><p>Tür, kilo, sıklık, süre ve ara kilo kuralı açıkça kayıtlı olmalıdır.</p></article>
            <article><span>4</span><strong>Claim sınırını yaz</strong><p>Ne söylenebilir ve hangi güçlü ifadelerin kullanılmaması gerektiği birlikte tanımlanır.</p></article>
          </div>
        </section>
      </div>
    </main>
  );
}
