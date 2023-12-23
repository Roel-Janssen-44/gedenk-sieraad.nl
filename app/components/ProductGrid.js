"use client";

import React, { useState, useEffect } from "react";
import { flattenConnection } from "@shopify/hydrogen-react";
import { getClientBrowserParameters } from "@shopify/hydrogen-react";
import { useSearchParams } from "next/navigation";

import Button from "@mui/material/Button";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import Stack from "@mui/material/Stack";

import Grid from "./Grid";
import ProductGridItem from "./ProductGridItem";

export default function ProductGrid({ collection, collectionName }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [newFetchCursor, setNewFetchCursor] = useState(null);

  const searchParams = useSearchParams();
  const materiaalParam = searchParams.get("Materiaal");
  const materiaal = materiaalParam
    ? materiaalParam.replace(/\s*\(\d+\)\s*/, "")
    : null;
  const merkParam = searchParams.get("Merk");
  const merk = merkParam ? merkParam.replace(/\s*\(\d+\)\s*/, "") : null;
  const minPrijs = searchParams.get("MinPrijs");
  const maxPrijs = searchParams.get("MaxPrijs");
  const sort = searchParams.get("Sorteer");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getCollectionProducts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            collectionName,
            materiaal: materiaal,
            productVendor: merk,
            minPrijs,
            maxPrijs,
            sortKey: sort,
            newFetchCursor: newFetchCursor,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setProducts(data.nodes);
        setPageInfo(data.pageInfo);
      } catch (error) {
        setError(error.message || "An error occurred while fetching data.");
      }
    };

    fetchData();
  }, [collection, newFetchCursor]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleNewFetch = (direction, cursor) => {
    setNewFetchCursor({ direction, cursor });
  };

  return (
    <Grid>
      {/* To do lege pagina melding maken */}
      {/* {!products[0] && <h2>Geen producten gevonden probeer een andere pagina</h2>} */}
      {products.map((product) => {
        return <ProductGridItem key={product.id} product={product} />;
      })}
      <div className="flex flex-row justify-center gap-12 mt-8">
        {pageInfo?.hasPreviousPage && (
          <Button
            variant="contained"
            className={`text-gray-700 ${
              pageInfo?.hasPreviousPage
                ? "bg-primary text-white"
                : "border-2 border-black"
            }`}
            onClick={() => handleNewFetch("before", pageInfo.startCursor)}
          >
            <ChevronLeftRoundedIcon fontSize="large" color="inherit" />
          </Button>
        )}
        {!pageInfo?.hasPreviousPage && (
          <Button variant="contained" disabled className={`text-gray-700 `}>
            <ChevronLeftRoundedIcon fontSize="large" color="inherit" />
          </Button>
        )}
        {pageInfo?.hasNextPage && (
          <Button
            variant="contained"
            className={`text-gray-700  ${
              pageInfo?.hasNextPage
                ? "bg-primary text-white"
                : "border-2 border-black"
            }`}
            onClick={() => handleNewFetch("after", pageInfo.endCursor)}
          >
            <ChevronRightRoundedIcon fontSize="large" color="inherit" />
          </Button>
        )}
        {!pageInfo?.hasNextPage && (
          <Button variant="contained" disabled className={`text-gray-700 `}>
            <ChevronRightRoundedIcon fontSize="large" color="inherit" />
          </Button>
        )}
      </div>
    </Grid>
  );
}
