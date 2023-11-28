"use client";

import {
  ShopifyProvider,
  CartProvider,
  sendShopifyAnalytics,
  getClientBrowserParameters,
  AnalyticsEventName,
  useShopifyCookies,
} from "@shopify/hydrogen-react";

import { getStorefrontApiUrl, getPrivateTokenHeaders } from "../shopify-client";
// import { useRouter } from "next/router";
// import { useEffect } from "react";

// function Home({ data, errors }) {
export default async function Home() {
  // const { storeDomain } = useShop();

  //

  const response = await fetch(getStorefrontApiUrl(), {
    body: JSON.stringify({
      // A Storefront API query
      query: GRAPHQL_QUERY,
    }),
    // When possible, add the 'buyerIp' property.
    headers: getPrivateTokenHeaders({ buyerIp: "..." }),
    method: "POST",
  });

  const json = await response.json();
  console.log(json);
  //

  const test = getStorefrontApiUrl;
  console.log("test", test);
  return (
    <>
      <div className="text-center text-3xl my-20">ashdj</div>
      <ShopifyProvider
        storeDomain={process.env.PUBLIC_STORE_DOMAIN}
        storefrontToken={process.env.PUBLIC_STOREFRONT_API_TOKEN}
        storefrontApiVersion="2023-10"
        countryIsoCode="US"
        languageIsoCode="EN"
      >
        <div>jinsda</div>
        {/* <CartProvider>
          <Component {...pagePropsWithAppAnalytics} />
        </CartProvider> */}
      </ShopifyProvider>
    </>
  );
  // ... rest of your component code
}

// A Storefront API query, defined in a separate file where you make queries.
const GRAPHQL_QUERY = `
  query {
    shop {
      name
    }
  }
`;
