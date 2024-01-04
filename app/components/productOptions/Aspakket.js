"use client";

import { useState, useEffect } from "react";

import InputRadio from "../InputRadio";
import { aspakketOptions } from "./optionSets";

export default function Aspakket({
  value,
  onChange,
  setOptionErrors,
  showErrors,
}) {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (value.length === 0) {
      setError("Veld mag niet leeg zijn");
      setOptionErrors((prevState) => ({
        ...prevState,
        ["aspakket"]: true,
      }));
    } else {
      setError(null);
      setOptionErrors((prevState) => ({
        ...prevState,
        ["aspakket"]: false,
      }));
    }
  }, [value]);

  const handleChange = (newValue) => {
    onChange(newValue);
  };
  return (
    <div className="relative">
      {showErrors && (
        <p className="absolute  -bottom-4 left-0 text-red-700">{error}</p>
      )}
      <InputRadio
        value={value}
        onChange={handleChange}
        title="Maak een keuze:"
        options={aspakketOptions}
      />
    </div>
  );
}
