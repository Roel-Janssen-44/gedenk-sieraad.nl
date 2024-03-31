"use client";

import { useState, useEffect, useRef } from "react";

import InputSelect from "../InputSelect";
import InputRadio from "../InputRadio";
import InputFile from "../InputFile";
import InputTextField from "../InputTextField";
import InputImageSwatchLarge from "../InputImageSwatchLarge";

import {
  naamDatumOptions,
  lettertypeOptions,
  voorvoegselOptions,
} from "./optionSets";
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
        (item) => item.key === "Naamdatum"
      ).value;
      const voorvoegselValue = value.find(
        (item) => item.key === "voorvoegsel"
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
            ["Naamdatum"]: false,
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
          if (voorvoegselValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["voorvoegsel"]: "* Maak een keuze",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["voorvoegsel"]: "",
            }));
          }

          setError((prevState) => ({
            ...prevState,
            ["datum"]: "",
          }));

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
          if (voorvoegselValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["voorvoegsel"]: "* Maak een keuze",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["voorvoegsel"]: "",
            }));
          }

          setError((prevState) => ({
            ...prevState,
            ["naam"]: "",
          }));
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
          if (voorvoegselValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["voorvoegsel"]: "* Maak een keuze",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["voorvoegsel"]: "",
            }));
          }
        default:
          if (graveerTekstAchterzijde == "") {
            setError((prevState) => ({
              ...prevState,
              ["Naamdatum"]: "* Kies een optie",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Naamdatum"]: "",
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
        ["Naamdatum"]: false,
      }));
    } else {
      setOptionErrors((prevState) => ({
        ...prevState,
        ["Naamdatum"]: true,
      }));
    }
  }, [error]);

  const [values, setValues] = useState([
    {
      key: "Naamdatum",
      value: value?.graveerTekstAchterzijde?.value || "",
    },
    { key: "naam", value: value?.naam?.value || "" },
    { key: "datum", value: value?.datum?.value || "" },
    { key: "lettertype", value: value?.lettertype?.value || "" },
    { key: "voorvoegsel", value: value?.voorvoegsel?.value || "" },
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
    (item) => item.key === "Naamdatum"
  ).value;

  return (
    <>
      <div className="relative">
        {showErrors && (
          <p className="absolute -bottom-6 left-0 text-red-700">
            {error["Naamdatum"]}
          </p>
        )}

        <InputSelect
          value={values.find((item) => item.key === "Naamdatum")?.value || ""}
          onChange={(newGraveerTekstValue) =>
            handleChange("Naamdatum", newGraveerTekstValue)
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
          <>
            <div className="relative">
              {showErrors && (
                <p className="absolute -bottom-6 left-0 text-red-700">
                  {error["voorvoegsel"]}
                </p>
              )}
              <InputSelect
                value={
                  values.find((item) => item.key === "voorvoegsel")?.value || ""
                }
                onChange={(newVoorvoegselValue) =>
                  handleChange("voorvoegsel", newVoorvoegselValue)
                }
                title="Graveertekst voorvoegsel:"
                options={voorvoegselOptions}
              />
            </div>
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
          </>
        )}
    </>
  );
}
