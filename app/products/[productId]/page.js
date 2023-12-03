import ProductPage from "@/components/ProductPage";

import {
  getStorefrontApiUrl,
  getPrivateTokenHeaders,
} from "@/lib/shopify-client";

export const metadata = {
  title: "Product page",
  description: "product page description",
};

export default async function Product() {
  const productResponse = await fetch(getStorefrontApiUrl(), {
    body: JSON.stringify({
      // A Storefront API query
      query: GRAPHQL_PRODUCT_QUERY,
    }),
    // When possible, add the 'buyerIp' property.
    headers: getPrivateTokenHeaders({ buyerIp: "..." }),
    method: "POST",
  });

  const productJson = await productResponse.json();

  return <ProductPage product={productJson.data.productByHandle} />;
}

const GRAPHQL_PRODUCT_QUERY = `
{
  productByHandle(handle: "testproduct") {
    description
    id
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
    variants(first: 25) {
      edges {
        node {
          id
          title
          sku
          selectedOptions {
            value
            name
          }
          image {
            id
            src
            width
            url
            height
            altText
          }
        }
      }
    }
    media(first: 10) {
      nodes {
        ... on MediaImage {
          id
          image {
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
