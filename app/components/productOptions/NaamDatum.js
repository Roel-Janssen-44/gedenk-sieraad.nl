"use client";

import { useState, useEffect, useRef } from "react";

import InputSelect from "../InputSelect";
import InputRadio from "../InputRadio";
import InputFile from "../InputFile";
import InputTextField from "../InputTextField";
import InputImageSwatchLarge from "../InputImageSwatchLarge";

import { naamDatumOptions, lettertypeOptions } from "./optionSets";
import InputDate from "../InputDate";

export default function NaamDatum({
  value,
  onChange,
  setOptionErrors,
  showErrors,
}) {
  const [error, setError] = useState([]);

  useEffect(() => {
    if (Array.isArray(value)) {
      const graveerTekstAchterzijde = value.find(
        (item) => item.key === "graveerTekstAchterzijde"
      ).value;
      const naamValue = value.find((item) => item.key === "naam").value;
      const datumValue = value.find((item) => item.key === "datum").value;
      const lettertypeValue = value.find(
        (item) => item.key === "lettertype"
      ).value;

      switch (graveerTekstAchterzijde) {
        case "Geen":
          setError([]);
          setOptionErrors((prevState) => ({
            ...prevState,
            ["naamdatum"]: false,
          }));
          break;
        case "Naam":
          if (naamValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["naam"]: "* Vul een naam in",
            }));
          } else if (naamValue.length > 14) {
            setError((prevState) => ({
              ...prevState,
              ["naam"]: "* Vul maximaal 14 karakters in",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["naam"]: "",
            }));
          }
          if (lettertypeValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "* Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "",
            }));
          }
        case "Datum":
          if (datumValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["datum"]: "* Vul een datum in",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["datum"]: "",
            }));
          }
          if (lettertypeValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "* Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "",
            }));
          }
        case "Naam + datum":
          if (naamValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["naam"]: "* Vul een naam in",
            }));
          } else if (naamValue.length > 14) {
            setError((prevState) => ({
              ...prevState,
              ["naam"]: "* Vul maximaal 14 karakters in",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["naam"]: "",
            }));
          }
          if (datumValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["datum"]: "* Vul een datum in",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["datum"]: "",
            }));
          }
          if (lettertypeValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "* Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "",
            }));
          }
        default:
          if (graveerTekstAchterzijde == "") {
            setError((prevState) => ({
              ...prevState,
              ["graveerTekstAchterzijde"]: "* Kies een optie",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["graveerTekstAchterzijde"]: "",
            }));
          }
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    const allValuescorrect = Object.values(error).every(
      (value) => value === ""
    );
    if (allValuescorrect) {
      setOptionErrors((prevState) => ({
        ...prevState,
        ["naamdatum"]: false,
      }));
    } else {
      setOptionErrors((prevState) => ({
        ...prevState,
        ["naamdatum"]: true,
      }));
    }
  }, [error]);

  const [values, setValues] = useState([
    {
      key: "graveerTekstAchterzijde",
      value: value?.graveerTekstAchterzijde?.value || "",
    },
    { key: "naam", value: value?.naam?.value || "" },
    { key: "datum", value: value?.datum?.value || "" },
    { key: "lettertype", value: value?.lettertype?.value || "" },
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

  const graveerTekstAchterzijdeTekst = values.find(
    (item) => item.key === "graveerTekstAchterzijde"
  ).value;

  return (
    <>
      <div className="relative">
        {showErrors && (
          <p className="absolute -bottom-6 left-0 text-red-700">
            {error["graveerTekstAchterzijde"]}
          </p>
        )}

        <InputSelect
          value={
            values.find((item) => item.key === "graveerTekstAchterzijde")
              ?.value || ""
          }
          onChange={(newGraveerTekstValue) =>
            handleChange("graveerTekstAchterzijde", newGraveerTekstValue)
          }
          title="Graveertekst achterzijde:"
          options={naamDatumOptions}
        />
      </div>
      {(graveerTekstAchterzijdeTekst === "Naam" ||
        graveerTekstAchterzijdeTekst === "Naam + datum") && (
        <div className="relative">
          {showErrors && (
            <p className="absolute -bottom-6 left-0 text-red-700">
              {error["naam"]}
            </p>
          )}
          <InputTextField
            value={values.find((item) => item.key === "naam")?.value || ""}
            onChange={(newNaamValue) => handleChange("naam", newNaamValue)}
            title="Naam:"
          />
        </div>
      )}
      {(graveerTekstAchterzijdeTekst === "Datum" ||
        graveerTekstAchterzijdeTekst === "Naam + datum") && (
        <div className="relative">
          {showErrors && (
            <p className="absolute -bottom-6 left-0 text-red-700">
              {error["datum"]}
            </p>
          )}
          <InputDate
            onChange={(newDatumValue) => handleChange("datum", newDatumValue)}
            title="Datum:"
          />
        </div>
      )}
      {graveerTekstAchterzijdeTekst != "Geen" &&
        graveerTekstAchterzijdeTekst != "" && (
          <div className="relative">
            {showErrors && (
              <p className="absolute -bottom-6 left-0 text-red-700">
                {error["lettertype"]}
              </p>
            )}
            <InputImageSwatchLarge
              value={
                values.find((item) => item.key === "lettertype")?.value || ""
              }
              onChange={(newLettertypeValue) =>
                handleChange("lettertype", newLettertypeValue)
              }
              title="Lettertype:"
              options={lettertypeOptions}
            />
          </div>
        )}
    </>
  );
}