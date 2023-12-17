"use client";

import NotFound from "@/components/NotFound";

export default function ErrorProduct() {
  return (
    <NotFound
      type={"product"}
      link={"/collections/all"}
      label={"Alle producten bekijken"}
    />
  );
}
