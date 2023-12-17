"use client";

import { usePathname } from "next/navigation";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import Image from "next/image";

export default function Breadcrumb() {
  const pathname = usePathname();
  const urlParts = pathname.split("/").filter(Boolean);

  if (urlParts[0] == undefined) return null;
  return (
    <div className="relative h-80 flex justify-center items-center mb-20">
      <div className="z-10 absolute left-0 top-0 w-full h-full">
        <Image
          src={"/images/breadcrumb.webp"}
          alt="decoratieve foto drie kettingen met gouden hangers eraan"
          width={1920}
          height={1080}
          loading="lazy"
          className="w-auto h-full object-cover"
        />
      </div>
      <div className="z-10 w-full h-full absolute left-0 top-0 bg-black opacity-[0.35]"></div>
      <div className="z-20 container absolute left-1/2 top-[75%] -translate-x-1/2 -translate-y-1/2">
        <Breadcrumbs
          aria-label="breadcrumb"
          className="text-center  text-white"
        >
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Breadcrumb1 urlParts={urlParts} />
          <Breadcrumb2 urlParts={urlParts} />
        </Breadcrumbs>
      </div>
    </div>
  );
}

export function Breadcrumb1({ urlParts }) {
  if (!urlParts[0]) return null;

  const url = urlParts[0];
  let link = "";
  if (url == "collections") {
    link = "/collections/all";
  } else if (url == "products") {
    link = "/collections/all";
  }

  if (urlParts[1]) {
    return (
      <>
        <Link underline="hover" color="inherit" href={link}>
          {urlParts[0].charAt(0).toUpperCase() + urlParts[0].slice(1)}
        </Link>
      </>
    );
  } else {
    return <span>{urlParts[0]}</span>;
  }
}
export function Breadcrumb2({ urlParts }) {
  if (!urlParts[0] || !urlParts[1]) return null;

  if (urlParts[1]) {
    return (
      <>
        <span href={`/${urlParts[0]}/${urlParts[1]}`} aria-current="page">
          {urlParts[1].charAt(0).toUpperCase() + urlParts[1].slice(1)}
        </span>
      </>
    );
  }
}
