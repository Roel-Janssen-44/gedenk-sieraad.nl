"use client";

import React, { useState, useEffect, useRef } from "react";
import { flattenConnection } from "@shopify/hydrogen-react";
import { getClientBrowserParameters } from "@shopify/hydrogen-react";

import Button from "@mui/material/Button";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";

import Grid from "./Grid";
import ProductGridItem from "./ProductGridItem";
import InfiniteScroll from "react-infinite-scroll-component";

// import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { createSearchParamsBailoutProxy } from "next/dist/client/components/searchparams-bailout-proxy";
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
  const [fetching, setFetching] = useState(true);

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
        console.log("Products added to list");

        let uniqueProducts = [];
        data.nodes.forEach((newProduct) => {
          if (!products.some((product) => product.id == newProduct.id)) {
            console.log("new product added");
            uniqueProducts.push(newProduct);
          } else {
            console.log("no product added");
          }
        });

        console.log(uniqueProducts);
        setProducts([...products, ...uniqueProducts]);
        // setProducts(uniqueProducts);
        // console.log("[...products, uniqueProducts]");
        // console.log(...products, uniqueProducts);
        setPageInfo(data.pageInfo);
        setFetching(false);
        // fetching = false;
      } catch (error) {
        setError(error.message || "An error occurred while fetching data.");
      }
    };

    fetchData();
  }, [collectionHandle, newFetchCursor]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  // const fetchNewProducts = () => {
  //   console.log("Fetching new products ");
  //   if (!fetching) {
  //     // fetching = true;
  //     setFetching(true);
  //     console.log("Fetching new products 2");
  //     if (pageInfo?.startCursor) {
  //       setNewFetchCursor({
  //         direction: "after",
  //         cursor: pageInfo.startCursor,
  //       });
  //     }
  //   }
  // };

  return (
    <>
      {/* <InfiniteScroll
        dataLength={products.length}
        next={fetchNewProducts}
        hasMore={true}
        loader={<p>Loading...</p>}
        endMessage={<p>No more data to load.</p>}
        scrollThreshold={0.5}
      > */}
      <Grid>
        {/* To do lege pagina melding maken */}
        {/* {!products[0] && <h2>Geen producten gevonden probeer een andere pagina</h2>} */}
        {products.map((product) => {
          return <ProductGridItem key={product.id} product={product} />;
        })}
      </Grid>
      {/* </InfiniteScroll> */}

      <div className="w-full flex flex-row justify-center gap-12 mt-8"></div>
    </>
  );
}
