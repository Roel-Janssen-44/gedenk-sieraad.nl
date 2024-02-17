import {
  getStorefrontApiUrl,
  getPrivateTokenHeaders,
} from "@/lib/shopify-client";
import CollectionPage from "@/components/CollectionPage";

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
    <CollectionPage
      collection={collectionJson.data.collectionData}
      filterMenu={collectionJson.data.shopData}
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
