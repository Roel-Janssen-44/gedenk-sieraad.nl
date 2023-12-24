"use client";

import Slider from "react-slick";
import Link from "next/link";
import "../slick_slider.css";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";

export default function CollectionSlider() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3500,
  };

  //   const slides = [
  //     {
  //       image: "hero-image-1.webp",
  //       imageAlt: "Twee gouden ringen die op elkaar liggen",
  //       title: "Sieraden met emotie",
  //     },
  //     {
  //       image: "hero-image-2.webp",
  //       imageAlt: "Twee gouden ringen die op elkaar liggen",
  //       title: "Memories forever",
  //     },
  //     {
  //       image: "hero-image-3.webp",
  //       imageAlt: "Twee gouden ringen die op elkaar liggen",
  //       title: "The art of creation",
  //     },
  //   ];
  return (
    <div className="h-[50svh] mt-20 bg-green-400">
      {/* <Slider {...settings} className="h-[100svh]">
        {slides.map((slide, index) => (
          <div className="h-[100svh] relative">
            <Image
              src={`/images/${slide.image}`}
              alt={`/images/${slide.imageAlt}`}
              fill
              objectFit="cover"
            />
            <div
              className={`bg-black absolute top-0 left-0 w-full h-full z-10 opacity-20`}
            />
            <div
              className={`z-20 text-white w-full max-w-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
            >
              <h3 className="text-8xl font-tangerine">{slide.title}</h3>
            </div>
            <IconButton
              className={`z-20 text-white w-28 absolute aspect-square bottom-12 ${
                index == 0
                  ? "left-12"
                  : index == 1
                  ? "right-12"
                  : "left-1/2 -translate-x-1/2"
              }`}
            >
              <Link
                className={`p-4 text-3xl font-tangerine border-[1px] w-full flex justify-center items-center h-full border-white rounded-full `}
                href={"/"}
              >
                Shop nu
              </Link>
            </IconButton>
          </div>
        ))}
      </Slider> */}
      collection slider
    </div>
  );
}
