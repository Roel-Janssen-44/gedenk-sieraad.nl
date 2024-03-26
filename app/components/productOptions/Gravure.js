"use client";

import { useState, useEffect, useRef } from "react";

import InputFile from "../InputFile";
import InputSelect from "../InputSelect";
import InputTextField from "../InputTextField";
import InputDate from "../InputDate";
import InputImageSwatchLarge from "../InputImageSwatchLarge";

import {
  gravureOptions,
  extraWoordenOptions,
  lettertypeOptions,
} from "./optionSets";

export default function Gravure({
  value,
  onChange,
  setOptionErrors,
  showErrors,
}) {
  const [error, setError] = useState([]);
  useEffect(() => {
    if (Array.isArray(value)) {
      const gravure = value.find((item) => item.key === "gravure").value;
      const lettertypeValue = value.find(
        (item) => item.key === "lettertype"
      ).value;
      const initialenValue = value.find(
        (item) => item.key === "initialen"
      ).value;
      const extraWoordValue = value.find(
        (item) => item.key === "extraWoord"
      ).value;
      const datumValue = value.find((item) => item.key === "datum").value;
      const naamValue = value.find((item) => item.key === "naam").value;
      const woord1Value = value.find((item) => item.key === "1 woord").value;
      const woord2Value = value.find((item) => item.key === "2 woorden").value;
      const woord3Value = value.find((item) => item.key === "3 woorden").value;
      const woord4Value = value.find((item) => item.key === "4 woorden").value;
      const uploadValue = value.find((item) => item.key === "upload").value;

      switch (gravure) {
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
          setError((prevState) => ({
            ...prevState,
            ["gravure"]: "",
            ["extraWoord"]: "",
            ["naam"]: "",
            ["datum"]: "",
            ["gravure"]: "",
            ["woord1"]: "",
            ["woord2"]: "",
            ["woord3"]: "",
            ["woord4"]: "",
          }));
          break;
        case "Geen tekst":
          setError((prevState) => ({
            ...prevState,
            ["gravure"]: "",
            ["extraWoord"]: "",
            ["initialen"]: "",
            ["lettertype"]: "",
            ["naam"]: "",
            ["datum"]: "",
            ["gravure"]: "",
            ["woord1"]: "",
            ["woord2"]: "",
            ["woord3"]: "",
            ["woord4"]: "",
          }));
          break;
        case "Hartje ♥ symbool":
        case "Infinity ∞ teken":
          if (extraWoordValue == "") {
            setError((prevState) => ({
              ...prevState,
              ["extraWoord"]: "* Veld extraWoord mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["extraWoord"]: "",
            }));
            if (extraWoordValue == "1 extra woord") {
              if (woord1Value == "") {
                setError((prevState) => ({
                  ...prevState,
                  ["woord1"]: "* Dit veld mag niet leeg zijn",
                }));
              } else if (woord1Value.includes(" ")) {
                setError((prevState) => ({
                  ...prevState,
                  ["woord1"]: "* Dit veld mag geen spatie bevatten",
                }));
              } else if (woord1Value.length > 11) {
                setError((prevState) => ({
                  ...prevState,
                  ["woord1"]: "* Gebruik maximaal 11 karakters",
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
                  ["lettertype"]: "* Kies een lettertype",
                }));
              } else {
                setError((prevState) => ({
                  ...prevState,
                  ["lettertype"]: "",
                }));
              }
              setError((prevState) => ({
                ...prevState,
                ["gravure"]: "",
                ["extraWoord"]: "",
                ["initialen"]: "",
                ["naam"]: "",
                ["datum"]: "",
                ["gravure"]: "",
                ["woord2"]: "",
                ["woord3"]: "",
                ["woord4"]: "",
              }));
            } else if (extraWoordValue == "2 extra woorden") {
              if (woord2Value == "") {
                setError((prevState) => ({
                  ...prevState,
                  ["woord2"]: "* Dit veld mag niet leeg zijn",
                }));
              } else if (woord2Value.split(" ").length > 2) {
                setError((prevState) => ({
                  ...prevState,
                  ["woord2"]:
                    "* Dit veld mag niet meer dan één spatie bevatten",
                }));
              } else if (woord2Value.length > 18) {
                setError((prevState) => ({
                  ...prevState,
                  ["woord2"]: "* Gebruik maximaal 18 karakters",
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
                  ["lettertype"]: "* Kies een lettertype",
                }));
              } else {
                setError((prevState) => ({
                  ...prevState,
                  ["lettertype"]: "",
                }));
              }
              setError((prevState) => ({
                ...prevState,
                ["gravure"]: "",
                ["extraWoord"]: "",
                ["initialen"]: "",
                ["naam"]: "",
                ["datum"]: "",
                ["gravure"]: "",
                ["woord1"]: "",
                ["woord3"]: "",
                ["woord4"]: "",
              }));
            } else {
              setError((prevState) => ({
                ...prevState,
                ["gravure"]: "",
                ["extraWoord"]: "",
                ["initialen"]: "",
                ["naam"]: "",
                ["datum"]: "",
                ["gravure"]: "",
                ["woord1"]: "",
                ["woord3"]: "",
                ["woord4"]: "",
                ["lettertype"]: "",
              }));
            }
          }

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
          setError((prevState) => ({
            ...prevState,
            ["gravure"]: "",
            ["extraWoord"]: "",
            ["initialen"]: "",
            ["naam"]: "",
            ["gravure"]: "",
            ["woord1"]: "",
            ["woord2"]: "",
            ["woord3"]: "",
            ["woord4"]: "",
          }));
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
          setError((prevState) => ({
            ...prevState,
            ["gravure"]: "",
            ["extraWoord"]: "",
            ["initialen"]: "",
            ["datum"]: "",
            ["gravure"]: "",
            ["woord1"]: "",
            ["woord2"]: "",
            ["woord3"]: "",
            ["woord4"]: "",
          }));
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
          setError((prevState) => ({
            ...prevState,
            ["gravure"]: "",
            ["extraWoord"]: "",
            ["initialen"]: "",
            ["gravure"]: "",
            ["woord1"]: "",
            ["woord2"]: "",
            ["woord3"]: "",
            ["woord4"]: "",
          }));
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
          setError((prevState) => ({
            ...prevState,
            ["gravure"]: "",
            ["extraWoord"]: "",
            ["initialen"]: "",
            ["naam"]: "",
            ["datum"]: "",
            ["gravure"]: "",
            ["woord2"]: "",
            ["woord3"]: "",
            ["woord4"]: "",
          }));
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
          setError((prevState) => ({
            ...prevState,
            ["gravure"]: "",
            ["extraWoord"]: "",
            ["initialen"]: "",
            ["naam"]: "",
            ["datum"]: "",
            ["gravure"]: "",
            ["woord1"]: "",
            ["woord3"]: "",
            ["woord4"]: "",
          }));
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
          setError((prevState) => ({
            ...prevState,
            ["gravure"]: "",
            ["extraWoord"]: "",
            ["initialen"]: "",
            ["naam"]: "",
            ["datum"]: "",
            ["gravure"]: "",
            ["woord1"]: "",
            ["woord2"]: "",
            ["woord4"]: "",
          }));
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
          setError((prevState) => ({
            ...prevState,
            ["gravure"]: "",
            ["extraWoord"]: "",
            ["initialen"]: "",
            ["naam"]: "",
            ["datum"]: "",
            ["gravure"]: "",
            ["woord1"]: "",
            ["woord2"]: "",
            ["woord3"]: "",
          }));
          break;
        case "Voet/handafdruk":
        case "Poot/snuitafdruk":
        case "Echo":
        case "Vingerafdruk":
        case "Logo/handtekening":
        case "Twee vingerafdrukken in hartvorm":
          if (uploadValue == "" || uploadValue == null) {
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
          setError((prevState) => ({
            ...prevState,
            ["extraWoord"]: "",
            ["initialen"]: "",
            ["naam"]: "",
            ["datum"]: "",
            ["woord1"]: "",
            ["woord2"]: "",
            ["woord3"]: "",
            ["woord4"]: "",
            ["lettertype"]: "",
          }));
          break;

        default:
          if (gravure == "") {
            setError((prevState) => ({
              ...prevState,
              ["gravure"]: "Veld mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["gravure"]: "",
            }));
          }
      }

      if (
        gravure == "Geen tekst" ||
        gravure == "Initialen/letters/tekens" ||
        gravure == "Hartje ♥ symbool" ||
        gravure == "Infinity ∞ teken" ||
        gravure == "Naam en datum" ||
        gravure == "Naam" ||
        gravure == "Datum" ||
        gravure == "1 woord" ||
        gravure == "2 woorden" ||
        gravure == "3 woorden" ||
        gravure == "4 woorden" ||
        gravure == "Voet/handafdruk" ||
        gravure == "Poot/snuitafdruk" ||
        gravure == "Echo" ||
        gravure == "Vingerafdruk" ||
        gravure == "Logo/handtekening" ||
        gravure == "Twee vingerafdrukken in hartvorm"
      ) {
        setError((prevState) => ({
          ...prevState,
          ["gravure"]: "",
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
        ["gravure"]: false,
      }));
    } else {
      setOptionErrors((prevState) => ({
        ...prevState,
        ["gravure"]: true,
      }));
    }
  }, [error]);

  const [values, setValues] = useState([
    {
      key: "gravure",
      value: value?.gravure?.value || "",
    },
    { key: "lettertype", value: value?.lettertype?.value || "" },
    { key: "initialen", value: value?.initialen?.value || "" },
    { key: "extraWoord", value: value?.extraWoord?.value || "" },
    { key: "datum", value: value?.datum?.value || "" },
    { key: "naam", value: value?.naam?.value || "" },
    { key: "1 woord", value: value?.woord1?.value || "" },
    { key: "2 woorden", value: value?.woord2?.value || "" },
    { key: "3 woorden", value: value?.woord3?.value || "" },
    { key: "4 woorden", value: value?.woord4?.value || "" },
    { key: "upload", value: value?.upload?.value || "" },
  ]);

  useEffect(() => {
    console.log("error in option");
    console.log(error);
  }, [error, values]);

  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    onChange(values);
  }, [values]);

  const handleChange = (changedKey, newValue) => {
    if (changedKey === "tekstBinnenZijdeRing") {
      if (
        !newValue.includes("Initialen/letters/tekens") ||
        !newValue.includes("Hartje ♥ symbool")
      ) {
        setValues((prevValues) =>
          prevValues.map((item) =>
            item.key === "extraWoord" ? { ...item, value: "" } : item
          )
        );
        setError((prevState) => ({
          ...prevState,
          ["extraWoord"]: "",
        }));
      }
    }
    setValues((prevValues) =>
      prevValues.map((item) =>
        item.key === changedKey ? { ...item, value: newValue } : item
      )
    );

    onChange(values);
  };
  const gravure = values.find((item) => item.key === "gravure").value;
  const extraWoordValue = values.find(
    (item) => item.key === "extraWoord"
  ).value;

  return (
    <>
      <div className="relative">
        {showErrors && (
          <p className="absolute  -bottom-6 left-0 text-red-700">
            {error["gravure"]}
          </p>
        )}
        <InputSelect
          value={gravure}
          onChange={(newTekstValue) => handleChange("gravure", newTekstValue)}
          title="Gravure: "
          options={gravureOptions}
        />
      </div>

      {(gravure == "Hartje ♥ symbool" || gravure == "Infinity ∞ teken") && (
        <div className="relative">
          {showErrors && (
            <p className="absolute  -bottom-6 left-0 text-red-700">
              {error["extraWoord"]}
            </p>
          )}
          <InputSelect
            value={extraWoordValue}
            onChange={(newExtraWoordValue) =>
              handleChange("extraWoord", newExtraWoordValue)
            }
            title="Extra woorden:"
            options={extraWoordenOptions}
          />
        </div>
      )}
      {gravure == "Initialen/letters/tekens" && (
        <div className="relative">
          {showErrors && (
            <p className="absolute  -bottom-6 left-0 text-red-700">
              {error["initialen"]}
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
      {(gravure == "Datum" || gravure == "Naam en datum") && (
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
      {(gravure == "Naam" || gravure == "Naam en datum") && (
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
      {(gravure == "1 woord" || extraWoordValue == "1 extra woord") && (
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
      {(gravure == "2 woorden" || extraWoordValue == "2 extra woorden") && (
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
      {gravure == "3 woorden" && (
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
      {gravure == "4 woorden" && (
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
      {(gravure == "Initialen/letters/tekens" ||
        gravure == "Naam" ||
        gravure == "Datum" ||
        gravure == "Naam en datum" ||
        gravure == "1 woord" ||
        gravure == "2 woorden" ||
        gravure == "3 woorden" ||
        gravure == "4 woorden" ||
        extraWoordValue == "1 extra woord" ||
        extraWoordValue == "2 extra woorden") && (
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
      {(gravure == "Voet/handafdruk" ||
        gravure == "Poot/snuitafdruk" ||
        gravure == "snuitafdruk" ||
        gravure == "Echo" ||
        gravure == "Vingerafdruk" ||
        gravure == "Logo/handtekening" ||
        gravure == "Twee vingerafdrukken in hartvorm") && (
        <div className="relative">
          {showErrors && (
            <p className="absolute  -bottom-6 left-0 text-red-700">
              {error["upload"]}
            </p>
          )}
          <InputFile
            setError={setError}
            title="bestand toevoegen:"
            onChange={(newUploadValue) =>
              handleChange("upload", newUploadValue)
            }
            value={value}
          />
        </div>
      )}
    </>
  );
}
