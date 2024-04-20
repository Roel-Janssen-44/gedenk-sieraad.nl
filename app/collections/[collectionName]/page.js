import {
  getStorefrontApiUrl,
  getPrivateTokenHeaders,
} from "@/lib/shopify-client";
import CollectionPage from "@/components/CollectionPage";
import { data } from "autoprefixer";

export async function generateMetadata({ params, searchParams }, parent) {
  const collectionResponse = await fetch(getStorefrontApiUrl(), {
    body: JSON.stringify({
      query: GRAPHQL_COLLECTION_INFO_QUERY,
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

async function getCollectionData({
  collectionName,
  material,
  vendor,
  minPrice,
  maxPrice,
  sortKey,
}) {
  const GRAPHQL_COLLECTION_QUERY = generateGraphQLQuery({
    collectionHandle: collectionName,
    material,
    vendor,
    minPrice,
    maxPrice,
    sortKey,
  });

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
  const material = searchParams.Materiaal || null;
  const vendor = searchParams.Merk || null;
  const minPrice = searchParams.MinPrijs || null;
  const maxPrice = searchParams.MaxPrijs || null;
  const sortKey = searchParams.Sorteer;

  const collection = await getCollectionData({
    collectionName: params.collectionName,
    material,
    vendor,
    minPrice,
    maxPrice,
    sortKey,
  });

  return (
    <CollectionPage
      collection={collection.data.collection}
      searchParams={searchParams}
    />
  );
}

const GRAPHQL_COLLECTION_INFO_QUERY = `
query CollectionByHandle($collectionName: String!) {
  collectionData: collection(handle: $collectionName) {
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
  }
}
`;

const generateGraphQLQuery = ({
  collectionHandle,
  material,
  vendor,
  minPrice,
  maxPrice,
  sortKey,
}) => {
  let vendorFilter;
  if (vendor != null) {
    vendorFilter = `{ productVendor: "${vendor}"}`;
  }
  let materialFilter;
  if (material != null) {
    materialFilter = `{ variantOption: { name: "Materiaal", value: "${material}" } }`;
  }

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
        products(
          first: 250,
          ${sort || ""}
          filters: [
            {available: true}, 
            { price: { min: ${parseFloat(minPrice) || 0.0}, max: ${
    parseFloat(maxPrice) || 10000.0
  } } },
          ${vendorFilter || ""}
          ${materialFilter || ""}

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
            options(first: 1) {
              name
              values
            }
          }
        }
      }
    }
  `;
};

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
//     products(first: 100) {
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
