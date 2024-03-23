import {
  getStorefrontApiUrl,
  getPrivateTokenHeaders,
} from "@/lib/shopify-client";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { searchQuery } = req.body;

  try {
    const searchResponse = await fetch(getStorefrontApiUrl(), {
      method: "POST",
      headers: getPrivateTokenHeaders({ buyerIp: "..." }),
      body: JSON.stringify({
        query: GRAPHQL_COLLECTION_QUERY,
        variables: {
          searchQuery: searchQuery,
        },
      }),
    });

    const searchJson = await searchResponse.json();
    return res.status(200).json(searchJson);
  } catch (error) {
    console.error("Error fetching search result:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

const GRAPHQL_COLLECTION_QUERY = `
  query searchQuery($searchQuery: String!) {
    products(query: $searchQuery, first: 50) {
      nodes {
        ... on Product {
          handle
          title
          id
          images(first: 2) {
            nodes {
              url
              width
              height
              altText
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
  `;
