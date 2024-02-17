"use client";

import { useState, useEffect, useRef } from "react";

import InputSelect from "../InputSelect";
import InputRadio from "../InputRadio";
import InputFile from "../InputFile";
import InputTextField from "../InputTextField";
import InputImageSwatchLarge from "../InputImageSwatchLarge";
import InputDate from "../InputDate";

import {
  printKeuze1Options,
  printKeuze2Options,
  printKeuze3Options,
} from "./optionSets";

export default function Print({
  value,
  onChange,
  setOptionErrors,
  showErrors,
}) {
  const [error, setError] = useState([]);

  useEffect(() => {
    if (Array.isArray(value)) {
      const keuze1Value = value.find((item) => item.key === "keuze1").value;
      const keuze2Value = value.find((item) => item.key === "keuze2").value;
      const upload1Value = value.find((item) => item.key === "upload1").value;
      const upload2Value = value.find((item) => item.key === "upload2").value;
      const keuze3Value = value.find((item) => item.key === "keuze3").value;

      switch (keuze1Value) {
        case "Ik heb al een digitaal bestand van vinger/voet/hand/pootafdruk of gravure en wil dit nu uploaden":
          setError((prevState) => ({
            ...prevState,
            ["keuze3"]: "",
          }));
          if (keuze2Value == "") {
            setError((prevState) => ({
              ...prevState,
              ["keuze2"]: "* Maak een keuze",
            }));
          } else if (keuze2Value == "Ja") {
            if (upload2Value == null) {
              setError((prevState) => ({
                ...prevState,
                ["upload2"]: "* Upload een bestand",
              }));
            } else {
              setError((prevState) => ({
                ...prevState,
                ["upload2"]: "",
              }));
            }
          } else {
            setError((prevState) => ({
              ...prevState,
              ["keuze2"]: "",
            }));
          }
          if (upload1Value == null) {
            setError((prevState) => ({
              ...prevState,
              ["upload1"]: "* Upload een bestand",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["upload1"]: "",
            }));
          }
          break;
        case "Ik wil eerst een gratis vingerafdrukpakket ontvangen.(selecteer dan ook bij gravure: vingerafdruk)":
        case "Ik wil eerst een gratis hand/voet/pootafdrukpakket ontvangen.(selecteer dan ook bij gravure: hand/voetafdruk of pootafdruk)":
          setError((prevState) => ({
            ...prevState,
            ["keuze2"]: "",
            ["upload1"]: "",
            ["upload2"]: "",
          }));
          if (keuze3Value == "") {
            setError((prevState) => ({
              ...prevState,
              ["keuze3"]: "* Maak een keuze",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["keuze3"]: "",
            }));
          }
          break;
        default:
          break;
      }
      if (keuze1Value == "") {
        setError((prevState) => ({
          ...prevState,
          ["keuze1"]: "* Kies een optie",
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          ["keuze1"]: "",
        }));
      }
    }
  }, [value]);

  console.log("errors");
  console.log(error);

  useEffect(() => {
    const allValuescorrect = Object.values(error).every(
      (value) => value === ""
    );
    if (allValuescorrect) {
      setOptionErrors((prevState) => ({
        ...prevState,
        ["print"]: false,
      }));
    } else {
      setOptionErrors((prevState) => ({
        ...prevState,
        ["print"]: true,
      }));
    }
  }, [error]);

  const [values, setValues] = useState([
    {
      key: "keuze1",
      value: value?.print?.value || "",
    },
    { key: "keuze2", value: value?.keuze2?.value || "" },
    { key: "upload1", value: value?.upload1?.value || "" },
    { key: "upload2", value: value?.upload2?.value || "" },
    { key: "keuze3", value: value?.keuze3?.value || "" },
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

  const printKeuze = values.find((item) => item.key === "keuze1").value;
  const printKeuze2 = values.find((item) => item.key === "keuze2").value;

  return (
    <>
      <div className="relative">
        {showErrors && (
          <p className="absolute -bottom-6 left-0 text-red-700">
            {error["keuze1"]}
          </p>
        )}

        <InputRadio
          value={values.find((item) => item.key === "keuze1")?.value || ""}
          onChange={(newKeuze1TekstValue) =>
            handleChange("keuze1", newKeuze1TekstValue)
          }
          title="Print:"
          options={printKeuze1Options}
        />
      </div>
      {printKeuze ===
        "Ik heb al een digitaal bestand van vinger/voet/hand/pootafdruk of gravure en wil dit nu uploaden" && (
        <>
          <div className="relative">
            {showErrors && (
              <p className="absolute -bottom-6 left-0 text-red-700">
                {error["keuze2"]}
              </p>
            )}
            <InputSelect
              value={values.find((item) => item.key === "keuze2")?.value || ""}
              onChange={(newKeuze2Value) =>
                handleChange("keuze2", newKeuze2Value)
              }
              title="Tweede bestand uploaden:"
              options={printKeuze2Options}
            />
          </div>
          <div className="relative">
            {showErrors && (
              <p className="absolute -bottom-6 left-0 text-red-700">
                {error["upload1"]}
              </p>
            )}
            <InputFile
              value={values.find((item) => item.key === "upload1")?.value || ""}
              onChange={(newUpload1Value) =>
                handleChange("upload1", newUpload1Value)
              }
              title="Bestand 1:"
              options={printKeuze2Options}
              setError={setError}
            />
          </div>
          {printKeuze2 == "Ja" && (
            <div className="relative">
              {showErrors && (
                <p className="absolute -bottom-6 left-0 text-red-700">
                  {error["upload2"]}
                </p>
              )}
              <InputFile
                value={
                  values.find((item) => item.key === "upload2")?.value || ""
                }
                onChange={(newUpload2Value) =>
                  handleChange("upload2", newUpload2Value)
                }
                title="Bestand 2:"
                options={printKeuze2Options}
                setError={setError}
              />
            </div>
          )}
        </>
      )}

      {printKeuze !=
        "Ik heb al een digitaal bestand van vinger/voet/hand/pootafdruk of gravure en wil dit nu uploaden" &&
        printKeuze != "" && (
          <div className="relative">
            {showErrors && (
              <p className="absolute -bottom-6 left-0 text-red-700">
                {error["keuze3"]}
              </p>
            )}
            <InputSelect
              value={values.find((item) => item.key === "keuze3")?.value || ""}
              onChange={(newKeuze3Value) =>
                handleChange("keuze3", newKeuze3Value)
              }
              title="Aantal bestanden:"
              options={printKeuze3Options}
            />
          </div>
        )}
    </>
  );
}
