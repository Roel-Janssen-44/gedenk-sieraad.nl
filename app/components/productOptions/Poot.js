"use client";

import { useState, useEffect, useRef } from "react";

import InputSelect from "../InputSelect";
import InputRadio from "../InputRadio";
import InputFile from "../InputFile";
import InputTextField from "../InputTextField";
import InputImageSwatchLarge from "../InputImageSwatchLarge";

import { pootOptions } from "./optionSets";
import InputDate from "../InputDate";

export default function Poot({ value, onChange, setOptionErrors, showErrors }) {
  const [error, setError] = useState([]);

  useEffect(() => {
    if (Array.isArray(value)) {
      const poot = value.find((item) => item.key === "poot").value;
      const keuze2Value = value.find((item) => item.key === "keuze2").value;
      const uploadValue = value.find((item) => item.key === "upload").value;

      switch (poot) {
        case "Standaard pootafdruk":
          setError([]);
          setOptionErrors((prevState) => ({
            ...prevState,
            ["poot"]: false,
          }));
          break;
        case "Eigen pootafdruk":
          if (keuze2Value == "") {
            setError((prevState) => ({
              ...prevState,
              ["keuze2"]: "* Kies een optie",
            }));
          } else if (
            keuze2Value ==
            "Ik heb al een digitaal bestand van vinger/voet/hand/pootafdruk of gravure en wil dit nu uploaden"
          ) {
            if (uploadValue == null) {
              setError((prevState) => ({
                ...prevState,
                ["upload"]: "* Upload een bestand",
              }));
            } else {
              setError((prevState) => ({
                ...prevState,
                ["upload"]: "",
              }));
            }
          } else {
            setError((prevState) => ({
              ...prevState,
              ["keuze2"]: "",
            }));
          }
        default:
          if (poot == "") {
            setError((prevState) => ({
              ...prevState,
              ["poot"]: "* Kies een optie",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["poot"]: "",
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
      key: "poot",
      value: value?.poot?.value || "",
    },
    { key: "keuze2", value: value?.keuze2?.value || "" },
    { key: "upload", value: value?.upload?.value || "" },
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

  const pootKeuze = values.find((item) => item.key === "poot").value;
  const pootKeuze2 = values.find((item) => item.key === "keuze2").value;

  // console.log("errors poot");
  // console.log(error);
  return (
    <>
      <div className="relative">
        {showErrors && (
          <p className="absolute -bottom-6 left-0 text-red-700">
            {error["poot"]}
          </p>
        )}

        <InputRadio
          value={values.find((item) => item.key === "poot")?.value || ""}
          onChange={(newPootTekstValue) =>
            handleChange("poot", newPootTekstValue)
          }
          title="Poot:"
          options={pootOptions[0].option1}
        />
      </div>
      {pootKeuze === "Eigen pootafdruk" && (
        <div className="relative">
          {showErrors && (
            <p className="absolute -bottom-6 left-0 text-red-700">
              {error["keuze2"]}
            </p>
          )}
          <InputRadio
            value={values.find((item) => item.key === "keuze2")?.value || ""}
            onChange={(newKeuze2Value) =>
              handleChange("keuze2", newKeuze2Value)
            }
            title="Maak een keuze:"
            options={pootOptions[1].option2}
          />
        </div>
      )}
      {pootKeuze == "Eigen pootafdruk" &&
        pootKeuze2 ===
          "Ik heb al een digitaal bestand van vinger/voet/hand/pootafdruk of gravure en wil dit nu uploaden" && (
          <div className="relative">
            {showErrors && (
              <p className="absolute -bottom-6 left-0 text-red-700">
                {error["upload"]}
              </p>
            )}
            <InputFile
              onChange={(newUploadValue) =>
                handleChange("upload", newUploadValue)
              }
              title="Upload:"
              setError={setError}
            />
          </div>
        )}
    </>
  );
}
