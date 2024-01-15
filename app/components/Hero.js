"use client";

import Slider from "react-slick";
import Link from "next/link";
import "../slick_slider.css";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
export default function Hero() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    // autoplay: true,
    autoplay: false,
    autoplaySpeed: 3500,
  };

  const slides = [
    {
      image: "hero-image-1.webp",
      imageAlt: "Twee gouden ringen die op elkaar liggen",
      title: "Sieraden met Emotie",
    },
    {
      image: "hero-image-2.webp",
      imageAlt: "Twee gouden ringen die op elkaar liggen",
      title: "Memories Forever",
    },
    {
      image: "hero-image-3.webp",
      imageAlt: "Twee gouden ringen die op elkaar liggen",
      title: "The art of Creation",
    },
  ];
  return (
    <div className="h-[100lvh] bg-red-400">
      <Slider {...settings} className="h-[100lvh]">
        {slides.map((slide, index) => (
          <div key={slide.title} className="h-[100lvh] relative">
            <Image
              src={`/images/${slide.image}`}
              alt={`/images/${slide.imageAlt}`}
              fill
              objectFit="cover"
              className=""
              priority
            />
            <div
              className={`bg-black absolute top-0 left-0 w-full h-full z-10 opacity-20`}
            />
            <div
              className={`z-20 container max-w-2xl xl:max-w-3xl 2xl:max-w-4xl text-white mt-14 w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 //sm:left-20 //sm:translate-x-0 `}
            >
              <h3 className="text-8xl font-tangerine max-w-xs mb-10">
                {slide.title}
              </h3>
              <IconButton className={`z-20 text-white w-28 aspect-square`}>
                <Link
                  className={`p-4 text-3xl font-tangerine border-[1px] w-full flex justify-center items-center h-full border-white rounded-full `}
                  href={"/collections/all"}
                >
                  Shop nu
                </Link>
              </IconButton>
            </div>
            {/* <div className="container absolute w-full left-1/2 -translate-x-1/2 h-auto bottom-12 sm:bottom-20"></div> */}
          </div>
        ))}
      </Slider>
    </div>
  );
}

// ${
//   index == 0
//     ? "left-0 sm:left-16"
//     : index == 1
//     ? "right-12 md:right-1/2 md:translate-x-48"
//     : "left-1/2 -translate-x-1/2 md:right-1/2 md:translate-x-36"
// }
