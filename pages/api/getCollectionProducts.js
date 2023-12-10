import {
  getStorefrontApiUrl,
  getPrivateTokenHeaders,
} from "@/lib/shopify-client";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { collectionName, cursor } = req.body;

  try {
    const collectionResponse = await fetch(getStorefrontApiUrl(), {
      method: "POST",
      headers: getPrivateTokenHeaders({ buyerIp: "..." }),
      body: JSON.stringify({
        query: GRAPHQL_COLLECTION_QUERY,
        variables: {
          collectionName,
          //   cursor,
        },
      }),
    });

    const collectionJson = await collectionResponse.json();
    return res
      .status(200)
      .json(collectionJson.data.collectionByHandle.products);
  } catch (error) {
    console.error("Error fetching collection products:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// query CollectionByHandle($collectionName: String!, $cursor: Int) {
//   collectionByHandle(handle: $collectionName) {
//     products(first: 10, after: $cursor) {
const GRAPHQL_COLLECTION_QUERY = `
query CollectionByHandle($collectionName: String!) {
  collectionByHandle(handle: $collectionName) {
    products(first: 10) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      nodes {
        title
        id
        handle
        images(first: 2) {
          nodes {
            altText
            height
            url
            width
            src
          }
        }
        priceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
          minVariantPrice {
            amount
            currencyCode
          }
        }
        vendor
      }
    }
  }
}
`;
