import { Montserrat } from "next/font/google";
import "./globals.css";

import {
  getStorefrontApiUrl,
  getPrivateTokenHeaders,
} from "@/lib/shopify-client";

import MainLayoutInnerWrapper from "@/components/MainLayoutInnerWrapper";

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
      <body className={`${montserrat.className}	`}>
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
