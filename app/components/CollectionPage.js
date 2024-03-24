"use client";

import { Image } from "@shopify/hydrogen-react";
import { useState, useEffect } from "react";

import LoadingGrid from "@/components/LoadingGrid";
import ProductGrid from "@/components/ProductGrid";
import FilterCollection from "@/components/FilterCollection";
import SortCollection from "@/components/SortCollection";
import NotFound from "@/components/NotFound";

export default function CollectionPage({ searchParams, collection }) {
  const sortKey = searchParams.Sorteer;
  const material = searchParams.Materiaal || null;
  const vendor = searchParams.Merk || null;
  const minPrice = searchParams.MinPrijs || null;
  const maxPrice = searchParams.MaxPrijs || null;

  const [products, setProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("fetching products");
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getCollectionProducts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            collectionHandle: collection.handle,
            // material,
            // vendor,
            minPrice,
            maxPrice,
            sortKey,
          }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const fetchedProducts = await response.json();
        setProducts(fetchedProducts);

        let productsToShow = [];
        fetchedProducts.forEach((product) => {
          if (product.vendor === vendor) {
            productsToShow.push(product);
          }
        });
        setCurrentProducts(productsToShow);
      } catch (error) {
        console.log("Error fetching collection products:", error);
        setError(error.message || "An error occurred while fetching data.");
      }
    };
    fetchData();
  }, [collection.handle, searchParams]);

  useEffect(() => {
    let newProducts = [];
    products.forEach((product) => {
      // if (vendor) {
      //   if (product.vendor === vendor) {
      //     newProducts.push(product);
      //   }
      // }
      newProducts.push(product);
    });
    setProducts(newProducts);
  }, [searchParams]);

  return (
    <div className="container flex flex-col gap-8 md:flex-row">
      <FilterCollection products={products} />
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
        <ProductGrid collectionProducts={currentProducts} />
      </div>
    </div>
  );
}
