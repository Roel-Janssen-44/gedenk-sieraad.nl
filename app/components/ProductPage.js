"use client";

import {
  ProductProvider,
  useProduct,
  Image,
  useCart,
  ProductPrice,
  getClientBrowserParameters,
} from "@shopify/hydrogen-react";
import { Transition } from "@headlessui/react";
import { useEffect, useState, useRef } from "react";

import Slider from "react-slick";

import "../slick_slider.css";
import IconButton from "@mui/material/IconButton";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import * as OptionSets from "./productOptions/optionSets";
import { checkForActiveMaterial } from "@/lib/functions";

import Button from "@mui/material/Button";
import ExtraProductOptions from "@/components/ExtraProductOptions";
import { useCartDrawer } from "@/components/MainLayoutInnerWrapper";

import sanitizeHtml from "sanitize-html-react";

export default function ProductPage({ product }) {
  let allMediaImages = [];

  const variantImages = product.variants.nodes;
  let extraImages = [];
  product.media.nodes.forEach((media) => {
    if (!variantImages.some((image) => image.url === media.image.url)) {
      extraImages.push(media.image);
    }
  });

  const [activeImage, setActiveImage] = useState();
  const [currentThumbnails, setCurrentThumbnails] = useState([]);
  const [activeThumbnailIndex, setActiveThumbnailIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    arrows: false,
    vertical: true,
    autoplay: false,
    autoplaySpeed: 3500,
    draggable: true,
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 5120,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          vertical: true,
          draggable: true,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          vertical: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          vertical: true,
          draggable: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          vertical: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          vertical: false,
        },
      },
    ],
  };
  const sliderRef = useRef();
  const [hasNextSlide, setHasNextSlide] = useState(false);
  const [hasPrevSlide, setHasPrevSlide] = useState(false);

  const nextSlide = () => {
    if (sliderRef.current && sliderRef.current.innerSlider) {
      const { slideCount, currentSlide } = sliderRef.current.innerSlider.state;
      const currentSettings = sliderRef.current.props;
      const responsiveSettings =
        currentSettings.responsive.find(
          (breakpoint) => window.innerWidth <= breakpoint.breakpoint
        ).settings || null;
      if (currentSlide + responsiveSettings.slidesToShow < slideCount) {
        sliderRef.current.slickNext();
        setHasPrevSlide(true);
        if (
          currentSlide +
            responsiveSettings.slidesToShow +
            responsiveSettings.slidesToScroll >=
          slideCount
        ) {
          setHasNextSlide(false);
        }
      } else {
        setHasNextSlide(false);
      }
    }
  };
  const previousSlide = () => {
    if (sliderRef.current && sliderRef.current.innerSlider) {
      const { currentSlide } = sliderRef.current.innerSlider.state;
      const currentSettings = sliderRef.current.props;
      const responsiveSettings =
        currentSettings.responsive.find(
          (breakpoint) => window.innerWidth <= breakpoint.breakpoint
        ).settings || null;
      if (currentSlide > 0) {
        sliderRef.current.slickPrev();
        setHasNextSlide(true);
        if (currentSlide - responsiveSettings.slidesToScroll <= 0) {
          setHasPrevSlide(false);
        }
      } else {
        setHasPrevSlide(false);
      }
    }
  };

  useEffect(() => {
    const sliderAmount =
      sliderRef?.current?.props?.responsive.find(
        (breakpoint) => window.innerWidth <= breakpoint.breakpoint
      ).settings.slidesToShow || null;
    if (currentThumbnails.length > sliderAmount) {
      setHasNextSlide(true);
    }
    sliderRef?.current?.slickGoTo(0);
  }, [currentThumbnails]);

  const sanitizedHtmlDescription = sanitizeHtml(product.descriptionHtml);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col gap-12">
      <div className="container flex flex-col items-center lg:flex-row lg:items-start">
        <ProductProvider
          data={product}
          initialVariantId={product?.variant?.edges[0]?.node?.id}
        >
          <div className="mb-8 px-0 relative block w-full md:flex md:flex-row-reverse lg:flex-col lg:max-w-lg lg:sticky lg:top-40 lg:mb-0 xl:flex-row-reverse xl:max-w-none 2xl:max-w-2xl 2xl:ml-auto">
            <div className="md:flex-1">
              {activeImage && (
                <div
                  key={activeImage.url}
                  className="animate-fadeIn mb-4 flex items-center justify-center aspect-square lg:pr-8 lg:mb-0"
                >
                  <Image
                    data={activeImage}
                    sizes="(min-width: 45em) 50vw, 100vw"
                    loading="eager"
                    className="rounded"
                  />
                </div>
              )}
            </div>

            <div className="max-w-lg mx-auto relative md:w-32 md:mt-8 lg:w-full lg:mt-0 lg:max-w-none xl:w-32 xl:mt-10 2xl:mt-9">
              {currentThumbnails.length > 1 && (
                <>
                  <Slider
                    ref={sliderRef}
                    {...settings}
                    className="h-auto w-full relative pt-2"
                  >
                    {currentThumbnails?.map((image, index) => (
                      <button
                        key={"thumbnailImage" + image.url}
                        className={`w-full h-auto aspect-sqaure transition-all animate-fadeIn ml-2 first:ml-0 md:ml-0 md:flex md:justify-center md:mt-4 lg:justify-normal lg:mt-0 xl:mt-4 xl:ml-0 xl:flex xl:justify-center 2xl:mt-3
                        focus-visible:outline-none focus:outline-none outline-none`}
                        onClick={() => {
                          setActiveThumbnailIndex(index);
                          setActiveImage(image);
                        }}
                      >
                        <Image
                          loading="lazy"
                          className={`w-24 xs:w-28 sm:w-24 rouned-lg border-2 rounded-lg ${
                            index == activeThumbnailIndex
                              ? "border-black"
                              : "border-black-300"
                          }`}
                          data={image}
                          width={150}
                          height={150}
                        />
                      </button>
                    ))}
                  </Slider>

                  {hasPrevSlide && (
                    <IconButton
                      onClick={previousSlide}
                      size="medium"
                      className="bg-gray-200 absolute z-0 bottom-1/2 translate-y-1/2 left-0 -translate-x-1/3
                    xs:left-0 xs:-translate-x-1/2 md:left-1/2 md:-translate-x-1/2 md:-top-1 md:-translate-y-1/2 md:rotate-90 md:h-10 md:w-10 md:flex md:justiyf-center md:items-center
                    lg:top-1/2 lg:-tranlate-y-1/2 lg:left-0 lg:rotate-0
                    xl:left-1/2 xl:-translate-x-1/2 xl:-top-1 xl:-translate-y-1/2 xl:rotate-90 xl:h-10 xl:w-10 xl:flex xl:justiyf-center xl:items-center
                    2xl:-top-1"
                    >
                      <ChevronLeftRoundedIcon
                        fontSize="32px"
                        className="text-gray-700"
                      />
                    </IconButton>
                  )}
                  {hasNextSlide && (
                    <IconButton
                      onClick={nextSlide}
                      size="medium"
                      className="bg-gray-200 absolute z-0 bottom-1/2 translate-y-1/2 right-0
                    xs:-right-3 xs:translate-x-1/2 sm:-right-1 md:left-1/2 md:-translate-x-1/2 md:bottom-16 md:rotate-90 md:w-10 md:h-10
                    lg:bottom-1/2 lg:-tranlate-y-1/2 lg:-right-2 lg:ml-auto lg:rotate-0 lg:-translate-x-1/2
                    xl:left-1/2 xl:-translate-x-1/2 xl:bottom-9 xl:rotate-90 xl:w-10 xl:h-10 xl:m-0 
                    2xl:bottom-8 "
                    >
                      <ChevronRightRoundedIcon
                        fontSize="32px"
                        className="text-gray-700"
                      />
                    </IconButton>
                  )}
                </>
              )}
            </div>
          </div>
          <Product
            extraImages={extraImages}
            setCurrentThumbnails={setCurrentThumbnails}
            setActiveThumbnailIndex={setActiveThumbnailIndex}
            activeThumbnailIndex={activeThumbnailIndex}
            setActiveImage={setActiveImage}
            // slideShow={sliderRef.current}
          />
        </ProductProvider>
      </div>
      <div className="flex flex-wrap items-center container mx-auto">
        <span className="bg-primary p-4 px-6 text-white rounded-t">
          <span className="font-bold w-full -mb-2">Product bescrhijving:</span>
        </span>
        {isClient ? (
          <p
            dangerouslySetInnerHTML={{ __html: sanitizedHtmlDescription }}
            className="border-[1px] border-gray-200 p-4 leading-7 tracking-wide"
          ></p>
        ) : (
          <p className="w-full border-[1px] border-gray-200 p-4">
            Aan het laden...
          </p>
        )}
      </div>
    </div>
  );
}

function Product({
  setCurrentThumbnails,
  extraImages = [],
  setActiveImage,
  activeThumbnailIndex,
  setActiveThumbnailIndex,
  // slideShow,
}) {
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

    const currentVariant = variants.find(
      (variant) => variant.id == selectedVariant.id
    );

    let activeMaterial = [];
    const zilver = ["zilver 925 sterling", "9 kt witgoud", "14 kt witgoud"];
    const geelgoud = ["9 kt geelgoud", "14 kt geelgoud"];
    const rosegoud = ["9 kt roségoud", "14 kt roségoud"];

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

    // slideShow?.slickPrev(0);
    setActiveImage(newThumbnails[0]);
    setCurrentThumbnails(newThumbnails);
    setActiveThumbnailIndex(0);
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
    <div className="flex flex-col gap-8 2xl:mr-auto">
      <div className="max-w-lg mx-auto flex flex-col gap-6 2xl:ml-0">
        <h1 className="text-6xl font-tangerine w-auto lg:ml-1 lg:mt-4">
          {product.title}
        </h1>
        <div className="flex items-center text-sm">
          <span className="font-bold mr-2">Prijs:</span>
          <span>
            €{selectedVariant?.price?.amount || "Variant bestaat niet"}
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
            setShowErrors(true);
            if (hasTrueValue)
              return window.scrollTo({ top: 0, behavior: "smooth" });

            console.log("add to cart");

            if (extraOptions) {
              e.preventDefault();
              const extraOptionsArray = extraOptions.flatMap((item) =>
                Array.isArray(item.value)
                  ? item.value
                      .map((nestedItem) => ({
                        key: nestedItem.key,
                        value:
                          nestedItem.value !== "" ? nestedItem.value : null,
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
        {console.log(product)}
        {/* <p>{product.description}</p> */}
      </div>
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
