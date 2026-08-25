import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AskClient from "./AskClient";
import { isClerkConfigured, isOpenAIConfigured } from "@/lib/internal-config";

export default async function AskPage() {
  if (!isClerkConfigured()) {
    redirect("/setup");
  }

  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <main className="shell">
      <div className="page">
        <Link className="back-link" href="/dashboard">← Ana panele dön</Link>
        <span className="eyebrow">VetWel Bilgi Asistanı</span>
        <h1 className="module-title">AI&apos;a Sor</h1>
        <p className="module-subtitle">
          VetWel&apos;in onaylı şirket içi bilgi tabanından ürün, form, doz, konumlandırma
          ve klinikte kullanılabilecek kontrollü anlatım hakkında yanıt alın.
        </p>

        {!isOpenAIConfigured() ? (
          <section className="placeholder">
            <h2>AI bağlantısı hazırlanıyor</h2>
            <p>
              Çalışan girişi aktif, ancak OpenAI API anahtarı ve özel VetWel Vector Store
              bağlantısı henüz tamamlanmadı. Bu iki secret eklendiğinde soru-cevap alanı
              otomatik olarak açılacak.
            </p>
            <p className="placeholder-note">Bilgi tabanı public GitHub deposuna konulmamıştır.</p>
          </section>
        ) : (
          <AskClient />
        )}
      </div>
    </main>
  );
}
