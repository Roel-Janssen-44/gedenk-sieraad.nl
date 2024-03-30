"use client";

import { Image } from "@shopify/hydrogen-react";
import { useState, useEffect, Suspense } from "react";

import LoadingGrid from "@/components/LoadingGrid";
import ProductGrid from "@/components/ProductGrid";
import FilterCollection from "@/components/FilterCollection";
import SortCollection from "@/components/SortCollection";
import NotFound from "@/components/NotFound";

export default function CollectionPage({ collection }) {
  // console.log("searchParams");
  // console.log(searchParams);
  // console.log(vendor);

  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("/api/getCollectionProducts", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           collectionHandle: collection.handle,
  //           material,
  //           vendor,
  //           minPrice,
  //           maxPrice,
  //           sortKey,
  //         }),
  //         next: { revalidate: 3600 },
  //       });
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const fetchedProducts = await response.json();
  //       setProducts(fetchedProducts);
  //     } catch (error) {
  //       console.log("Error fetching collection products:", error);
  //     }
  //   };
  //   fetchData();
  // }, [collection.handle, searchParams]);
  if (!collection) return <p> nuiks</p>;

  return (
    <div className="relative container flex flex-col gap-8 md:flex-row">
      <FilterCollection products={collection.products.nodes} />
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-[1px] border-gray-200 p-4 mb-8 bg-white rounded-md">
          <div className="min-w-[150px]">
            <Image
              className="rounded"
              data={collection.image}
              width={150}
              height={150}
            />
          </div>
          <div className="">
            <h1 className="text-3xl font-roboto mb-4">{collection.title}</h1>
            <p>{collection.description}</p>
          </div>
        </div>
        <SortCollection />
        <ProductGrid collectionProducts={collection.products.nodes} />
      </div>
    </div>
  );
}
