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

  const fetchData = () => {
    if (query == "") return null;
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
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  const handleChange = (newValue) => {
    setQuery(newValue);
    console.log("newValue");
    console.log(newValue);
    const params = new URLSearchParams(searchParams);
    params.set("search", newValue);
    replace(`search?${params.toString()}`);
  };
  return (
    <div>
      <div className="container">
        <center>
          <h1 className="font-tangerine text-5xl max-w-[250px] mb-4">
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
            {console.log("data")}
            {console.log(data?.data)}
            {data.data.search.nodes.map((product) => (
              <ProductGridItem key={product.id} product={product} />
            ))}
          </Grid>
        )}
        {(data?.data?.search?.totalCount == 0 ||
          !data?.data?.search?.nodes[0]?.title) && (
          <p className="text-center mt-12 text-xl">
            Helaas hebben we het product <br /> "{query}" <br /> niet kunnen
            vinden...
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
