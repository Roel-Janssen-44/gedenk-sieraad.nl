import ProductPage from "@/components/ProductPage";

import {
  getStorefrontApiUrl,
  getPrivateTokenHeaders,
} from "@/lib/shopify-client";

export const metadata = {
  title: "Product page",
  description: "product page description",
};

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
