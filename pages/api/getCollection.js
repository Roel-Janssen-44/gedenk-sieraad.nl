import {
  getStorefrontApiUrl,
  getPrivateTokenHeaders,
} from "@/lib/shopify-client";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { collectionHandle } = req.body;

  try {
    const collectionResponse = await fetch(getStorefrontApiUrl(), {
      method: "POST",
      headers: getPrivateTokenHeaders({ buyerIp: "..." }),
      body: JSON.stringify({
        query: GRAPHQL_COLLECTION_QUERY,
        variables: {
          collectionHandle: collectionHandle,
        },
      }),
    });

    const collectionJson = await collectionResponse.json();
    return res.status(200).json(collectionJson.data.collection);
  } catch (error) {
    console.error("Error fetching collection products:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

const GRAPHQL_COLLECTION_QUERY = `
  query CollectionByHandle($collectionHandle: String!) {
    collection(handle: $collectionHandle) {
      handle
      title
      descriptionHtml
      image {
        altText
        height
        url
        width
        src
      }
      seo {
        description
        title
      }
      products(first: 10) {
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
