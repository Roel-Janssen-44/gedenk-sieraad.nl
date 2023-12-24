"use client";

import {
  ProductProvider,
  useProduct,
  Image,
  useCart,
  ProductPrice,
  getClientBrowserParameters,
} from "@shopify/hydrogen-react";
import { useState, useEffect } from "react";

import * as OptionSets from "./productOptions/optionSets";

import Button from "@mui/material/Button";
import ExtraProductOptions from "@/components/ExtraProductOptions";
import { useCartDrawer } from "@/components/MainLayoutInnerWrapper";

export default function ProductPage({ product }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container">
      <ProductProvider
        data={product}
        initialVariantId={product?.variant?.edges[0]?.node?.id}
      >
        {/* To do image gallery */}
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
    options,
  } = useProduct();

  const { linesAdd } = useCart();
  const openCartDrawer = useCartDrawer();
  const [extraOptions, setExtraOptions] = useState([]);

  // const tags = product.tags
  // const tags = ["creool", "hars", "positie", "ringmaat", "vingerafdruk"];
  const tags = ["creool", "aspakket", "hars", "tekst"];
  return (
    <div className="container mx-auto flex flex-col gap-6">
      <h1 className="text-6xl font-tangerine">{product.title}</h1>
      <div className="flex items-center text-sm">
        <span className="font-bold min-w-[140px]">Prijs:</span>
        <span>€ {selectedVariant.price.amount}</span>
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
              // Selectedoption
              const isSelected = selectedOptions[optionSet.name] === option;
              if (isSelected) {
                return (
                  <Button
                    variant="outlined"
                    size="medium"
                    className="lowercase border-black hover:border-black text-black hover:text-black"
                    key={optionSet.name + "-" + option}
                  >
                    {option}
                  </Button>
                );
              } else {
                return (
                  <Button
                    variant="outlined"
                    size="medium"
                    className="lowercase border-gray-300 text-black hover:border-gray-600 hover:text-black !important"
                    onClick={() => setSelectedOption(optionSet.name, option)}
                    key={optionSet.name + "-" + option}
                  >
                    {option}
                  </Button>
                );
              }
            })}
          </div>
        ))}
      </div>
      <ExtraProductOptions
        tags={tags}
        extraOptions={extraOptions}
        setExtraOptions={setExtraOptions}
      />
      <div className="flex flex-wrap items-center text-sm">
        <span className="font-bold min-w-[140px]">Merk/collectie:</span>
        <span className="font-normal">{product.vendor}</span>
      </div>
      <div className="flex flex-wrap items-center text-sm">
        <span className="font-bold min-w-[140px]">Artikelnr:</span>
        <span className="font-normal">{selectedVariant.sku}</span>
      </div>
      {/* To do verzending */}

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
            const outputArray = extraOptions.flatMap((item) =>
              Array.isArray(item.value)
                ? item.value
                    .map((nestedItem) => ({
                      key: nestedItem.key,
                      value: nestedItem.value !== "" ? nestedItem.value : null,
                    }))
                    .filter((nestedItem) => nestedItem.value !== null)
                : item.value !== ""
                ? [{ key: item.key, value: item.value }]
                : []
            );
            console.log(extraOptions);
            console.log(outputArray);
            const totalPrice = calculatePrice(extraOptions, OptionSets);
            console.log("totalPrice");
            console.log(totalPrice);

            linesAdd([
              {
                merchandiseId: selectedVariant.id,
                quantity: 1,
                // Remove attributes on production
                attributes: outputArray,
              },
            ]);
            console.log("ikbahjndlnnnljsfndl'jksljagsvdbhklsabvdlasdvb");
            openCartDrawer(true);
          }
        }}
      >
        Voeg toe aan winkelmandje
      </Button>

      {/* To do product beschrijving */}
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

  // console.log("finalData: ", final);

  // console.log("fetch after");
  return final;
};

function calculatePrice(selectedOptions, optionSets) {
  let totalPrice = 0;

  for (let i = 0; i < selectedOptions.length; i++) {
    const optionKey = selectedOptions[i].key + "Options";
    const currentOptionSet = findOptionSet(optionSets, optionKey);

    const selectedTargetValue = selectedOptions[i].value;
    if (typeof selectedTargetValue == "string") {
      const selectedOptionSet = currentOptionSet.find(
        (option) => option.value === selectedTargetValue
      );
      totalPrice += selectedOptionSet.price || 0;
    } else {
      selectedTargetValue.forEach((selectedTarget) => {
        const price = findPriceByValue(
          optionSets,
          selectedTarget.key,
          selectedTarget.value
        );
        totalPrice += price || 0;
      });
    }
  }
  return totalPrice;
}

function findOptionSet(optionSets, optionSetKey) {
  return optionSets[optionSetKey] || null;
}

function findPriceByValue(optionSets, targetKey, targetValue) {
  const optionSet = optionSets[targetKey + "Options"];

  if (optionSet && Array.isArray(optionSet)) {
    const foundOption = optionSet.find(
      (option) => option.value === targetValue
    );

    if (foundOption && typeof foundOption.price !== "undefined") {
      return foundOption.price;
    }
  }

  return null;
}
