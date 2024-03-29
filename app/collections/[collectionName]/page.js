import {
  getStorefrontApiUrl,
  getPrivateTokenHeaders,
} from "@/lib/shopify-client";
import CollectionPage from "@/components/CollectionPage";
import { data } from "autoprefixer";

export async function generateMetadata({ params, searchParams }, parent) {
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

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${collectionJson.data.collectionData.title} -- gedenk-sieraad.nl`,
    description: collectionJson.data.collectionData.description,
    openGraph: {
      images: [collectionJson.data.collectionData.image.url, ...previousImages],
    },
  };
}

async function getCollectionData({ collectionName }) {
  const res = await fetch(getStorefrontApiUrl(), {
    body: JSON.stringify({
      query: GRAPHQL_COLLECTION_QUERY,
      variables: {
        collectionName,
      },
    }),
    headers: getPrivateTokenHeaders({ buyerIp: "..." }),
    method: "POST",
  });

  return res.json();
}

export default async function Collection({ params, searchParams }) {
  const data = await getCollectionData({
    collectionName: params.collectionName,
  });

  return (
    <CollectionPage
      collection={data.data.collectionData}
      searchParams={searchParams}
    />
  );
}

const GRAPHQL_COLLECTION_QUERY = `
query CollectionByHandle($collectionName: String!) {
  collectionData: collection(handle: $collectionName) {
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
//   collectionData: collection(handle: $collectionName) {
//     handle
//     title
//     description
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
//     products(first: 10) {
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
//         options(first: 1) {
//           name
//           values
//         }
//       }
//     }
//   }
// }
// `;
