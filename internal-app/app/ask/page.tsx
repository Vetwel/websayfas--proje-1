import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AskClient from "./AskClient";

export default async function AskPage() {
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

        <AskClient />
      </div>
    </main>
  );
}
