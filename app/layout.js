import { Montserrat } from "next/font/google";
import "./globals.css";
// import {Seo} from `@shopify/hydrogen`;

import {
  getStorefrontApiUrl,
  getPrivateTokenHeaders,
} from "@/lib/shopify-client";

import CookieBanner from "@/components/CookieBanner";

import MainLayoutInnerWrapper from "@/components/MainLayoutInnerWrapper";
// import GoogleAnalytics from "@/components/GoogleAnalytics";

const montserrat = Montserrat({ subsets: ["latin"] });

export default async function RootLayout({ children }) {
  const shopDataResponse = await fetch(getStorefrontApiUrl(), {
    method: "POST",
    headers: getPrivateTokenHeaders({ buyerIp: "..." }),
    body: JSON.stringify({
      query: GRAPHQL_SHOP_DATA_QUERY,
    }),
  });
  const shopDataJson = await shopDataResponse.json();

  return (
    <html lang="nl">
      <head>
        {/* To do SEO  */}
        {/* <Seo /> */}
      </head>
      {/* <GoogleAnalytics /> */}
      <body className={`${montserrat.className}`}>
        <CookieBanner />
        <MainLayoutInnerWrapper shopData={shopDataJson.data}>
          {children}
        </MainLayoutInnerWrapper>
      </body>
    </html>
  );
}

const GRAPHQL_SHOP_DATA_QUERY = `
  query ShopDataQuery {
    menu(handle: "main-menu") {
      title
      items {
        items {
          id
          url
          title
        }
        id
        url
        title
      }
      id
      handle
    }
  }
`;
