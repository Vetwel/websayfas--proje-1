import Link from "next/link";
import { auth } from "@/lib/clerk-server";
import { redirect } from "next/navigation";
import { isClerkConfigured } from "@/lib/internal-config";
import { trainingModules } from "@/lib/training-content";
import AdvancedRoleplayClient from "./advanced-roleplay-client";

const veterinarianTypes = [
  {
    title: "Kanıt odaklı veteriner",
    focus: "Mekanizma, veri kaynağı ve teknik tutarlılık sorar.",
    opening: "Kısa ürün iddiası yerine doğrulanmış destek alanı ve formülasyon mantığıyla başla.",
    avoid: "Doğrulanmamış mekanizma, kesin klinik sonuç veya veri varmış gibi konuşmak.",
  },
  {
    title: "Zamanı çok kısıtlı veteriner",
    focus: "20–30 saniyede neden dinlemesi gerektiğini anlamak ister.",
    opening: "Tek ihtiyaç alanı + tek ürün farkı + kısa kapanış sorusu kullan.",
    avoid: "Uzun içerik listesi, arka plan hikâyesi ve gereksiz teknik detay.",
  },
  {
    title: "Şüpheci veteriner",
    focus: "Supplement kategorisine, claim diline ve ürün farkına itiraz eder.",
    opening: "İtirazı kabul et; VetWel’in doğrulanmış bilgi ve sınır disiplinini göster.",
    avoid: "Rakibe saldırmak, üstünlük garantisi veya savunmacı dil.",
  },
  {
    title: "Mevcut ürüne sadık veteriner",
    focus: "Halihazırda kullandığı üründen neden uzaklaşması gerektiğini sorgular.",
    opening: "Değiştirmeye zorlamak yerine hangi destek alanında VetWel’in değerlendirilebileceğini sor.",
    avoid: "Rakip ürün hakkında doğrulanmamış olumsuz iddialar veya kesin üstünlük söylemi.",
  },
  {
    title: "Pratik / uygulama odaklı veteriner",
    focus: "Doz, form, kullanım kolaylığı ve klinikte nasıl konumlandıracağını sorar.",
    opening: "Önce ürün/formu netleştir; yalnız doğrulanmış kullanım bilgisini kısa ver.",
    avoid: "Tablet/Liquid karıştırmak veya veri boşluğunda doz tahmini yapmak.",
  },
];

export default async function AdvancedCoachPage() {
  if (!isClerkConfigured()) redirect("/setup");
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const products = trainingModules.map((module) => `${module.product} ${module.form}`);

  return (
    <main className="shell">
      <div className="page">
        <Link className="back-link" href="/dashboard">← Ana panele dön</Link>
        <span className="eyebrow">İleri Saha Koçluğu</span>
        <h1 className="module-title">Veteriner Tipine Göre Görüşme</h1>
        <p className="module-subtitle">
          Aynı ürün her veterinerle aynı şekilde konuşulmaz. Bu modül ürün bilgisini değiştirmez;
          yalnız doğrulanmış VetWel bilgisinin hangi iletişim biçimiyle sunulacağını çalıştırır.
        </p>

        <section className="scenario-grid">
          {veterinarianTypes.map((item, index) => (
            <article className="scenario-card" key={item.title}>
              <span className="scenario-index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p className="scenario-answer"><strong>Ne arar?</strong> {item.focus}</p>
              <p className="scenario-answer"><strong>Nasıl aç?</strong> {item.opening}</p>
              <div className="scenario-boundary">
                <strong>Kaçın</strong>
                <span>{item.avoid}</span>
              </div>
            </article>
          ))}
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <span className="eyebrow">Canlı simülasyon</span>
              <h2>AI veteriner rolüne girsin</h2>
            </div>
            <p>Her turda tek itiraz • sonunda puanlama</p>
          </div>
          <AdvancedRoleplayClient products={products} />
        </section>

        <section className="section coach-framework">
          <div>
            <span className="eyebrow">Değerlendirme standardı</span>
            <h2>İyi saha cevabı ne demek?</h2>
          </div>
          <div className="framework-steps">
            <article><span>35</span><strong>Bilgi doğruluğu</strong><p>Ürün/form/doz ve konumlandırma yalnız doğrulanmış kayıttan gelmeli.</p></article>
            <article><span>25</span><strong>Sınır disiplini</strong><p>Tedavi claim’i, form karışımı ve veri boşluğunda tahmin olmamalı.</p></article>
            <article><span>20</span><strong>Netlik</strong><p>Cevap kısa, profesyonel ve klinikte kullanılabilir olmalı.</p></article>
            <article><span>20</span><strong>Görüşme yönetimi</strong><p>İhtiyacı anlamalı, uygun soru sormalı ve doğal kapanış yapmalı.</p></article>
          </div>
        </section>
      </div>
    </main>
  );
}
