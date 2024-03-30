"use client";

import Link from "next/link";
import { Money, Image } from "@shopify/hydrogen-react";

export default function ProductGridItem({ product }) {
  if (!product?.handle) return null;
  return (
    <Link
      href={`/products/${product.handle}`}
      className="group p-8 w-full sm:w-[284px] md:w-[332px] lg:w-[303px] xl:w-[295px] 2xl:w-[287px] hover:shadow-xl animation-all duration-500"
    >
      <div className="relative block w-[150px] h-[150px] mx-auto">
        <Image
          data={product?.images?.nodes[0]}
          layout="raw"
          className={`w-full h-full object-scale-down ${
            product?.images?.nodes[1]?.url != undefined
              ? "group-hover:opacity-0 transition-all duration-500"
              : ""
          }`}
        />
        {product?.images?.nodes[1]?.url && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-500 flex justify-center">
            <Image
              data={product?.images?.nodes[1]}
              className="w-full h-full object-scale-down"
            />
          </div>
        )}
      </div>
      <div className="text-center mt-2">
        {product?.vendor && (
          <span className="text-xs font-light">{product.vendor}</span>
        )}
        <h3 className="text-xl font-roboto mt-2 mb-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        <span className="text-xl mt-4 font-light text-primary">
          {product.priceRange?.minVariantPrice && (
            <Money data={product.priceRange.minVariantPrice} />
          )}
        </span>
      </div>
    </Link>
  );
}
