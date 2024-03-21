"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import InputRadio from "../InputRadio";
import { vulsetOptions } from "./optionSets";

export default function Vulset({
  value,
  onChange,
  setOptionErrors,
  showErrors,
}) {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (value.length === 0) {
      setError("* Kies een optie");
      setOptionErrors((prevState) => ({
        ...prevState,
        ["vulset"]: true,
      }));
    } else {
      setError(null);
      setOptionErrors((prevState) => ({
        ...prevState,
        ["vulset"]: false,
      }));
    }
  }, [value]);

  const handleChange = (newValue) => {
    onChange(newValue);
  };
  return (
    <div className="relative">
      {showErrors && (
        <p className="absolute  -bottom-6 left-0 text-red-700">{error}</p>
      )}
      <div className="flex flex-row">
        <InputRadio
          value={value}
          onChange={handleChange}
          title="Vulset:"
          options={vulsetOptions}
        />
        <Image src={"/images/vulset.webp"} width={150} height={150} />
      </div>
    </div>
  );
}
