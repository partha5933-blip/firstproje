import type { ReactNode } from "react";
import { AnalyticsConsentLoader } from "@/components/site/analytics-consent-loader";
import { CookieBanner } from "@/components/site/cookie-banner";
import { ExitIntentPopup } from "@/components/site/exit-intent-popup";
import { FloatingCTA } from "@/components/site/floating-cta";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { PremiumCursor } from "@/components/site/premium-cursor";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <PremiumCursor />
      <main>{children}</main>
      <Footer />
      <AnalyticsConsentLoader />
      <FloatingCTA />
      <CookieBanner />
      <ExitIntentPopup />
    </>
  );
}
