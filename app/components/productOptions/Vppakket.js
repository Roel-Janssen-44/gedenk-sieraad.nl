"use client";

import { useState, useEffect, useRef } from "react";

import InputRadio from "../InputRadio";
import InputFile from "../InputFile";

import { vppakketKeuzeOptions, vppakketUploadOptions } from "./optionSets";

export default function Vppakketup({
  value,
  onChange,
  setOptionErrors,
  showErrors,
}) {
  const [error, setError] = useState([]);

  useEffect(() => {
    if (Array.isArray(value)) {
      const keuzeValue = value.find(
        (item) => item.key === "Vppakketkeuze"
      ).value;

      if (keuzeValue != "") {
        setError([]);
        setOptionErrors((prevState) => ({
          ...prevState,
          ["vppakket"]: false,
        }));
      } else {
        setOptionErrors((prevState) => ({
          ...prevState,
          ["vppakket"]: true,
        }));
        if (keuzeValue == "") {
          setError((prevState) => ({
            ...prevState,
            ["Vppakketkeuze"]: "* Kies een optie",
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            ["Vppakketkeuze"]: "",
          }));
        }
      }
    }
  }, [value]);

  const [values, setValues] = useState([
    { key: "Vppakketkeuze", value: value?.vppakketKeuze?.value || "" },
  ]);

  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    onChange(values);
  }, [values]);

  const handleChange = (changedKey, newValue) => {
    setValues((prevValues) =>
      prevValues.map((item) =>
        item.key === changedKey ? { ...item, value: newValue } : item
      )
    );

    onChange(values);
  };

  const vppakketKeuzeTekst = values.find(
    (item) => item.key === "Vppakketkeuze"
  ).value;

  useEffect(() => {
    onChange(values);
  }, []);

  return (
    <>
      <div className="relative">
        {showErrors && (
          <p className="absolute  -bottom-6 left-0 text-red-700">
            {error["Vppakketkeuze"]}
          </p>
        )}
        <InputRadio
          value={
            values.find((item) => item.key === "Vppakketkeuze")?.value || ""
          }
          onChange={(keuzeValue) => handleChange("Vppakketkeuze", keuzeValue)}
          title="Maak een keuze:"
          options={vppakketKeuzeOptions}
        />
      </div>
    </>
  );
}
