import {
  getStorefrontApiUrl,
  getPrivateTokenHeaders,
} from "@/lib/shopify-client";

import { Image } from "@shopify/hydrogen-react";

import LoadingGrid from "@/components/LoadingGrid";

import FilterCollection from "@/components/FilterCollection";
import SortCollection from "@/components/SortCollection";
import ProductGrid from "@/components/ProductGrid";

export default async function CollectionPage({ collection }) {
  // call to api to fetch products

  const collectionResponse = await fetch(getStorefrontApiUrl(), {
    body: JSON.stringify({
      query: GRAPHQL_COLLECTION_QUERY,
      variables: {
        collectionName: collection.handle,
      },
    }),
    headers: getPrivateTokenHeaders({ buyerIp: "..." }),
    method: "POST",
  });

  const collectionJson = await collectionResponse.json();

  return (
    <div className="container mt-20 flex flex-col gap-8 md:flex-row">
      <div className="w-40 p-4 min-h-screen bg-gray-100">
        <FilterCollection />
      </div>
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="min-w-[150px]">
            <Image data={collection.image} width={150} height={150} />
          </div>
          <div className="">
            <h2 className="text-3xl mb-4 font-bold">{collection.title}</h2>
            <p className="mb-8">{collection.description}</p>
          </div>
        </div>
        <div className="bg-gray-300 p-8 py-4">
          <SortCollection />
        </div>
        <ProductGrid
          collectionName={collection.handle}
          collection={collectionJson?.data?.collectionByHandle}
        />
      </div>
    </div>
  );
}

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
