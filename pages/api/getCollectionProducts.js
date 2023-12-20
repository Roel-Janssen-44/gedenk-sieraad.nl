import {
  getStorefrontApiUrl,
  getPrivateTokenHeaders,
} from "@/lib/shopify-client";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const {
    collectionName,
    materiaal,
    productVendor,
    minPrijs,
    maxPrijs,
    newFetchCursor,
  } = req.body;

  try {
    const GRAPHQL_COLLECTION_QUERY = generateGraphQLQuery({
      collectionName,
      materiaal,
      productVendor,
      minPrijs,
      maxPrijs,
      newFetchCursor,
    });

    const collectionResponse = await fetch(getStorefrontApiUrl(), {
      method: "POST",
      headers: getPrivateTokenHeaders({ buyerIp: "..." }),
      body: JSON.stringify({
        query: GRAPHQL_COLLECTION_QUERY,
      }),
    });

    const collectionJson = await collectionResponse.json();
    console.log("GraphQL Response:", collectionJson);

    return res.status(200).json(collectionJson.data.collection.products);
  } catch (error) {
    console.error("Error fetching collection products:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

const generateGraphQLQuery = ({
  collectionName,
  materiaal,
  productVendor,
  minPrijs,
  maxPrijs,
  newFetchCursor,
}) => {
  let vendorFilter;
  if (productVendor != null) {
    vendorFilter = `{ productVendor: "${productVendor}"}`;
  }
  let materiaalFilter;
  if (materiaal != null) {
    materiaalFilter = `{ variantOption: { name: "Materiaal", value: "${materiaal}" } }`;
  }

  let cursorFilter;
  if (newFetchCursor != null) {
    cursorFilter = `${newFetchCursor.direction}: "${newFetchCursor.cursor}"`;
  }

  let fetchDirection;
  if (newFetchCursor?.direction == "after") {
    fetchDirection = "first";
  } else if (newFetchCursor?.direction == "before") {
    fetchDirection = "last";
  }

  return `
    query CollectionByHandle {
      collection(handle: "${collectionName}") {
        products(
          ${fetchDirection || "first"}: 2
          ${cursorFilter || ""}
          filters: [
            {available: true}, 
            { price: { min: ${parseFloat(minPrijs) || 0.0}, max: ${
    parseFloat(maxPrijs) || 10000.0
  } } },
            ${vendorFilter || ""}     
            ${materiaalFilter || ""}
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

// const GRAPHQL_COLLECTION_QUERY = `
// query CollectionByHandle($collectionName: String!) {
//   collection(handle: $collectionName) {
//     products(
//       first: 10
//       filters: [
//         { price: { min: 50, max: 120 } },
//         { variantOption: { name: 'Materiaal', value: 'Zilver' } },
//         { productVendor: 'seeyou' }
//         ${selectedProductVendor ? `{ productVendor: $productVendor }` : ''}
//       ]
//     ) {
//       pageInfo {
//         hasNextPage
//         hasPreviousPage
//       }
//       nodes {
//         title
//         id
//         handle
//         images(first: 2) {
//           nodes {
//             altText
//             height
//             url
//             width
//           }
//         }
//         priceRange {
//           maxVariantPrice {
//             amount
//             currencyCode
//           }
//           minVariantPrice {
//             amount
//             currencyCode
//           }
//         }
//         vendor
//       }
//     }
//   }
// }
// `;
