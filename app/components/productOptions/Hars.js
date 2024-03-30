"use client";

import { useState, useEffect, useRef } from "react";

import InputImageSwatch from "../InputImageSwatch";
import InputRadio from "../InputRadio";

import { harsKleurOptions, glitterOptions } from "./optionSets";

export default function HarsKleur({
  value,
  onChange,
  setOptionErrors,
  showErrors,
}) {
  const [error, setError] = useState([]);

  useEffect(() => {
    if (Array.isArray(value)) {
      const harsKleurValue = value.find(
        (item) => item.key === "Harskleur"
      ).value;
      const glitterValue = value.find((item) => item.key === "glitter").value;

      if (harsKleurValue != "" && glitterValue != "") {
        setError([]);
        setOptionErrors((prevState) => ({
          ...prevState,
          ["hars"]: false,
        }));
      } else {
        setOptionErrors((prevState) => ({
          ...prevState,
          ["hars"]: true,
        }));
        if (harsKleurValue == "") {
          setError((prevState) => ({
            ...prevState,
            ["Harskleur"]: "* Kies een harskleur",
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            ["Harskleur"]: "",
          }));
        }
        if (glitterValue == "") {
          setError((prevState) => ({
            ...prevState,
            ["glitter"]: "* Kies een optie",
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            ["glitter"]: "",
          }));
        }
      }
    }
  }, [value]);

  const [values, setValues] = useState([
    { key: "Harskleur", value: value?.harsKleur?.value || "" },
    { key: "glitter", value: value?.glitter?.value || "" },
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

  return (
    <>
      <div className="relative">
        {showErrors && (
          <p className="absolute  -bottom-6 left-0 text-red-700">
            {error["Harskleur"]}
          </p>
        )}
        <InputImageSwatch
          value={values.find((item) => item.key === "Harskleur")?.value || ""}
          onChange={(newHarsValue) => handleChange("Harskleur", newHarsValue)}
          title="Harskleur:"
          options={harsKleurOptions}
        />
      </div>
      <div className="relative">
        {showErrors && (
          <p className="absolute  -bottom-6 left-0 text-red-700">
            {error["glitter"]}
          </p>
        )}
        <InputRadio
          value={values.find((item) => item.key === "glitter")?.value || ""}
          onChange={(newGlitterValue) =>
            handleChange("glitter", newGlitterValue)
          }
          title="Glitter:"
          options={glitterOptions}
        />
      </div>
    </>
  );
}
