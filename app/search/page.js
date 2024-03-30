import { Suspense } from "react";

import Search from "@/components/Search";

// To do meta description maken
export const metadata = {
  title: "Zoek producten in onze webshop",
  description: "",
};

export default async function SearchPage() {
  return (
    <div className="">
      <Suspense>
        <Search />
      </Suspense>
    </div>
  );
}
