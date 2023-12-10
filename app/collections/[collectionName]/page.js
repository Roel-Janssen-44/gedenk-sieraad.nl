import {
  getStorefrontApiUrl,
  getPrivateTokenHeaders,
} from "@/lib/shopify-client";

export const metadata = {
  title: "Collection page",
  description: "collection page description",
};

import CollectionPage from "@/components/CollectionPage";

export default async function Collection({ params }) {
  const collectionResponse = await fetch(getStorefrontApiUrl(), {
    body: JSON.stringify({
      query: GRAPHQL_COLLECTION_QUERY,
      variables: {
        collectionName: params.collectionName,
      },
    }),
    headers: getPrivateTokenHeaders({ buyerIp: "..." }),
    method: "POST",
  });

  const collectionJson = await collectionResponse.json();
  return (
    <div>
      <CollectionPage collection={collectionJson.data.collectionByHandle} />
    </div>
  );
}

const GRAPHQL_COLLECTION_QUERY = `
query CollectionByHandle($collectionName: String!) {
  collectionByHandle(handle: $collectionName) {
    handle
    title
    description
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
  }
}
`;
// const GRAPHQL_COLLECTION_QUERY = `
// query CollectionByHandle($collectionName: String!) {
//   collectionByHandle(handle: $collectionName) {
//     description
//     handle
//     image {
//       altText
//       height
//       url
//       width
//       src
//     }
//     seo {
//       description
//       title
//     }
//     title
//     products(first: 10) {
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
//             src
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
