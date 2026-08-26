import { auth } from "@/lib/clerk-server";
import { redirect } from "next/navigation";
import { isClerkConfigured } from "@/lib/internal-config";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  if (!isClerkConfigured()) {
    redirect("/setup");
  }

  const { userId } = await auth();
  redirect(userId ? "/dashboard" : "/sign-in");
}
