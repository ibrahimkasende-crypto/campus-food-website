import type { Metadata } from "next";
import { OrderGateway } from "@/components/home/OrderGateway";
import { appStoreUrl, googlePlayUrl } from "@/lib/downloads";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Commander dans l'application",
  description: "Ouvrez Campus Food pour commander, ou installez l'application sur Android ou iPhone.",
  alternates: { canonical: "/commander" },
  robots: { index: false, follow: true },
};

export default function CommanderPage() {
  return <OrderGateway playUrl={googlePlayUrl()} appStoreUrl={appStoreUrl()} downloadUrl={`${site.url}/telechargement`} />;
}
