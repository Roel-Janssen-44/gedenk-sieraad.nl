"use client";

import {
  ProductProvider,
  useProduct,
  Image,
  useCart,
  ProductPrice,
} from "@shopify/hydrogen-react";
import { useState } from "react";

import Button from "@mui/material/Button";

export default function ProductPage({ product }) {
  return (
    <div className="container mt-20">
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
    setSelectedOption,
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
    <div className="container mx-auto flex flex-col gap-6">
      <h2 className="text-3xl">{product.title}</h2>
      <div className="flex items-center text-md">
        <span className="font-bold min-w-[140px]">Prijs:</span>
        <ProductPrice data={product} className="font-normal" as="span" />
      </div>
      <div className="flex gap-6 flex-wrap">
        {product.options.map((optionSet) => (
          <div
            className="flex flex-wrap gap-4 items-center text-sm"
            key={"optionset-" + optionSet.name}
          >
            <span className="font-bold w-full -mb-2">{optionSet.name}:</span>
            {optionSet.values.map((option) => {
              if (option.includes("WD options")) {
                return null;
              }
              // Check is selectedoption is current option
              const isSelected = selectedOptions[optionSet.name] === option;
              if (isSelected) {
                return (
                  <Button
                    variant="outlined"
                    size="medium"
                    className="lowercase border-black hover:border-black text-black hover:text-black"
                  >
                    {option}
                  </Button>
                );
              } else {
                return (
                  <Button
                    variant="outlined"
                    size="medium"
                    className="lowercase border-gray-300 text-black hover:border-gray-600 hover:text-black"
                    onClick={() => setSelectedOption(optionSet.name, option)}
                  >
                    {option}
                  </Button>
                );
              }
            })}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center text-sm">
        <span className="font-bold min-w-[140px]">Merk/collectie:</span>
        <span className="font-normal">{product.vendor}</span>
      </div>
      <div className="flex flex-wrap items-center text-sm">
        <span className="font-bold min-w-[140px]">Artikelnr:</span>
        <span className="font-normal">{selectedVariant.sku}</span>
      </div>
      <Button
        size="large"
        variant="contained"
        className="bg-primary"
        onClick={(e) => {
          // return null;
          if (false) {
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
          } else {
            linesAdd([
              {
                merchandiseId: selectedVariant.id,
                quantity: 1,
                // Remove attributes on production
                attributes: extraOptions,
              },
            ]);
          }
        }}
      >
        Add to cart
      </Button>
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

  console.log("finalData: ", final);

  console.log("fetch after");
  return final;
};
