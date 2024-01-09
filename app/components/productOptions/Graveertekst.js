"use client";

import { useState, useEffect, useRef } from "react";

import InputSelect from "../InputSelect";
import InputTextField from "../InputTextField";
import InputDate from "../InputDate";
import InputImageSwatchLarge from "../InputImageSwatchLarge";

import { graveerTekstOptions, lettertypeOptions } from "./optionSets";

export default function GraveerTekst({
  value,
  onChange,
  setOptionErrors,
  showErrors,
}) {
  const [error, setError] = useState([]);
  useEffect(() => {
    if (Array.isArray(value)) {
      const graveerTekstValue = value.find(
        (item) => item.key === "graveerTekst"
      ).value;
      const lettertypeValue = value.find(
        (item) => item.key === "lettertype"
      ).value;
      const initialenValue = value.find(
        (item) => item.key === "initialen"
      ).value;
      const datumValue = value.find((item) => item.key === "datum").value;
      const naamValue = value.find((item) => item.key === "naam").value;
      const woord1Value = value.find((item) => item.key === "1 woord").value;
      const woord2Value = value.find((item) => item.key === "2 woorden").value;
      const woord3Value = value.find((item) => item.key === "3 woorden").value;
      const woord4Value = value.find((item) => item.key === "4 woorden").value;

      switch (graveerTekstValue) {
        case "Initialen/letters/tekens":
          if (initialenValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["initialen"]: "Veld initiaal mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["initialen"]: "",
            }));
          }
          if (lettertypeValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "",
            }));
          }
          break;
        case "Geen tekst":
        case "Hartje ♥ symbool":
        case "Infinity ∞ teken":
          setError((prevState) => ({
            ...prevState,
            ["graveerTekst"]: "",
          }));
          break;
        case "Datum":
          if (datumValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["datum"]: "Veld datum mag niet leeg zijn",
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
              ["lettertype"]: "Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "",
            }));
          }
          break;
        case "Naam":
          if (naamValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["naam"]: "Veld naam mag niet leeg zijn",
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
              ["lettertype"]: "Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "",
            }));
          }
          break;
        case "Naam en datum":
          if (naamValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["naam"]: "Veld naam mag niet leeg zijn",
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
              ["datum"]: "Veld datum mag niet leeg zijn",
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
              ["lettertype"]: "Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "",
            }));
          }
        case "1 woord":
          if (woord1Value == "") {
            setError((prevState) => ({
              ...prevState,
              ["woord1"]: "Dit veld mag niet leeg zijn",
            }));
          } else if (woord1Value.includes(" ")) {
            setError((prevState) => ({
              ...prevState,
              ["woord1"]: "Dit veld mag geen spatie bevatten",
            }));
          } else if (woord1Value.length > 11) {
            setError((prevState) => ({
              ...prevState,
              ["woord1"]: "Gebruik maximaal 11 karakters",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["woord1"]: "",
            }));
          }
          if (lettertypeValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "",
            }));
          }
          break;
        case "2 woorden":
          if (woord2Value == "") {
            setError((prevState) => ({
              ...prevState,
              ["woord2"]: "Veld woord 2 mag niet leeg zijn",
            }));
          } else if (woord2Value.length > 18) {
            setError((prevState) => ({
              ...prevState,
              ["woord2"]: "Gebruik maximaal 18 karakters",
            }));
          } else if (woord2Value.split(" ").length > 2) {
            setError((prevState) => ({
              ...prevState,
              ["woord2"]: "Dit veld mag niet meer dan één spatie bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["woord2"]: "",
            }));
          }
          if (lettertypeValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "",
            }));
          }
          break;
        case "3 woorden":
          if (woord3Value == "") {
            setError((prevState) => ({
              ...prevState,
              ["woord3"]: "Veld woord 3 mag niet leeg zijn",
            }));
          } else if (woord3Value.length > 24) {
            setError((prevState) => ({
              ...prevState,
              ["woord3"]: "Gebruik maximaal 24 karakters",
            }));
          } else if (woord3Value.split(" ").length > 3) {
            setError((prevState) => ({
              ...prevState,
              ["woord3"]: "Dit veld mag niet meer dan twee spaties bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["woord3"]: "",
            }));
          }
          if (lettertypeValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "",
            }));
          }
          break;
        case "4 woorden":
          if (woord4Value == "") {
            setError((prevState) => ({
              ...prevState,
              ["woord4"]: "Veld woord 4 mag niet leeg zijn",
            }));
          } else if (woord4Value.length > 30) {
            setError((prevState) => ({
              ...prevState,
              ["woord4"]: "Gebruik maximaal 30 karakters",
            }));
          } else if (woord4Value.split(" ").length > 3) {
            setError((prevState) => ({
              ...prevState,
              ["woord4"]: "Dit veld mag niet meer dan drie spatie bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["woord4"]: "",
            }));
          }
          if (lettertypeValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["lettertype"]: "",
            }));
          }
          break;

        default:
          if (graveerTekstValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["graveerTekst"]: "Veld mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["graveerTekst"]: "",
            }));
          }
      }

      if (
        graveerTekstValue == "Geen tekst" ||
        graveerTekstValue == "Initialen/letters/tekens" ||
        graveerTekstValue == "Hartje ♥ symbool" ||
        graveerTekstValue == "Infinity ∞ teken" ||
        graveerTekstValue == "Naam en datum" ||
        graveerTekstValue == "Naam" ||
        graveerTekstValue == "Datum" ||
        graveerTekstValue == "1 woord" ||
        graveerTekstValue == "2 woorden" ||
        graveerTekstValue == "3 woorden" ||
        graveerTekstValue == "4 woorden"
      ) {
        setError((prevState) => ({
          ...prevState,
          ["graveerTekst"]: "",
        }));
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
        ["graveerTekst"]: false,
      }));
    } else {
      setOptionErrors((prevState) => ({
        ...prevState,
        ["graveerTekst"]: true,
      }));
    }
  }, [error]);

  const [values, setValues] = useState([
    {
      key: "graveerTekst",
      value: value?.graveerTekst?.value || "",
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
  const graveerTekstValue = values.find(
    (item) => item.key === "graveerTekst"
  ).value;

  return (
    <>
      <div className="relative">
        {showErrors && (
          <p className="absolute  -bottom-6 left-0 text-red-700">
            {error["graveerTekst"]}
          </p>
        )}
        <InputSelect
          value={graveerTekstValue}
          onChange={(newTekstValue) =>
            handleChange("graveerTekst", newTekstValue)
          }
          title="Graveertekst:"
          options={graveerTekstOptions[0].graveerTekst}
        />
      </div>

      {graveerTekstValue == "Initialen/letters/tekens" && (
        <div className="relative">
          {showErrors && (
            <p className="absolute  -bottom-6 left-0 text-red-700">
              {error["initiaal"]}
            </p>
          )}
          <InputTextField
            value={values.find((item) => item.key === "initialen")?.value || ""}
            onChange={(newInitialenValue) =>
              handleChange("initialen", newInitialenValue)
            }
            title="Initialen/letters/tekens:"
          />
        </div>
      )}
      {(graveerTekstValue == "Datum" ||
        graveerTekstValue == "Naam en datum") && (
        <div className="relative">
          {showErrors && (
            <p className="absolute  -bottom-6 left-0 text-red-700">
              {error["datum"]}
            </p>
          )}
          <InputDate
            value={values.find((item) => item.key === "datum")?.value || ""}
            onChange={(newDateValue) => handleChange("datum", newDateValue)}
            title="Datum:"
          />
        </div>
      )}
      {(graveerTekstValue == "Naam" ||
        graveerTekstValue == "Naam en datum") && (
        <div className="relative">
          {showErrors && (
            <p className="absolute  -bottom-6 left-0 text-red-700">
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
      {graveerTekstValue == "1 woord" && (
        <div className="relative">
          {showErrors && (
            <p className="absolute  -bottom-6 left-0 text-red-700">
              {error["woord1"]}
            </p>
          )}
          <InputTextField
            value={values.find((item) => item.key === "1 woord")?.value || ""}
            onChange={(new1WoordValue) =>
              handleChange("1 woord", new1WoordValue)
            }
            title="1 Woord:"
          />
        </div>
      )}
      {graveerTekstValue == "2 woorden" && (
        <div className="relative">
          {showErrors && (
            <p className="absolute  -bottom-6 left-0 text-red-700">
              {error["woord2"]}
            </p>
          )}
          <InputTextField
            value={values.find((item) => item.key === "2 woorden")?.value || ""}
            onChange={(new2WoordenValue) =>
              handleChange("2 woorden", new2WoordenValue)
            }
            title="2 Woorden:"
          />
        </div>
      )}
      {graveerTekstValue == "3 woorden" && (
        <div className="relative">
          {showErrors && (
            <p className="absolute  -bottom-6 left-0 text-red-700">
              {error["woord3"]}
            </p>
          )}
          <InputTextField
            value={values.find((item) => item.key === "3 woorden")?.value || ""}
            onChange={(new3WoordenValue) =>
              handleChange("3 woorden", new3WoordenValue)
            }
            title="3 Woorden:"
          />
        </div>
      )}
      {graveerTekstValue == "4 woorden" && (
        <div className="relative">
          {showErrors && (
            <p className="absolute  -bottom-6 left-0 text-red-700">
              {error["woord4"]}
            </p>
          )}
          <InputTextField
            value={values.find((item) => item.key === "4 woorden")?.value || ""}
            onChange={(new4WoordenValue) =>
              handleChange("4 woorden", new4WoordenValue)
            }
            title="4 Woorden:"
          />
        </div>
      )}
      {(graveerTekstValue == "Initialen/letters/tekens" ||
        graveerTekstValue == "Naam" ||
        graveerTekstValue == "Datum" ||
        graveerTekstValue == "Naam en datum" ||
        graveerTekstValue == "1 woord" ||
        graveerTekstValue == "2 woorden" ||
        graveerTekstValue == "3 woorden" ||
        graveerTekstValue == "4 woorden") && (
        <div className="relative">
          {showErrors && (
            <p className="absolute  -bottom-6 left-0 text-red-700">
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
