import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AskPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <main className="shell">
      <div className="page">
        <Link className="back-link" href="/dashboard">← Ana panele dön</Link>
        <span className="eyebrow">VetWel Bilgi Asistanı</span>
        <h1 className="module-title">AI'a Sor</h1>
        <p className="module-subtitle">
          VetWel ürünleri, dozlar, formlar, içerikler ve klinik anlatım hakkında şirket içi
          bilgi tabanına soru sorulacak alan.
        </p>

        <section className="placeholder">
          <h2>AI bağlantısı için ekran hazır</h2>
          <p>
            Bu bölüm bir sonraki teknik adımda VetWel'in onaylı bilgi tabanına bağlanacak.
            Yanıt sistemi güçlü ham claim'leri arka planda bilecek; çalışan yanıtlarında ise
            tanımladığımız kontrollü VetWel dilini kullanacak.
          </p>
          <p className="placeholder-note">
            Örnek soru: “KidneyWel Tablet'i yeni başlayan bir satış temsilcisine adım adım öğret.”
          </p>
        </section>
      </div>
    </main>
  );
}
