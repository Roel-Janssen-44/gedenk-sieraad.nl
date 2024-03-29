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
        (item) => item.key === "vppakketKeuze"
      ).value;
      const uploadValue = value.find(
        (item) => item.key === "vppakketUpload"
      ).value;

      if (
        (keuzeValue != "" && uploadValue != "") ||
        keuzeValue ===
          "Ik wil eerst een gratis vingerafdrukpakket ontvangen." ||
        keuzeValue ===
          "Ik wil eerst een gratis hand/voet/pootafdrukpakket ontvangen."
      ) {
        setError([]);
        setOptionErrors((prevState) => ({
          ...prevState,
          ["vppakketup"]: false,
        }));
      } else {
        setOptionErrors((prevState) => ({
          ...prevState,
          ["vppakketup"]: true,
        }));
        if (keuzeValue == "") {
          setError((prevState) => ({
            ...prevState,
            ["vppakketKeuze"]: "* Kies een optie",
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            ["vppakketKeuze"]: "",
          }));
        }
        if (uploadValue == "") {
          setError((prevState) => ({
            ...prevState,
            ["vppakketUpload"]: "* Upload een bestand",
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            ["vppakketUpload"]: "",
          }));
        }
      }
    }
  }, [value]);

  const [values, setValues] = useState([
    { key: "vppakketKeuze", value: value?.vppakketKeuze?.value || "" },
    { key: "vppakketUpload", value: value?.vppakketUpload?.value || "" },
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
    (item) => item.key === "vppakketKeuze"
  ).value;

  return (
    <>
      <div className="relative">
        {showErrors && (
          <p className="absolute  -bottom-6 left-0 text-red-700">
            {error["vppakketKeuze"]}
          </p>
        )}
        <InputRadio
          value={
            values.find((item) => item.key === "vppakketKeuze")?.value || ""
          }
          onChange={(uploadValue) => handleChange("vppakketKeuze", uploadValue)}
          title="Maak een keuze:"
          options={vppakketKeuzeOptions}
        />
      </div>
      {vppakketKeuzeTekst ===
        "Ik heb al een vingerafdruk/gravure en wil nu een bestand uploaden" && (
        <div className="relative">
          {showErrors && (
            <p className="absolute  -bottom-6 left-0 text-red-700">
              {" "}
              {error["vppakketUpload"]}
            </p>
          )}
          <InputFile
            setError={setError}
            title="Bestand toevoegen:"
            onChange={handleChange}
            value={value}
          />
        </div>
      )}
    </>
  );
}
