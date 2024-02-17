import ProductPage from "@/components/ProductPage";

import {
  getStorefrontApiUrl,
  getPrivateTokenHeaders,
} from "@/lib/shopify-client";

export async function generateMetadata({ params, searchParams }, parent) {
  const productResponse = await fetch(getStorefrontApiUrl(), {
    body: JSON.stringify({
      query: GRAPHQL_PRODUCT_QUERY,
      variables: { productId: params.productId },
    }),
    headers: getPrivateTokenHeaders({ buyerIp: "..." }),
    method: "POST",
  });

  const productJson = await productResponse.json();

  const previousImages = (await parent).openGraph?.images || [];
  console.log(productJson.data.productByHandle.seo);
  return {
    title: `${productJson.data.productByHandle.seo.title} -- gedenk-sieraad.nl`,
    description: productJson.data.productByHandle.seo.description,
    // openGraph: {
    //   images: [
    //     productJson.data.productByHandle.variants.nodes[0].image.url,
    //     ...previousImages,
    //   ],
    // },
  };
}

export default async function Product({ params }) {
  const productResponse = await fetch(getStorefrontApiUrl(), {
    body: JSON.stringify({
      query: GRAPHQL_PRODUCT_QUERY,
      variables: { productId: params.productId },
    }),
    headers: getPrivateTokenHeaders({ buyerIp: "..." }),
    method: "POST",
  });

  const productJson = await productResponse.json();
  return <ProductPage product={productJson.data.productByHandle} />;
}

const GRAPHQL_PRODUCT_QUERY = `
query productByHandle($productId: String!) {
  productByHandle(handle: $productId) {
    description
    descriptionHtml
    id
    seo {
      title
      description
    }
    handle
    options {
      name
      values
    }
    tags
    title
    vendor
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
    variants(first: 100) {
      nodes {
        id
        title
        sku
        unitPrice {
          amount
          currencyCode
        }
        image {
          altText
          height
          id
          src
          url
          width
        }
        selectedOptions {
          name
          value
        }
        compareAtPriceV2 {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        currentlyNotInStock
        priceV2 {
          currencyCode
          amount
        }
        price {
          amount
          currencyCode
        }
        unitPrice {
          amount
          currencyCode
        }
      }
    }
    media(first: 100) {
      nodes {
        ... on MediaImage {
          id
          image {
            id
            height
            altText
            url
            width
          }
        }
      }
    }
  }
}
`;
