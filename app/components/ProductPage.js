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
  const [optionErrors, setOptionErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);

  console.log("optionErrors");
  console.log(optionErrors);
  console.log("extraOptions");
  console.log(extraOptions);
  const hasTrueValue = Object.values(optionErrors).some(
    (value) => value === true
  );

  const tags = [
    "print",
    "poot",
    "naamdatum",
    "aszijde",
    // "vulset",
    // "letter",
    // "creool",
    // "aspakket",
    // "hars",
    // "tekst",
    // "armbandmaat",
    // "graveertekst",
    // "upload",
    // "vppakketup",
    // "cord",
    // "satijn",
    // "ringmaat",
    // "ringmaatsy",
  ];
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
        showErrors={showErrors}
        optionErrors={optionErrors}
        setOptionErrors={setOptionErrors}
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
      {/* {optionErrors && <p className="text-red-700">vul alle velden in!</p>} */}
      <Button
        size="large"
        variant="contained"
        className="bg-primary"
        onClick={(e) => {
          // checkForErrors();
          setShowErrors(true);
          // if (hasTrueValue) return window.scrollTo(0, 0);

          console.log("add to cart");
          return null;
          // return null;
          if (false) {
            // if (extraOptions) {
            e.preventDefault();
            const extraOptionsArray = extraOptions.flatMap((item) =>
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
                    attributes: extraOptionsArray,
                  },
                ]);
                openCartDrawer(true);
              })
              .catch((error) => {
                console.error("Error creating product variant:", error);
              });
          } else {
            linesAdd([
              {
                merchandiseId: selectedVariant.id,
                quantity: 1,
              },
            ]);
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
