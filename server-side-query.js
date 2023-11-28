import { shopifyClient } from "./shopify-client.js";

export async function getServerSideProps() {
  const response = await fetch(shopifyClient.getStorefrontApiUrl(), {
    body: JSON.stringify({
      query: GRAPHQL_QUERY,
    }),
    // Generate the headers using the private token.
    headers: shopifyClient.getPrivateTokenHeaders(),
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const json = await response.json();

  return { props: json };
}

const GRAPHQL_QUERY = `
  query {
    shop {
      name
    }
  }
`;
