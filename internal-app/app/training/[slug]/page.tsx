import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { isClerkConfigured } from "@/lib/internal-config";
import { getTrainingModule } from "@/lib/training-content";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function TrainingDetailPage({ params }: Props) {
  if (!isClerkConfigured()) {
    redirect("/setup");
  }

  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const { slug } = await params;
  const module = getTrainingModule(slug);
  if (!module) notFound();

  return (
    <main className="shell">
      <div className="page training-detail">
        <Link className="back-link" href="/training">← Ürün eğitimlerine dön</Link>

        <div className="training-title-row">
          <div>
            <span className="eyebrow">Doğrulanmış Eğitim • {module.form}</span>
            <h1 className="module-title">{module.product} {module.form}</h1>
            <p className="module-subtitle">{module.positioning}</p>
          </div>
          <span className="content-badge content-badge-ready">{module.status}</span>
        </div>

        <section className="training-facts">
          <article className="training-fact">
            <span>Destek alanı</span>
            <strong>{module.supportArea}</strong>
          </article>
          <article className="training-fact">
            <span>Hedef tür</span>
            <strong>{module.target}</strong>
          </article>
          <article className="training-fact">
            <span>Form</span>
            <strong>{module.form}</strong>
          </article>
        </section>

        <section className="training-block">
          <span className="training-step">01</span>
          <div>
            <h2>Doz ve kullanım</h2>
            <p>{module.dose}</p>
          </div>
        </section>

        <section className="training-block">
          <span className="training-step">02</span>
          <div>
            <h2>İçerik ve formülasyon mantığı</h2>
            <ul className="training-list">
              {module.formulation.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </section>

        <section className="training-block training-block-highlight">
          <span className="training-step">03</span>
          <div>
            <h2>Klinikte 30 saniyelik anlatım</h2>
            <p className="clinic-pitch">“{module.clinicPitch}”</p>
          </div>
        </section>

        <section className="say-grid">
          <article className="say-card say-card-good">
            <span className="eyebrow">Söyle</span>
            <h2>Doğru iletişim</h2>
            <ul className="training-list">
              {module.doSay.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
          <article className="say-card say-card-bad">
            <span className="eyebrow">Söyleme</span>
            <h2>Sınırı aşma</h2>
            <ul className="training-list">
              {module.dontSay.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <span className="eyebrow">Kendini kontrol et</span>
              <h2>Modül sonu soruları</h2>
            </div>
          </div>
          <div className="checkpoint-list">
            {module.checkpoints.map((item, index) => (
              <details className="checkpoint" key={item.question}>
                <summary>{index + 1}. {item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="section placeholder">
          <h2>AI ile pekiştir</h2>
          <p>
            Bu modülü bitirdikten sonra AI Soru-Cevap alanında ürünün dozu, form farkları,
            klinik anlatımı veya itirazlarıyla ilgili sorular sorabilirsin. AI doğrulanmamış
            bir bilgiyi tahmin etmemelidir.
          </p>
          <p><Link className="back-link" href="/ask">AI’a soru sor →</Link></p>
        </section>
      </div>
    </main>
  );
}
