// import { createStorefrontClient } from "@shopify/hydrogen-react";

// export const client = createStorefrontClient({
//   // load environment variables according to your framework and runtime
//   storeDomain: process.env.PUBLIC_STORE_DOMAIN,
//   publicStorefrontToken: process.env.PUBLIC_STOREFRONT_API_TOKEN,
// });

import { createStorefrontClient } from "@shopify/hydrogen-react";

const client = createStorefrontClient({
  privateStorefrontToken: process.env.PRIVATE_STOREFRONT_API_TOKEN,
  storeDomain: `https://${process.env.PUBLIC_STORE_DOMAIN}`,
  storefrontApiVersion: "2023-10",
});

export const getStorefrontApiUrl = client.getStorefrontApiUrl;
export const getPrivateTokenHeaders = client.getPrivateTokenHeaders;
