"use client";

import React, { useState, useEffect } from "react";
import { flattenConnection } from "@shopify/hydrogen-react";
import { getClientBrowserParameters } from "@shopify/hydrogen-react";
import { useSearchParams } from "next/navigation";

import Grid from "./Grid";
import ProductGridItem from "./ProductGridItem";

export default function ProductGrid({ collection, collectionName }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const materiaalParam = searchParams.get("Materiaal");
  const materiaal = materiaalParam
    ? materiaalParam.replace(/\s*\(\d+\)\s*/, "")
    : null;

  console.log(materiaalParam);
  console.log(materiaal);
  const merkParam = searchParams.get("Merk");
  const merk = merkParam ? merkParam.replace(/\s*\(\d+\)\s*/, "") : null;
  console.log("merk");
  console.log(merk);
  const minPrijs = searchParams.get("minprijs");
  const maxPrijs = searchParams.get("maxprijs");
  const sort = searchParams.get("sorteer");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getCollectionProducts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            collectionName: "assieraden",
            materiaal: materiaal,
            productVendor: merk,
            minPrijs,
            maxPrijs,
            sortKey: sort,
            // cursor: 5,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("data");
        console.log(data);
        console.log(data.nodes);
        setProducts(data);
      } catch (error) {
        setError(error.message || "An error occurred while fetching data.");
      }
    };

    fetchData();
  }, [collection]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Grid>
      {products?.nodes?.map((product) => {
        return <ProductGridItem key={product.id} product={product} />;
      })}
    </Grid>
  );
}
