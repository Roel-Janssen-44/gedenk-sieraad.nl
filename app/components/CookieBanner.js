"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  useShopifyCookies,
  getShopifyCookies,
  getClientBrowserParameters,
  AnalyticsEventName,
  sendShopifyAnalytics,
} from "@shopify/hydrogen-react";

export default function CookieBanner() {
  const [hasUserConsent, setHasUserConsent] = useState(true);
  //   const [cookies, setCookies] = useState({ _shopify_y: "", _shopify_s: "" });
  //   const pathname = usePathname();
  //   useShopifyCookies({ hasUserConsent: true });

  //   const sendPageView = (analyticsPageData) => {
  //     const payload = {
  //       shopifySalesChannel: "headless",
  //       ...getClientBrowserParameters(),
  //       ...analyticsPageData,
  //     };
  //     console.log("Sending analytics event with payload:", payload);
  //     // console.log(
  //     //   sendShopifyAnalytics({
  //     //     eventName: AnalyticsEventName.PAGE_VIEW,
  //     //     payload,
  //     //   })
  //     // );
  //     sendShopifyAnalytics({
  //       eventName: AnalyticsEventName.PAGE_VIEW,
  //       payload,
  //     });
  //   };

  //   const analyticsShopData = {
  //     shopId: "gid://shopify/Shop/55805345846",
  //     currency: "EUR",
  //     acceptedLanguage: "nl",
  //   };

  //   // eslint-disable-next-line no-undef
  //   const hasUserConsent = true;

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   const analytics = {
  //     hasUserConsent,
  //     ...analyticsShopData,
  //   };

  //   useEffect(() => {
  //     sendPageView(analytics);
  //   }, [pathname]);

  if (!hasUserConsent) {
    return (
      <div className="fixed bottom-0 left-0 flex flex-row z-50 gap-4 bg-gray-300 p-5">
        <p>We use cookies for a better user experience.</p>
        <button className="p-4 bg-green-500" onClick={handleConsent}>
          I Consent
        </button>
        <button className="p-4 bg-red-500" onClick={handleDecline}>
          Decline
        </button>
      </div>
    );
  }

  return null;
}
