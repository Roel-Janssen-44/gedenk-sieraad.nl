"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "@mui/material/Button";

export default function TextWithImage() {
  return (
    <div className="py-14 container">
      <div className="p-4 rounded relative max-w-lg mx-auto lg:max-w-none lg:flex lg:flex-row lg:gap-8 xl:max-w-6xl">
        <div className="lg:w-1/2 xl:flex xl:justify-center xl:items-center">
          <div className="rounded mb-10 relative">
            <Image
              src={"/images/collectie-jewelsdesign.webp"}
              alt="Ring waar hars aan wordt toegevoegd"
              width={450}
              height={450}
            />
            <div className="absolute right-10 bottom-0 translate-x-1/2 translate-y-1/2 border-[1px] p-3 flex justify-center items-center text-xl text-center border-primary rounded-full aspect-square w-24 bg-secondary">
              Shop nu
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 flex flex-col justify-center xl:-mt-10">
          <h3 className="text-xs mb-2 font-medium text-primary uppercase">
            Exclusieve collecties van
          </h3>
          <div className="flex flex-col-reverse gap-4 mb-4">
            <h2 className="text-4xl text-gray-800 font-medium">
              Jewels Design
            </h2>
          </div>
          <p className="mb-4 before:mb-1 before:mr-2 before:inline-block before:content-[''] before:w-16 before:bg-primary before:rounded before:h-[3px]">
            Op onze website is een keur aan gedenksieraden te verkrijgen voor
            vele dierbare momenten in ons leven. Daarbij is de verwerking van
            haar, as, moedermelk, melktandjes, vingerafdruk, hand/voetafdruk,
            pootafdruk of een bijzonder symbool onze specialiteit. Of het nu een
            herinneringssieraad betreft met overlijden, een geboorte of voor de
            bevestiging van een relatie. Wij zijn de specialist om je daar bij
            van dienst te kunnen zijn. Er zijn veel mogelijkheden toepasbaar om
            jou sieraad te personaliseren. Kijk rond en laat je verrassen door
            onze collecties.
          </p>
          <Link href={"/collections/all"} className="inline-block">
            <Button
              variant="contained"
              size="large"
              className="bg-primary normal-case font-normal"
            >
              Bekijk onze collecties
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
