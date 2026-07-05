"use client";

import { useEffect } from "react";

export function AnalyticsConsentLoader() {
  useEffect(() => {
    function loadAnalytics() {
      const stored = localStorage.getItem("lux-lens-consent-values");

      if (!stored) {
        return;
      }

      const consent = JSON.parse(stored) as { analytics?: boolean; marketing?: boolean };
      const gaId = process.env.NEXT_PUBLIC_GA_ID;
      const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

      if (consent.analytics && gaId && !document.querySelector(`[data-ga-id="${gaId}"]`)) {
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        script.dataset.gaId = gaId;
        document.head.appendChild(script);

        const config = document.createElement("script");
        config.dataset.gaConfig = gaId;
        config.text = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}');
      `;
        document.head.appendChild(config);
      }

      if (consent.marketing && metaPixelId && !document.querySelector(`[data-meta-id="${metaPixelId}"]`)) {
        const pixel = document.createElement("script");
        pixel.dataset.metaId = metaPixelId;
        pixel.text = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${metaPixelId}');
        fbq('track', 'PageView');
      `;
        document.head.appendChild(pixel);
      }
    }

    loadAnalytics();
    window.addEventListener("lux-lens-consent-updated", loadAnalytics);

    return () => window.removeEventListener("lux-lens-consent-updated", loadAnalytics);
  }, []);

  return null;
}
