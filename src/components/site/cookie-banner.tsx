"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type ConsentState = {
  analytics: boolean;
  marketing: boolean;
};

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({ analytics: false, marketing: false });

  useEffect(() => {
    setVisible(localStorage.getItem("lux-lens-consent") !== "saved");
  }, []);

  async function saveConsent(nextConsent: ConsentState) {
    localStorage.setItem("lux-lens-consent", "saved");
    localStorage.setItem("lux-lens-consent-values", JSON.stringify(nextConsent));
    window.dispatchEvent(new Event("lux-lens-consent-updated"));
    setVisible(false);

    await Promise.all(
      Object.entries(nextConsent).map(([category, accepted]) =>
        fetch("/api/consent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category, accepted, source: "cookie-banner" })
        })
      )
    );
  }

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[95] mx-auto max-w-3xl rounded-lg border border-white/15 bg-background/95 p-4 shadow-soft backdrop-blur">
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <h2 className="text-base font-semibold text-white">Cookie preferences</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Necessary cookies keep the site working. Analytics and marketing cookies are stored only if you accept them.
          </p>
          <div className="mt-3 flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm text-muted">
              <Checkbox
                checked={consent.analytics}
                onChange={(event) =>
                  setConsent((value) => ({ ...value, analytics: event.target.checked }))
                }
              />
              Analytics
            </label>
            <label className="flex items-center gap-2 text-sm text-muted">
              <Checkbox
                checked={consent.marketing}
                onChange={(event) =>
                  setConsent((value) => ({ ...value, marketing: event.target.checked }))
                }
              />
              Marketing
            </label>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => saveConsent({ analytics: false, marketing: false })}>
            Necessary Only
          </Button>
          <Button onClick={() => saveConsent(consent)}>Save</Button>
        </div>
      </div>
    </div>
  );
}
