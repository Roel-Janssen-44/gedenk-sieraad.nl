"use client";

import { useState, useEffect } from "react";

import InputFile from "@/components/InputFile";

export default function Upload({
  value,
  onChange,
  setOptionErrors,
  showErrors,
}) {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (value.length === 0) {
      setError("* Upload een afbeelding");
      setOptionErrors((prevState) => ({
        ...prevState,
        ["upload"]: true,
      }));
    } else {
      setError(null);
      setOptionErrors((prevState) => ({
        ...prevState,
        ["upload"]: false,
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
      <InputFile
        setError={setError}
        title="Upload:"
        onChange={handleChange}
        value={value}
      />
    </div>
  );
}
