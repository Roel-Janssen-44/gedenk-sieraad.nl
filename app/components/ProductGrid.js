"use client";

import React, { useState, useEffect } from "react";

import Grid from "./Grid";
import ProductGridItem from "./ProductGridItem";

export default function ProductGrid({ collection, collectionName }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

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
            // cursor: 5,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
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
