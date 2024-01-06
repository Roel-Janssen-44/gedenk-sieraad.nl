"use client";

import Link from "next/link";
import { Money, Image } from "@shopify/hydrogen-react";

export default function ProductGridItem({ product }) {
  if (!product?.handle) return null;
  return (
    <Link
      href={`/products/${product.handle}`}
      className="group p-8 hover:shadow-xl animation-all duration-500"
    >
      <div className="relative flex justify-center">
        <Image
          data={product?.images?.nodes[0]}
          width={150}
          height={150}
          className={`h-auto ${
            product?.images?.nodes[1]?.src != undefined
              ? "group-hover:opacity-0 transition-all duration-500"
              : ""
          }`}
        />
        {product?.images?.nodes[1]?.src && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-500 flex justify-center">
            <Image
              data={product?.images?.nodes[1]}
              width={150}
              className="h-auto"
              height={150}
            />
          </div>
        )}
      </div>
      <div className="text-center mt-2">
        {product?.vendor && (
          <span className="text-xs font-light">{product.vendor}</span>
        )}
        <h3 className="text-5xl font-tangerine mt-4 mb-4 group-hover:text-primary transition-colors">
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
