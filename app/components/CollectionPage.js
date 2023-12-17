import {
  getStorefrontApiUrl,
  getPrivateTokenHeaders,
} from "@/lib/shopify-client";

import { Image } from "@shopify/hydrogen-react";

import LoadingGrid from "@/components/LoadingGrid";

import FilterCollection from "@/components/FilterCollection";
import SortCollection from "@/components/SortCollection";
import ProductGrid from "@/components/ProductGrid";
import NotFound from "@/components/NotFound";

export default async function CollectionPage({ collection }) {
  console.log(collection);
  if (!collection?.handle) return <NotFound />;

  const collectionResponse = await fetch(getStorefrontApiUrl(), {
    body: JSON.stringify({
      query: GRAPHQL_COLLECTION_QUERY,
      variables: {
        collectionName: collection.handle,
        collectionTitle: collection.title,
      },
    }),
    headers: getPrivateTokenHeaders({ buyerIp: "..." }),
    method: "POST",
  });

  const collectionJson = await collectionResponse.json();
  // console.log(collectionJson);
  // console.log(collectionJson.data);
  // console.log(collectionJson.data.collectionByHandle);
  // console.log(collectionJson.data.search);

  return (
    <div className="container flex flex-col gap-8 md:flex-row">
      <FilterCollection facets={collectionJson.data.search} />
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-[1px] border-gray-200 p-4 mb-8">
          <div className="min-w-[150px]">
            <Image data={collection.image} width={150} height={150} />
          </div>
          <div className="">
            <h1 className="text-6xl font-tangerine mb-4">{collection.title}</h1>
            <p>{collection.description}</p>
          </div>
        </div>
        <SortCollection />
        <ProductGrid
          collectionName={collection.handle}
          collection={collectionJson?.data?.collectionByHandle}
        />
      </div>
    </div>
  );
}

const GRAPHQL_COLLECTION_QUERY = `
query CollectionByHandle($collectionName: String!, $collectionTitle: String!) {
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
        vendor
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
      }
    }
  },
  search(query: $collectionTitle, first: 3) {
    productFilters {
      id
      label
      type
      values {
        id
        label
        count
        input
      }
    }
    totalCount
  }
}
`;

// const GRAPHQL_FILTERS_QUERY = `
// query facets($collectionTitle: String!, $first: Int) {
//   search(query: $collectionTitle, first: $first) {
//     productFilters {
//       id
//       label
//       type
//       values {
//         id
//         label
//         count
//         input
//       }
//     }
//     totalCount
//   }
// }
// `;
