"use client";

import React, { useState, useEffect } from "react";
import { flattenConnection } from "@shopify/hydrogen-react";
import { getClientBrowserParameters } from "@shopify/hydrogen-react";

import Button from "@mui/material/Button";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";

import Grid from "./Grid";
import ProductGridItem from "./ProductGridItem";

// import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
// import { TextField } from "@mui/material";
//   const { replace } = useRouter();
//   const [query, setQuery] = useState(searchParams.get("search") || "");
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const handleChange = (newValue) => {
//     setQuery(newValue);
//     const params = new URLSearchParams(searchParams);
//     params.set("search", newValue);
//     replace(`search?${params.toString()}`);
//   };

export default function ProductGrid({ collectionHandle }) {
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
            collectionName: collectionHandle,
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
  }, [collectionHandle, newFetchCursor]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const { replace, push } = useRouter();

  const handleNewFetch = (direction, cursor) => {
    // to do hanle page with different search params
    const isMobile = window.innerWidth < 768;
    const scrollValue = isMobile ? 950 : 350;
    window.scroll({ top: scrollValue, left: 0, behavior: "smooth" });
    setNewFetchCursor({ direction, cursor });
    const page = searchParams.get("page");
    if (direction == "after") {
      push(`?page=${String(parseInt(page) + 1)}`);
    } else {
      replace(`?page=${String(parseInt(page) - 1)}`);
    }
  };

  return (
    <>
      <Grid>
        {/* To do lege pagina melding maken */}
        {/* {!products[0] && <h2>Geen producten gevonden probeer een andere pagina</h2>} */}
        {products.map((product) => {
          return <ProductGridItem key={product.id} product={product} />;
        })}
      </Grid>
      <div className="w-full flex flex-row justify-center gap-12 mt-8">
        {pageInfo?.hasPreviousPage && (
          <Button
            variant="contained"
            className={`text-gray-700 ${
              pageInfo?.hasPreviousPage
                ? "bg-primary text-white"
                : "border-2 border-black cursor-not-allowed"
            }`}
            onClick={() => handleNewFetch("before", pageInfo.startCursor)}
          >
            <ChevronLeftRoundedIcon fontSize="large" color="inherit" />
          </Button>
        )}
        {!pageInfo?.hasPreviousPage && (
          <div className="cursor-not-allowed">
            <Button
              variant="contained"
              disabled
              onClick={() => null}
              className={`text-gray-700 cursor-not-allowed`}
            >
              <ChevronLeftRoundedIcon fontSize="large" color="inherit" />
            </Button>
          </div>
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
          <div className="cursor-not-allowed">
            <Button
              variant="contained"
              disabled
              onClick={() => null}
              className={`text-gray-700`}
            >
              <ChevronRightRoundedIcon fontSize="large" color="inherit" />
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
