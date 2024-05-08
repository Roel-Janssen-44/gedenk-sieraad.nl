"use client";

import {
  ProductProvider,
  useProduct,
  Image,
  useCart,
  ProductPrice,
  AddToCartButton,
} from "@shopify/hydrogen-react";
import { useState } from "react";

export default function HeroContent({ product }) {
  return (
    <div>
      <ProductProvider
        data={product}
        initialVariantId="gid://shopify/ProductVariant/47247984722262"
      >
        <div className="max-w-[500px]">
          <Image
            data={product.media.nodes[0].image}
            sizes="(min-width: 45em) 50vw, 100vw"
          />
        </div>

        <Product />
      </ProductProvider>
    </div>
  );
}

function Product() {
  const {
    product,
    variants,
    setSelectedVariant,
    selectedVariant,
    selectedOptions,
  } = useProduct();

  const { linesAdd } = useCart();

  const [extraOptions, setExtraOptions] = useState([
    {
      key: "Ringmaat",
      value: "43",
    },
    {
      key: "Harskleur",
      value: "Aqua",
    },
  ]);
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">{product?.title}</h1>
      <ProductPrice data={product} />
      <div className="flex gap-4 flex-wrap">
        {variants?.map((variant) => (
          <button
            className={`px-3 py-2 text-sm ${
              selectedVariant.id == variant.id
                ? "bg-orange-600"
                : "bg-green-700"
            }`}
            onClick={() => setSelectedVariant(variant)}
            key={variant?.id}
          >
            {variant?.title}
          </button>
        ))}
      </div>
      <AddToCartButton
        className="bg-pink-500 px-3 py-2 mt-4"
        variantId={selectedVariant.id}
        onClick={(e) => {
          return null;
          if (extraOptions) {
            e.preventDefault();
            const createdProductVariant = createProductVariant(
              product,
              extraOptions,
              selectedVariant.id
            )
              .then((createdProductVariant) => {
                const newVariantId = `gid://shopify/ProductVariant/${createdProductVariant.succes.variant.id}`;
                linesAdd([
                  {
                    merchandiseId: newVariantId,
                    quantity: 1,
                    attributes: extraOptions,
                  },
                ]);
              })
              .catch((error) => {
                console.error("Error creating product variant:", error);
              });
          }
        }}
      >
        Add to cart
      </AddToCartButton>
    </div>
  );
}

const createProductVariant = async (
  product,
  extraOptions,
  selectedVariantId
) => {
  const variantData = {
    product,
    extraOptions,
    selectedVariantId,
  };

  const method = "POST";

  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ variantData: variantData }),
  };

  const url = "/api/createProductVariant";

  const res = await fetch(url, options);

  const final = await res.json();

  return final;
};
