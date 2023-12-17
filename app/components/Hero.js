"use client";

import Slider from "react-slick";

import "../slick_slider.css";
import Image from "next/image";

export default function Hero() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    // lazyLoad: "ondemand",
  };

  const slides = [
    {
      image: "hero-image-1.webp",
      imageAlt: "Twee gouden ringen die op elkaar liggen",
      title: "Sieraden met emotie",
    },
    {
      image: "hero-image-2.webp",
      imageAlt: "Twee gouden ringen die op elkaar liggen",
      title: "Memories forever",
    },
    {
      image: "hero-image-3.webp",
      imageAlt: "Twee gouden ringen die op elkaar liggen",
      title: "The art of creation",
    },
  ];
  return (
    <div className="h-[100svh] bg-red-400">
      <Slider {...settings} className="h-[100svh]">
        <div className="h-[100svh] relative">
          <Image
            src="/images/hero-image-1.webp"
            alt="slide.imageAlt"
            fill
            objectFit="cover"
          />
          <div
            className={`bg-black absolute top-0 left-0 w-full h-full z-10 opacity-[0.35]`}
          />
          <div
            className={`z-20 text-white w-full max-w-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
          >
            <h3 className="text-8xl font-tangerine">
              Sieraden <br />
              met <br />
              emotie
            </h3>
          </div>
        </div>
        <div className="h-[100svh] relative">
          <Image
            src="/images/hero-image-2.webp"
            alt="slide.imageAlt"
            fill
            objectFit="cover"
          />
          <div
            className={`bg-black absolute top-0 left-0 w-full h-full z-10 opacity-[0.35]`}
          />
          <div
            className={`z-20 text-white w-full max-w-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
          >
            <h3 className="text-8xl font-tangerine">
              Memories <br />
              forever
            </h3>
          </div>
        </div>
        <div className="h-[100svh] relative">
          <Image
            src="/images/hero-image-3.webp"
            alt="slide.imageAlt"
            fill
            objectFit="cover"
          />
          <div
            className={`bg-black absolute top-0 left-0 w-full h-full z-10 opacity-[0.35]`}
          />
          <div
            className={`z-20 text-white w-full max-w-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
          >
            <h3 className="text-8xl font-tangerine">
              The art
              <br /> of
              <br /> creation
            </h3>
          </div>
        </div>
      </Slider>
    </div>
  );
}
