"use client";

import { useState, useEffect } from "react";

import InputSelect from "../InputSelect";
import { ringmaatSeeyouOptions } from "./optionSets";

export default function RingmaatSeeyou({
  value,
  onChange,
  setOptionErrors,
  showErrors,
}) {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (value.length === 0) {
      setError("* Veld mag niet leeg zijn");
      setOptionErrors((prevState) => ({
        ...prevState,
        ["ringmaatSeeyou"]: true,
      }));
    } else {
      setError(null);
      setOptionErrors((prevState) => ({
        ...prevState,
        ["ringmaatSeeyou"]: false,
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
      <InputSelect
        value={value}
        onChange={handleChange}
        title="RingmaatSeeyou:"
        options={ringmaatSeeyouOptions}
      />
    </div>
  );
}
