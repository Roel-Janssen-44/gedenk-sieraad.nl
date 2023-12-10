import { useState, useEffect, useRef } from "react";

import InputSelect from "../InputSelect";
import InputRadio from "../InputRadio";
import InputTextField from "../InputTextField";
import InputDate from "../InputDate";
import InputImageSwatchLarge from "../InputImageSwatchLarge";

import { tekstBinnenZijdeRingOptions, lettertypeOptions } from "./optionSets";

export default function Tekst({ value, onChange }) {
  const [values, setValues] = useState([
    {
      key: "tekstBinnenZijdeRing",
      value: value?.tekstBinnenZijdeRing?.value || "",
    },
    { key: "lettertype", value: value?.naam?.value || "" },
    { key: "initialen", value: value?.naam?.value || "" },
    { key: "datum", value: value?.naam?.value || "" },
    { key: "naam", value: value?.naam?.value || "" },
    { key: "1 woord", value: value?.naam?.value || "" },
    { key: "2 woorden", value: value?.naam?.value || "" },
    { key: "3 woorden", value: value?.naam?.value || "" },
    { key: "4 woorden", value: value?.naam?.value || "" },
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
  const tekstBinnenZijdeRingValue = values.find(
    (item) => item.key === "tekstBinnenZijdeRing"
  ).value;

  return (
    <>
      <InputSelect
        value={tekstBinnenZijdeRingValue}
        onChange={(newHarsValue) =>
          handleChange("tekstBinnenZijdeRing", newHarsValue)
        }
        title="Tekst binnenzijde ring:"
        options={tekstBinnenZijdeRingOptions}
      />
      {(tekstBinnenZijdeRingValue == "Initialen/letters/tekens" ||
        tekstBinnenZijdeRingValue == "Naam" ||
        tekstBinnenZijdeRingValue == "Naam en datum" ||
        tekstBinnenZijdeRingValue == "1 woord" ||
        tekstBinnenZijdeRingValue == "2 woorden" ||
        tekstBinnenZijdeRingValue == "3 woorden" ||
        tekstBinnenZijdeRingValue == "4 woorden") && (
        <InputImageSwatchLarge
          value={values.find((item) => item.key === "lettertype")?.value || ""}
          onChange={(newLettertypeValue) =>
            handleChange("lettertype", newLettertypeValue)
          }
          title="Lettertype:"
          options={lettertypeOptions}
        />
      )}
      {tekstBinnenZijdeRingValue == "Initialen/letters/tekens" && (
        <InputTextField
          value={values.find((item) => item.key === "initialen")?.value || ""}
          onChange={(newInitialenValue) =>
            handleChange("initialen", newInitialenValue)
          }
          title="Initialen/letters/tekens:"
        />
      )}
      {(tekstBinnenZijdeRingValue == "Datum" ||
        tekstBinnenZijdeRingValue == "Naam en datum") && (
        <InputDate
          value={values.find((item) => item.key === "datum")?.value || ""}
          onChange={(newDateValue) => handleChange("datum", newDateValue)}
          title="Datum:"
        />
      )}
      {(tekstBinnenZijdeRingValue == "Naam" ||
        tekstBinnenZijdeRingValue == "Naam en datum") && (
        <InputTextField
          value={values.find((item) => item.key === "naam")?.value || ""}
          onChange={(newNaamValue) => handleChange("naam", newNaamValue)}
          title="Naam:"
        />
      )}
      {(tekstBinnenZijdeRingValue == "1 woord" ||
        tekstBinnenZijdeRingValue == "2 woorden" ||
        tekstBinnenZijdeRingValue == "3 woorden" ||
        tekstBinnenZijdeRingValue == "4 woorden") && (
        <InputTextField
          value={values.find((item) => item.key === "1 woord")?.value || ""}
          onChange={(new1WoordValue) => handleChange("1 woord", new1WoordValue)}
          title="1 Woord:"
        />
      )}
      {(tekstBinnenZijdeRingValue == "2 woorden" ||
        tekstBinnenZijdeRingValue == "3 woorden" ||
        tekstBinnenZijdeRingValue == "4 woorden") && (
        <InputTextField
          value={values.find((item) => item.key === "2 woorden")?.value || ""}
          onChange={(new2WoordenValue) =>
            handleChange("2 woorden", new2WoordenValue)
          }
          title="2 Woorden:"
        />
      )}
      {(tekstBinnenZijdeRingValue == "3 woorden" ||
        tekstBinnenZijdeRingValue == "4 woorden") && (
        <InputTextField
          value={values.find((item) => item.key === "3 woorden")?.value || ""}
          onChange={(new3WoordenValue) =>
            handleChange("3 woorden", new3WoordenValue)
          }
          title="3 Woorden:"
        />
      )}
      {tekstBinnenZijdeRingValue == "4 woorden" && (
        <InputTextField
          value={values.find((item) => item.key === "4 woorden")?.value || ""}
          onChange={(new4WoordenValue) =>
            handleChange("4 woorden", new4WoordenValue)
          }
          title="4 Woorden:"
        />
      )}
    </>
  );
}
