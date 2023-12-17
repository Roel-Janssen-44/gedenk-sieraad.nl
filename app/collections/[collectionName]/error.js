"use client";

import NotFound from "@/components/NotFound";

export default function ErrorCollection() {
  return (
    <NotFound
      type={"collectie"}
      link={"/collections/all"}
      label={"Alle collecties bekijken"}
    />
  );
}
