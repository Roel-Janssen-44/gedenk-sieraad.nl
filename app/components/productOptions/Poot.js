"use client";

import { useState, useEffect, useRef } from "react";

import InputSelect from "../InputSelect";
import InputRadio from "../InputRadio";
import InputFile from "../InputFile";
import InputTextField from "../InputTextField";
import InputImageSwatchLarge from "../InputImageSwatchLarge";

import { pootKeuze1Options, pootKeuze2Options } from "./optionSets";

export default function Poot({ value, onChange, setOptionErrors, showErrors }) {
  const [error, setError] = useState([]);

  useEffect(() => {
    if (Array.isArray(value)) {
      const poot = value.find((item) => item.key === "Poot").value;
      const keuze2Value = value.find((item) => item.key === "Keuze2").value;
      const uploadValue = value.find((item) => item.key === "Upload").value;

      switch (poot) {
        case "Standaard pootafdruk":
          setError([]);
          setOptionErrors((prevState) => ({
            ...prevState,
            ["Poot"]: false,
          }));
          break;
        case "Eigen pootafdruk":
          if (keuze2Value == "") {
            setError((prevState) => ({
              ...prevState,
              ["Keuze2"]: "* Kies een optie",
            }));
          } else if (
            keuze2Value ==
            "Ik heb al een digitaal bestand van vinger/voet/hand/pootafdruk of gravure en wil dit nu uploaden"
          ) {
            if (uploadValue == null) {
              setError((prevState) => ({
                ...prevState,
                ["Upload"]: "* Upload een bestand",
              }));
            } else {
              setError((prevState) => ({
                ...prevState,
                ["Upload"]: "",
              }));
            }
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Keuze2"]: "",
            }));
          }
        default:
          if (poot == "") {
            setError((prevState) => ({
              ...prevState,
              ["Poot"]: "* Kies een optie",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["Poot"]: "",
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
        ["Poot"]: false,
      }));
    } else {
      setOptionErrors((prevState) => ({
        ...prevState,
        ["Poot"]: true,
      }));
    }
  }, [error]);

  const [values, setValues] = useState([
    {
      key: "Poot",
      value: value?.poot?.value || "",
    },
    { key: "Keuze2", value: value?.keuze2?.value || "" },
    { key: "Upload", value: value?.upload?.value || "" },
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

  const pootKeuze = values.find((item) => item.key === "Poot").value;
  const pootKeuze2 = values.find((item) => item.key === "Keuze2").value;

  return (
    <>
      <div className="relative">
        {showErrors && (
          <p className="absolute -bottom-6 left-0 text-red-700">
            {error["Poot"]}
          </p>
        )}

        <InputRadio
          value={values.find((item) => item.key === "Poot")?.value || ""}
          onChange={(newPootTekstValue) =>
            handleChange("Poot", newPootTekstValue)
          }
          title="Poot:"
          options={pootKeuze1Options}
        />
      </div>
      {pootKeuze === "Eigen pootafdruk" && (
        <div className="relative">
          {showErrors && (
            <p className="absolute -bottom-6 left-0 text-red-700">
              {error["Keuze2"]}
            </p>
          )}
          <InputRadio
            value={values.find((item) => item.key === "Keuze2")?.value || ""}
            onChange={(newKeuze2Value) =>
              handleChange("Keuze2", newKeuze2Value)
            }
            title="Maak een keuze:"
            options={pootKeuze2Options}
          />
        </div>
      )}
      {pootKeuze == "Eigen pootafdruk" &&
        pootKeuze2 ===
          "Ik heb al een digitaal bestand van een pootafdruk en wil dit nu uploaden" && (
          <div className="relative">
            {showErrors && (
              <p className="absolute -bottom-6 left-0 text-red-700">
                {error["Upload"]}
              </p>
            )}
            <InputFile
              onChange={(newUploadValue) =>
                handleChange("Upload", newUploadValue)
              }
              title="Bestand toevoegen:"
              setError={setError}
            />
          </div>
        )}
    </>
  );
}
