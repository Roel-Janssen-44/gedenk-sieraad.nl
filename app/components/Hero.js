import HeroContent from "./HeroContent";

export const metadata = {
  title: "hero page",
  description: "hero page description",
};
import {
  getStorefrontApiUrl,
  getPrivateTokenHeaders,
} from "../../shopify-client";

export default async function Hero() {
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

  return (
    <div>
      <p>Hero</p>
      <HeroContent product={productJson.data.productByHandle} />
    </div>
  );
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
