"use client";

import Link from "next/link";
import { Money, Image } from "@shopify/hydrogen-react";

export default function ProductGridItem({ product }) {
  return (
    <div className="p-8">
      <Link href={`/products/${product.handle}`} className="group">
        <div className="relative">
          <Image
            data={product.images.nodes[0]}
            width={150}
            height={150}
            className={`h-auto ${
              product.images.nodes[1]?.src != undefined
                ? "group-hover:opacity-0 transition-all duration-500"
                : ""
            }`}
          />
          {product.images.nodes[1]?.src && (
            <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-500">
              <Image
                data={product.images.nodes[1]}
                width={150}
                className="h-auto"
                height={150}
              />
            </div>
          )}
        </div>
        <div className="text-center">
          <span className="text-sm font-light">{product.vendor}</span>
          <h3 className="text-lg mt-6 mb-4 font-light group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          <span className="text-xl mt-4 font-light text-primary">
            <Money data={product.priceRange.minVariantPrice} />
          </span>
        </div>
      </Link>
    </div>
  );
}
