"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { TextField } from "@mui/material";

import Skeleton from "@mui/material/Skeleton";
import Grid from "./Grid";
import ProductGridItem from "./ProductGridItem";

export default function Search() {
  const searchParams = useSearchParams();
  // const pathname = usePathname();
  const { replace } = useRouter();
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  //   const fetchData = () => {
  //     if (query == "") return null;
  //     setLoading(true);
  //     const url = "/api/getSearchResults";
  //     const method = "POST";

  //     const options = {
  //       method: method,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ searchQuery: query }),
  //     };
  //     fetch(url, options)
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error(`HTTP error! Status: ${response.status}`);
  //         }
  //         return response.json();
  //       })
  //       .then((result) => {
  //         console.log(result);
  //         setData(result);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   };

  useEffect(() => {
    if (query == "") {
      setData(null);
    } else {
      setLoading(true);
      const url = "/api/getSearchResults";
      const method = "POST";

      const options = {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchQuery: query }),
      };
      fetch(url, options)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((result) => {
          console.log(result);
          setData(result);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [query]);

  const handleChange = (newValue) => {
    setQuery(newValue);
    const params = new URLSearchParams(searchParams);
    params.set("search", newValue);
    replace(`search?${params.toString()}`);
  };
  return (
    <div>
      <div className="container">
        <center>
          <h1 className="font-tangerine text-5xl max-w-[250px] sm:max-w-none mb-4">
            Zoek producten in onze webshop
          </h1>
        </center>
        <div className="flex justify-center">
          <TextField
            autoFocus
            value={query}
            placeholder="Zoeken"
            variant="outlined"
            className="w-80 mx-auto"
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>

        {data?.data?.search?.nodes[0]?.title && (
          <Grid>
            {data.data.search.nodes.map((product) => (
              <ProductGridItem key={product.id} product={product} />
            ))}
          </Grid>
        )}
        {(data?.data?.search?.totalCount == 0 ||
          !data?.data?.search?.nodes[0]?.title) &&
          data != null && (
            <p className="text-center mt-12 text-xl flex flex-col sm:flex-row gap-1 sm:gap-1">
              Helaas hebben we het product <span /> &#34;{query}&#34; <span />{" "}
              niet kunnen vinden
            </p>
          )}
        {data == null && (
          <p className="text-center mt-12 text-xl">
            Begin met typen om een product te zoeken
          </p>
        )}
        {query != "" && loading && (
          <Grid>
            <Skeleton className="h-80 w-80 scale-100 my-6" />
            <Skeleton className="h-80 w-80 scale-100 my-6" />
            <Skeleton className="h-80 w-80 scale-100 my-6" />
            <Skeleton className="h-80 w-80 scale-100 my-6" />
          </Grid>
        )}
      </div>
    </div>
  );
}
