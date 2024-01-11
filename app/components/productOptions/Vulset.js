"use client";

import { useState, useEffect } from "react";

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
      <InputRadio
        value={value}
        onChange={handleChange}
        title="Vulset:"
        options={vulsetOptions}
      />
    </div>
  );
}
