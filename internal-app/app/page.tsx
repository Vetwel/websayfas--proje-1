import { auth } from "@/lib/clerk-server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isClerkConfigured } from "@/lib/internal-config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  await headers();

  if (!isClerkConfigured()) {
    redirect("/setup");
  }

  const { userId } = await auth();
  redirect(userId ? "/dashboard" : "/sign-in");
}
