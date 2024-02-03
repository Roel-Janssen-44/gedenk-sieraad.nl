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
import { checkForActiveMaterial } from "@/lib/functions";

import Button from "@mui/material/Button";
import ExtraProductOptions from "@/components/ExtraProductOptions";
import { useCartDrawer } from "@/components/MainLayoutInnerWrapper";

export default function ProductPage({ product }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    // console.log("product");
    // console.log(product);
  }, []);

  let allMediaImages = [];

  const variantImages = product.variants.nodes;
  let extraImages = [];
  product.media.nodes.forEach((media) => {
    if (!variantImages.some((image) => image.url === media.image.url)) {
      extraImages.push(media.image);
    }
  });

  // product.variants.nodes.forEach((variant) => {
  //   if (variant.image) {
  //     allMediaImages.push(variant.image);
  //   }
  // });
  // product.media.nodes.forEach((media) => {
  //   if (!allMediaImages.some((image) => image.url === media.image.url)) {
  //     allMediaImages.push(media.image);
  //   }
  //   // mediaToShow.forEach((image) => {
  //   //   if (image.url != media.image.url) {
  //   //     console.log("not matching found");
  //   //     console.log(image);
  //   //     console.log(media.image);
  //   //     mediaToShow.push(media.image);
  //   //   }
  //   // });
  // });

  // product.media.nodes.forEach((mediaNode) => {
  //   if (!mediaToShow.some((item) => item.url === mediaNode.url)) {
  //     mediaToShow.push(mediaNode.image);
  //     console.log("item added");
  //     console.log(mediaNode);
  //   }
  // });

  // console.log("variantImages");
  // console.log(variantImages);

  const [currentImages, setCurrentImages] = useState(variantImages);
  return (
    <div className="container flex flex-col items-center lg:flex-row lg:items-start">
      <ProductProvider
        data={product}
        initialVariantId={product?.variant?.edges[0]?.node?.id}
      >
        {/* To do image gallery */}
        <div className="max-w-[500px]">
          <Image
            data={product.media.nodes[0].image}
            sizes="(min-width: 45em) 50vw, 100vw"
            loading="eager"
          />
          {/* <div className="flex flex-row gap-10">
            <div className="flex flex-col gap-2">
              {product.media?.nodes?.map((image) => (
                <div className="w-16 h-16">
                  <Image data={image.image} />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {product.variants?.nodes?.map((image) => (
                <div className="w-16 h-16">
                  <Image data={image.image} />
                </div>
              ))}
            </div>
          </div> */}
          <div className="flex flex-row flex-wrap gap-2">
            {currentImages?.map((image, index) => (
              <div key={"ajksd" + index} className="w-32 h-32">
                <Image data={image} width={150} height={150} />
              </div>
            ))}
          </div>
        </div>
        <Product
          variantImages={variantImages}
          extraImages={extraImages}
          setCurrentImages={setCurrentImages}
        />
      </ProductProvider>
    </div>
  );
}

function Product({ setCurrentImages, variantImages, extraImages = [] }) {
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

  const hasTrueValue = Object.values(optionErrors).some(
    (value) => value === true
  );
  // console.log("optionErrors");
  // console.log(optionErrors);
  // console.log("extraOptions");
  // console.log(extraOptions);

  // console.log("optionErrors");
  // console.log(optionErrors);

  useEffect(() => {
    if (!selectedVariant) return;
    // console.log("selected variant");
    // console.log(selectedVariant.id);
    // console.log("variantImages");
    // console.log(variantImages);
    const currentVariant = variants.find(
      (variant) => variant.id == selectedVariant.id
    );

    let activeMaterial = [];
    const zilver = ["zilver 925 sterling", "9 kt witgoud", "14 kt witgoud"];
    const geelgoud = ["9 kt geelgoud", "14 kt geelgoud"];
    const rosegoud = ["9 kt roségoud", "14 kt roségoud"];

    // console.log(currentVariant);

    let newThumbnails = [];

    const selectedVariantMaterial =
      currentVariant.selectedOptions[0].value.toLowerCase();

    newThumbnails.push(currentVariant.image);
    if (zilver.includes(selectedVariantMaterial)) {
      activeMaterial.push("zilver");
    } else if (geelgoud.includes(selectedVariantMaterial)) {
      activeMaterial.push("geelgoud");
    } else if (rosegoud.includes(selectedVariantMaterial)) {
      activeMaterial.push("rosegoud");
    }

    // variants.forEach((variant) => {
    //   const variantMaterial = variant.selectedOptions[0].value.toLowerCase();
    //   if (
    //     zilver.includes(variantMaterial) &&
    //     activeMaterial.includes("zilver")
    //   ) {
    //     return;
    //   } else if (
    //     geelgoud.includes(variantMaterial) &&
    //     activeMaterial.includes("geelgoud")
    //   ) {
    //     return;
    //   } else if (
    //     rosegoud.includes(variantMaterial) &&
    //     activeMaterial.includes("rosegoud")
    //   ) {
    //     return;
    //   }
    //   if (
    //     variant.selectedOptions.length > 1 &&
    //     selectedVariant.selectedOptions.length > 1
    //   ) {
    //     const variantOptionsToCheck = variant.selectedOptions.slice(1);
    //     const selectedOptionsToCheck = selectedVariant.selectedOptions.slice(1);

    //     const allOptionsMatch = variantOptionsToCheck.every((option, index) => {
    //       return option.value === selectedOptionsToCheck[index].value;
    //     });

    //     if (allOptionsMatch) {
    //       if (
    //         zilver.includes(variantMaterial) &&
    //         activeMaterial.includes("zilver")
    //       ) {
    //         return;
    //       } else if (
    //         geelgoud.includes(variantMaterial) &&
    //         activeMaterial.includes("geelgoud")
    //       ) {
    //         return;
    //       } else if (
    //         rosegoud.includes(variantMaterial) &&
    //         activeMaterial.includes("rosegoud")
    //       ) {
    //         return;
    //       }
    //       if (zilver.includes(variantMaterial)) {
    //         activeMaterial.push("zilver");
    //       } else if (geelgoud.includes(variantMaterial)) {
    //         activeMaterial.push("geelgoud");
    //       } else if (rosegoud.includes(variantMaterial)) {
    //         activeMaterial.push("rosegoud");
    //       }
    //       newThumbnails.push(variant.image);
    //     }
    //   }
    // });

    // console.log("extraImages");
    // console.log(extraImages);

    // console.log("product.tags");
    // console.log(product.tags);

    if (product.tags.includes("kleuren")) {
      newThumbnails.shift();
      const harskleurOption = extraOptions.find((obj) => obj.key === "kleuren");
      // To do generate random color in stead of blue
      const harsKleur = harskleurOption?.value[0].value.split(" ")[0] || "Blue";
      newThumbnails.forEach((thumbnail, index) => {
        if (!thumbnail.altText.includes(harsKleur)) {
          newThumbnails.splice(index, 1);
        }
      });
      extraImages.forEach((image) => {
        if (image.altText.includes(harsKleur)) {
          newThumbnails.push(image);
        }
      });
      if (activeMaterial == "geelgoud") {
        [newThumbnails[0], newThumbnails[1]] = [
          newThumbnails[1],
          newThumbnails[0],
        ];
      } else if (activeMaterial == "rosegoud") {
        [newThumbnails[0], newThumbnails[2]] = [
          newThumbnails[2],
          newThumbnails[0],
        ];
      }
    }

    extraImages.forEach((image) => {
      if (!newThumbnails[0]) return;
      if (image.altText == newThumbnails[0].altText) {
        if (
          !newThumbnails.some(
            (thumbnail) =>
              thumbnail.url === image.url && thumbnail.altText === image.altText
          )
        ) {
          newThumbnails.push(image);
        }
      } else {
        if (
          (selectedVariantMaterial.includes("zilver") ||
            selectedVariantMaterial.includes("witgoud")) &&
          (image.altText.toLowerCase().includes("zilver") ||
            image.altText.toLowerCase().includes("witgoud") ||
            image.altText.toLowerCase().includes("alle"))
        ) {
          newThumbnails.push(image);
        } else if (
          selectedVariantMaterial.includes("geelgoud") &&
          (image.altText.toLowerCase().includes("geelgoud") ||
            image.altText.toLowerCase().includes("alle"))
        ) {
          newThumbnails.push(image);
        } else if (
          (selectedVariantMaterial.includes("rosegoud") ||
            selectedVariantMaterial.includes("roségoud")) &&
          (image.altText.toLowerCase().includes("rosegoud") ||
            image.altText.toLowerCase().includes("roségoud") ||
            image.altText.toLowerCase().includes("alle"))
        ) {
          newThumbnails.push(image);
        }
      }
    });

    console.log("activeMaterial");
    console.log(activeMaterial);

    console.log("newThumbnails");
    console.log(newThumbnails);
    setCurrentImages(newThumbnails);
  }, [selectedVariant, extraOptions]);

  const tags = product.tags;
  // const tags = [
  //   // "print",
  //   // "poot",
  //   "gravure",
  //   // "naamdatum",
  //   // "aszijde",
  //   // "vulset",
  //   // "letter",
  //   // "creool",
  //   // "aspakket",
  //   // "hars",
  //   "tekst",
  //   // "armbandmaat",
  //   // "woord",
  //   // "upload",
  //   // "vppakketup",
  //   // "cord",
  //   // "satijn",
  //   // "ringmaat",
  //   // "ringmaatsy",
  // ];

  return (
    <div className="container max-w-lg mx-auto flex flex-col gap-6">
      <h1 className="text-6xl font-tangerine w-auto">{product.title}</h1>
      <div className="flex items-center text-sm">
        <span className="font-bold min-w-[140px]">Prijs:</span>
        <span>
          € {selectedVariant?.price?.amount || "Variant bestaat niet"}
        </span>
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
        <span className="font-normal">
          {selectedVariant?.sku || "Variant bestaat niet"}
        </span>
      </div>

      {/* {console.log("hasTrueValue")}
      {console.log(hasTrueValue)} */}
      {/* To do verzending */}
      {/* {optionErrors && <p className="text-red-700">vul alle velden in!</p>} */}
      <Button
        size="large"
        variant="contained"
        className="bg-primary max-w-sm"
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
