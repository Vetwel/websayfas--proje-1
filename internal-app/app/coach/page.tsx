import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function CoachPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <main className="shell">
      <div className="page">
        <Link className="back-link" href="/dashboard">← Ana panele dön</Link>
        <span className="eyebrow">Modül 02</span>
        <h1 className="module-title">Satış Koçu</h1>
        <p className="module-subtitle">
          Veteriner kliniği görüşmesi öncesi hazırlık, ürün seçimi, itiraz çalışması ve
          görüşme sonrası takip için kişisel saha koçu.
        </p>

        <section className="grid">
          <article className="card">
            <div className="card-icon">A</div>
            <h2>Görüşmeye hazırlan</h2>
            <p>Klinik profiline göre hangi VetWel ürünleriyle başlamanın daha uygun olduğunu çalış.</p>
          </article>
          <article className="card">
            <div className="card-icon">B</div>
            <h2>İtiraz provası</h2>
            <p>AI veteriner rolüne girsin; fiyat, içerik, doz ve ürün farkı itirazlarını pratik et.</p>
          </article>
          <article className="card">
            <div className="card-icon">C</div>
            <h2>Kısa anlatım</h2>
            <p>Bir ürünü 30 saniye, 2 dakika veya detaylı teknik formatta nasıl anlatacağını çalış.</p>
          </article>
          <article className="card">
            <div className="card-icon">D</div>
            <h2>Takip planı</h2>
            <p>Görüşme sonucuna göre bir sonraki temasın mesajını ve hedefini oluştur.</p>
          </article>
        </section>
      </div>
    </main>
  );
}
