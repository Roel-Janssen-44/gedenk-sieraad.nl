import { useState, useEffect, useRef } from "react";

import InputImageSwatch from "../InputImageSwatch";
import InputRadio from "../InputRadio";

import { harsKleurOptions, glitterOptions } from "./optionSets";

export default function HarsKleur({ value, onChange }) {
  const [values, setValues] = useState([
    { key: "harsKleur", value: value?.harsKleur?.value || "" },
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
      <InputImageSwatch
        value={values.find((item) => item.key === "harsKleur")?.value || ""}
        onChange={(newHarsValue) => handleChange("harsKleur", newHarsValue)}
        title="Harskleur:"
        options={harsKleurOptions}
      />
      <InputRadio
        value={values.find((item) => item.key === "glitter")?.value || ""}
        onChange={(newGlitterValue) => handleChange("glitter", newGlitterValue)}
        title="Glitter:"
        options={glitterOptions}
      />
    </>
  );
}
