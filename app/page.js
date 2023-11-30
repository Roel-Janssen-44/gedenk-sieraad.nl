// "use client";

import {
  ProductProvider,
  useProduct,
  ProductPrice,
  AddToCartButton,
  Image,
} from "@shopify/hydrogen-react";

import Hero from "./components/Hero";

import { getStorefrontApiUrl, getPrivateTokenHeaders } from "../shopify-client";
// import { Suspense, useEffect } from "react";
// import { useRouter } from "next/router";
// import { useEffect } from "react";

// function Home({ data, errors }) {
export default async function Home() {
  // const { storeDomain } = useShop();

  // const response = await fetch(getStorefrontApiUrl(), {
  //   body: JSON.stringify({
  //     // A Storefront API query
  //     query: GRAPHQL_QUERY,
  //   }),
  //   // When possible, add the 'buyerIp' property.
  //   headers: getPrivateTokenHeaders({ buyerIp: "..." }),
  //   method: "POST",
  // });

  // const json = await response.json();

  // const productResponse = await fetch(getStorefrontApiUrl(), {
  //   body: JSON.stringify({
  //     // A Storefront API query
  //     query: GRAPHQL_PRODUCT_QUERY,
  //   }),
  //   // When possible, add the 'buyerIp' property.
  //   headers: getPrivateTokenHeaders({ buyerIp: "..." }),
  //   method: "POST",
  // });

  // const productJson = await productResponse.json();
  // const test = getStorefrontApiUrl;
  return (
    <>
      <div className="text-center text-3xl my-20">ashdj</div>
      <Hero />

      {/* <CartProvider>
          <Component {...pagePropsWithAppAnalytics} />
        </CartProvider> */}
      {/* <Product product={productJson.data.productByHandle} /> */}
    </>
  );
  // ... rest of your component code
}

// A Storefront API query, defined in a separate file where you make queries.
// const GRAPHQL_QUERY = `
//   query {
//     shop {
//       name
//     }
//   }
// `;

// const GRAPHQL_PRODUCT_QUERY = `
// {
//   productByHandle(handle: "testproduct") {
//     description
//     id
//     handle
//     options {
//       name
//       values
//     }
//     tags
//     title
//     priceRange {
//       maxVariantPrice {
//         amount
//         currencyCode
//       }
//       minVariantPrice {
//         amount
//         currencyCode
//       }
//     }
//     variants(first: 25) {
//       edges {
//         node {
//           id
//           title
//           sku
//           selectedOptions {
//             value
//             name
//           }
//         }
//       }
//     }
//     media(first: 10) {
//       nodes {
//         ... on MediaImage {
//           id
//           image {
//             height
//             altText
//             url
//             width
//           }
//         }
//       }
//     }
//   }
// }
// `;

// const Product = ({ product }) => {
//   return (
//     <ProductProvider
//       data={product}
//       initialVariantId="gid://shopify/ProductVariant/47247984722262"
//     >
//       <div className="max-w-[500px]">
//         <Image data={product.media.nodes[0].image} />
//       </div>

//       <UsingProduct />
//     </ProductProvider>
//   );
// };

// function UsingProduct() {
//   const {
//     product,
//     variants,
//     setSelectedVariant,
//     selectedVariant,
//     selectedOptions,
//   } = useProduct();

//   const variantId = "gid://shopify/ProductVariant/47247984722262";

//   return (
//     <div className="container mx-auto">
//       <h1 className="text-2xl font-bold">{product?.title}</h1>
//       <ProductPrice data={product} />
//       <div className="flex gap-4 flex-wrap">
//         {variants?.map((variant) => (
//           <button
//             className={`px-3 py-2 text-sm ${
//               selectedVariant.id == variant.id
//                 ? "bg-orange-600"
//                 : "bg-green-700"
//             }`}
//             onClick={() => setSelectedVariant(variant)}
//             key={variant?.id}
//           >
//             {variant?.title}
//           </button>
//         ))}
//       </div>
//       <AddToCartButton
//         className="bg-pink-500 px-3 py-2 mt-4"
//         variantId={variantId}
//       >
//         Add to cart
//       </AddToCartButton>
//     </div>
//   );
// }
