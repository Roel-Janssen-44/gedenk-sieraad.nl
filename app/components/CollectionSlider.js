"use client";

import sanitizeHtml from "sanitize-html-react";
import { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import Link from "next/link";
import "../slick_slider.css";
import { Image } from "@shopify/hydrogen-react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import ProductGridItem from "@/components/ProductGridItem";

export default function CollectionSlider({ collectionHandle }) {
  const [collection, setCollection] = useState(null);
  // To do setError

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3500,
    draggable: true,
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 1560,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const sliderRef = useRef();

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const previousSlide = () => {
    sliderRef.current.slickPrev();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getCollection", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            collectionHandle,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCollection(data);
      } catch (error) {
        setError(error.message || "An error occurred while fetching data.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="py-14 bg-white">
      <div className="container">
        {collection != null ? (
          <div className="p-4 rounded">
            <div className="flex flex-col lg:gap-10 lg:flex-row justify-center items-center max-w-6xl mx-auto lg:mb-6 2xl:mb-8">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-roboto text-gray-800 mb-3">
                  {collection.title}
                </h2>
                <div className="mb-4">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(collection.descriptionHtml),
                    }}
                    className="before:mb-1 before:mr-2 before:inline-block before:content-[''] before:w-16 before:bg-primary before:rounded before:h-[3px]"
                  ></p>
                </div>

                <Link
                  href={"/collections/" + collection.handle}
                  className="mb-6 inline-block"
                >
                  <Button
                    variant="contained"
                    size="large"
                    className="bg-primary normal-case font-normal"
                  >
                    Bekijk alle
                  </Button>
                </Link>
              </div>
              <div className="lg:w-1/2 lg:h-auto relative aspect-square xl:aspect-video overflow-hidden">
                <Image
                  // className="rounded-sm hidden lg:block lg:absolute lg:left-0 lg:top-0 lg:w-full lg:h-full"
                  className="rounded-md hidden lg:block"
                  data={collection.image}
                  loading="eager"
                />
              </div>
            </div>

            <Slider
              ref={sliderRef}
              {...settings}
              className="h-auto w-full mb-3"
            >
              {collection?.products?.nodes.map((product, index) => (
                <div className="w-full" key={product.id}>
                  <ProductGridItem product={product} />
                </div>
              ))}
              <div className="w-full h-full min-h-[340px] flex flex-col justify-center items-center gap-4">
                <p className="text-center">
                  Ontdek alle producten van {collection.title}
                </p>
                <Link href={"/collections/" + collection.handle}>
                  <Button
                    variant="contained"
                    size="large"
                    className="bg-primary normal-case font-normal"
                  >
                    Bekijk alle
                  </Button>
                </Link>
              </div>
            </Slider>

            <div className="flex justify-center gap-8">
              <IconButton onClick={previousSlide} size="large">
                <ChevronLeftRoundedIcon
                  fontSize="32px"
                  className="text-gray-700"
                />
              </IconButton>
              <IconButton onClick={nextSlide} size="large">
                <ChevronRightRoundedIcon
                  fontSize="32px"
                  className="text-gray-700"
                />
              </IconButton>
            </div>
          </div>
        ) : (
          <>
            <h2>loading</h2>
            <p>Loading paragraph</p>
          </>
        )}
      </div>
    </div>
  );
}
