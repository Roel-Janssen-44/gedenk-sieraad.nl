"use client";

import InputSelect from "./InputSelect";

const options = [
  {
    value: "Aanbevolen",
    price: 0,
  },
  {
    value: "Bestsellers",
    price: 0,
  },
  {
    value: "Prijs, laag naar hoog",
    price: 0,
  },
  {
    value: "Prijs, hoog naar laag",
    price: 0,
  },
];
export default function SortCollection({}) {
  return (
    <div className="flex justify-end items-center">
      <span className="font-bold mr-4">Sorteren:</span>
      <div className="-mt-2">
        <InputSelect
          value={"Aanbevolen"}
          onChange={null}
          title={""}
          options={options}
        />
      </div>
    </div>
  );
}
