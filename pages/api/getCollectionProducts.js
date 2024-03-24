import {
  getStorefrontApiUrl,
  getPrivateTokenHeaders,
} from "@/lib/shopify-client";
import { createSearchParamsBailoutProxy } from "next/dist/client/components/searchparams-bailout-proxy";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const {
    collectionHandle,
    // material, vendor,
    minPrice,
    maxPrice,
    sortKey,
  } = req.body;
  try {
    const GRAPHQL_COLLECTION_QUERY = generateGraphQLQuery({
      collectionHandle,
      // material,
      // vendor,
      minPrice,
      maxPrice,
      sortKey,
    });

    console.log("GRAPHQL_COLLECTION_QUERY", GRAPHQL_COLLECTION_QUERY);

    const collectionResponse = await fetch(getStorefrontApiUrl(), {
      method: "POST",
      headers: getPrivateTokenHeaders(),
      body: JSON.stringify({
        query: GRAPHQL_COLLECTION_QUERY,
      }),
    });

    const productsJson = await collectionResponse.json();
    return res.status(200).json(productsJson.data.collection.products.nodes);
  } catch (error) {
    console.error("Error fetching collection products:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

const generateGraphQLQuery = ({
  collectionHandle,
  // material,
  // vendor,
  minPrice,
  maxPrice,
  sortKey,
}) => {
  // let vendorFilter;
  // if (vendor != null) {
  //   vendorFilter = `{ productVendor: "${vendor}"}`;
  // }
  // let materialFilter;
  // if (material != null) {
  //   materialFilter = `{ variantOption: { name: "Materiaal", value: "${material}" } }`;
  // }

  let sort;
  if (sortKey != null) {
    switch (sortKey) {
      case "bestsellers":
        sort = "sortKey: BEST_SELLING";
        break;
      case "aanbevolen":
        sort = "sortKey: RELEVANCE";
        break;
      case "laag naar hoog":
        sort = "sortKey: PRICE";
        break;
      case "hoog naar laag":
        sort = "sortKey: PRICE, reverse: true";
        break;

      default:
        break;
    }
  }

  return `
    query CollectionByHandle {
      collection(handle: "${collectionHandle}") {
        products(
          first: 250,
          ${sort || ""}
          filters: [
            {available: true}, 
            { price: { min: ${parseFloat(minPrice) || 0.0}, max: ${
    parseFloat(maxPrice) || 10000.0
  } } },
          ]
        ) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            endCursor
            startCursor
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
};
