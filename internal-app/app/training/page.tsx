import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const products = [
  ["KidneyWel Tablet", "Renal sağlık desteği • tablet form"],
  ["KidneyWel Liquid", "Renal sağlık desteği • sıvı form"],
  ["LiverWel Tablet", "Karaciğer ve metabolik destek • tablet form"],
  ["LiverWel Liquid", "Karaciğer desteği • sıvı form"],
  ["CalmWel Tablet", "Sakin davranış ve stres desteği • tablet form"],
  ["CalmWel Liquid", "Sakin davranış ve stres desteği • sıvı form"],
  ["SkinWel", "Deri ve tüy sağlığı desteği"],
  ["HeartWel", "Kalp sağlığı desteği"],
  ["LactoWel", "Sindirim ve mikrobiyota desteği"],
  ["DentaWel", "Ağız ve diş sağlığı desteği"],
  ["Breathe Ease", "Solunum sağlığı desteği"],
  ["Cleanse", "Veteriner kullanımına yönelik üriner destek"],
  ["Malign Detox", "Tamamlayıcı wellness desteği"],
  ["Malt Paste", "Günlük bakım desteği"],
];

export default async function TrainingPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <main className="shell">
      <div className="page">
        <Link className="back-link" href="/dashboard">← Ana panele dön</Link>
        <span className="eyebrow">Modül 01</span>
        <h1 className="module-title">Ürün Eğitimi</h1>
        <p className="module-subtitle">
          Amaç yalnızca ürün adını ezberlemek değil. Her ürün için kullanım alanını,
          formülasyon mantığını, form farklarını, doğrulanmış doz bilgisini ve klinikte
          nasıl anlatılacağını öğrenmek.
        </p>

        <section className="product-grid">
          {products.map(([name, description]) => (
            <article className="product-card" key={name}>
              <strong>{name}</strong>
              <span>{description}</span>
            </article>
          ))}
        </section>

        <section className="section placeholder">
          <h2>Bir ürün eğitimi nasıl çalışacak?</h2>
          <p>
            Çalışan ürün seçtiğinde AI önce temel bilgiyi öğretecek; sonra içerik ve
            formülasyon mantığını, doz/kullanımı, veteriner görüşmesindeki anlatım dilini
            ve sık itirazları adım adım işleyecek. Eğitim sonunda kısa kontrol soruları gelecek.
          </p>
          <p className="placeholder-note">
            Sonraki adım: doğrulanmış VetWel bilgi tabanını bu ürün kartlarına bağlayıp ilk tam eğitim modülünü KidneyWel ile açmak.
          </p>
        </section>
      </div>
    </main>
  );
}
