"use client";

import { useState, useEffect, useRef } from "react";

import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
} from "@mui/material";
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

import InputRadio from "../InputRadio";

export default function Positie({
  value,
  onChange,
  setOptionErrors,
  showErrors,
}) {
  const [error, setError] = useState(null);

  const handleCheckmarkChange = (name, event) => {
    setCheckmark((prevState) =>
      prevState.map((item) =>
        item.name === name ? { ...item, status: event.target.checked } : item
      )
    );
  };
  const [checkmark, setCheckmark] = useState([
    { name: "Links", status: false },
    { name: "Midden", status: false },
    { name: "Rechts", status: false },
    { name: "Achter", status: false },
  ]);

  useEffect(() => {
    console.log(checkmark);
  }, [checkmark]);

  useEffect(() => {
    if (Array.isArray(value)) {
      const gravureLinks = value.find(
        (item) => item.key === "gravureLinks"
      ).value;
      const lettertypeValueLinks = value.find(
        (item) => item.key === "lettertypeLinks"
      ).value;
      const initialenValueLinks = value.find(
        (item) => item.key === "initialenLinks"
      ).value;
      const extraWoordValueLinks = value.find(
        (item) => item.key === "extraWoordLinks"
      ).value;
      const datumValueLinks = value.find(
        (item) => item.key === "datumLinks"
      ).value;
      const naamValueLinks = value.find(
        (item) => item.key === "naamLinks"
      ).value;
      const woord1ValueLinks = value.find(
        (item) => item.key === "1 woordLinks"
      ).value;
      const woord2ValueLinks = value.find(
        (item) => item.key === "2 woordenLinks"
      ).value;
      const woord3ValueLinks = value.find(
        (item) => item.key === "3 woordenLinks"
      ).value;
      const woord4ValueLinks = value.find(
        (item) => item.key === "4 woordenLinks"
      ).value;
      const uploadValueLinks = value.find(
        (item) => item.key === "uploadLinks"
      ).value;

      switch (gravureLinks) {
        case "Initialen/letters/tekens":
          if (initialenValueLinks == "") {
            setError((prevState) => ({
              ...prevState,
              ["initialenLinks"]: "Veld initiaal mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["initialenLinks"]: "",
            }));
          }
          if (lettertypeValueLinks == "") {
            setError((prevState) => ({
              ...prevState,
              ["lettertypeLinks"]: "Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["lettertypeLinks"]: "",
            }));
          }
          setError((prevState) => ({
            ...prevState,
            ["gravureLinks"]: "",
            ["extraWoordLinks"]: "",
            ["naamLinks"]: "",
            ["datumLinks"]: "",
            ["gravureLinks"]: "",
            ["woord1Links"]: "",
            ["woord2Links"]: "",
            ["woord3Links"]: "",
            ["woord4Links"]: "",
          }));
          break;
        case "Geen tekst":
          setError((prevState) => ({
            ...prevState,
            ["gravureLinks"]: "",
            ["extraWoordLinks"]: "",
            ["initialenLinks"]: "",
            ["lettertypeLinks"]: "",
            ["naamLinks"]: "",
            ["datumLinks"]: "",
            ["gravureLinks"]: "",
            ["woord1Links"]: "",
            ["woord2Links"]: "",
            ["woord3Links"]: "",
            ["woord4Links"]: "",
          }));
          break;
        case "Hartje ♥ symbool":
        case "Infinity ∞ teken":
          if (extraWoordValueLinks == "") {
            setError((prevState) => ({
              ...prevState,
              ["extraWoordLinks"]: "* Veld extraWoord mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["extraWoordLinks"]: "",
            }));
            if (extraWoordValueLinks == "1 extra woord") {
              if (woord1ValueLinks == "") {
                setError((prevState) => ({
                  ...prevState,
                  ["woord1Links"]: "* Dit veld mag niet leeg zijn",
                }));
              } else if (woord1ValueLinks.includes(" ")) {
                setError((prevState) => ({
                  ...prevState,
                  ["woord1Links"]: "* Dit veld mag geen spatie bevatten",
                }));
              } else if (woord1ValueLinks.length > 11) {
                setError((prevState) => ({
                  ...prevState,
                  ["woord1Links"]: "* Gebruik maximaal 11 karakters",
                }));
              } else {
                setError((prevState) => ({
                  ...prevState,
                  ["woord1Links"]: "",
                }));
              }
              if (lettertypeValueLinks == "") {
                setError((prevState) => ({
                  ...prevState,
                  ["lettertypeLinks"]: "* Kies een lettertype",
                }));
              } else {
                setError((prevState) => ({
                  ...prevState,
                  ["lettertypeLinks"]: "",
                }));
              }
              setError((prevState) => ({
                ...prevState,
                ["gravureLinks"]: "",
                ["extraWoordLinks"]: "",
                ["initialenLinks"]: "",
                ["naamLinks"]: "",
                ["datumLinks"]: "",
                ["gravureLinks"]: "",
                ["woord2Links"]: "",
                ["woord3Links"]: "",
                ["woord4Links"]: "",
              }));
            } else if (extraWoordValueLinks == "2 extra woorden") {
              if (woord2ValueLinks == "") {
                setError((prevState) => ({
                  ...prevState,
                  ["woord2Links"]: "* Dit veld mag niet leeg zijn",
                }));
              } else if (woord2ValueLinks.split(" ").length > 2) {
                setError((prevState) => ({
                  ...prevState,
                  ["woord2Links"]:
                    "* Dit veld mag niet meer dan één spatie bevatten",
                }));
              } else if (woord2ValueLinks.length > 18) {
                setError((prevState) => ({
                  ...prevState,
                  ["woord2Links"]: "* Gebruik maximaal 18 karakters",
                }));
              } else {
                setError((prevState) => ({
                  ...prevState,
                  ["woord2Links"]: "",
                }));
              }
              if (lettertypeValueLinks == "") {
                setError((prevState) => ({
                  ...prevState,
                  ["lettertypeLinks"]: "* Kies een lettertype",
                }));
              } else {
                setError((prevState) => ({
                  ...prevState,
                  ["lettertype"]: "",
                }));
              }
              setError((prevState) => ({
                ...prevState,
                ["gravureLinks"]: "",
                ["extraWoordLinks"]: "",
                ["initialenLinks"]: "",
                ["naamLinks"]: "",
                ["datumLinks"]: "",
                ["gravureLinks"]: "",
                ["woord1Links"]: "",
                ["woord3Links"]: "",
                ["woord4Links"]: "",
              }));
            } else {
              setError((prevState) => ({
                ...prevState,
                ["gravureLinks"]: "",
                ["extraWoordLinks"]: "",
                ["initialenLinks"]: "",
                ["naamLinks"]: "",
                ["datumLinks"]: "",
                ["gravureLinks"]: "",
                ["woord1Links"]: "",
                ["woord3Links"]: "",
                ["woord4Links"]: "",
                ["lettertypeLinks"]: "",
              }));
            }
          }
          break;
        case "Datum":
          if (datumValueLinks == "") {
            setError((prevState) => ({
              ...prevState,
              ["datumLinks"]: "Veld datum mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["datumLinks"]: "",
            }));
          }
          if (lettertypeValueLinks == "") {
            setError((prevState) => ({
              ...prevState,
              ["lettertypeLinks"]: "Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["lettertypeLinks"]: "",
            }));
          }
          setError((prevState) => ({
            ...prevState,
            ["gravureLinks"]: "",
            ["extraWoordLinks"]: "",
            ["initialenLinks"]: "",
            ["naamLinks"]: "",
            ["gravureLinks"]: "",
            ["woord1Links"]: "",
            ["woord2Links"]: "",
            ["woord3Links"]: "",
            ["woord4Links"]: "",
          }));
          break;
        case "Naam":
          if (naamValueLinks == "") {
            setError((prevState) => ({
              ...prevState,
              ["naamLinks"]: "Veld naam mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["naamLinks"]: "",
            }));
          }
          if (lettertypeValueLinks == "") {
            setError((prevState) => ({
              ...prevState,
              ["lettertypeLinks"]: "Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["lettertypeLinks"]: "",
            }));
          }
          setError((prevState) => ({
            ...prevState,
            ["gravureLinks"]: "",
            ["extraWoordLinks"]: "",
            ["initialenLinks"]: "",
            ["datumLinks"]: "",
            ["gravureLinks"]: "",
            ["woord1Links"]: "",
            ["woord2Links"]: "",
            ["woord3Links"]: "",
            ["woord4Links"]: "",
          }));
          break;
        case "Naam en datum":
          if (naamValueLinks == "") {
            setError((prevState) => ({
              ...prevState,
              ["naamLinks"]: "Veld naam mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["naamLinks"]: "",
            }));
          }
          if (datumValueLinks == "") {
            setError((prevState) => ({
              ...prevState,
              ["datumLinks"]: "Veld datum mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["datumLinks"]: "",
            }));
          }
          if (lettertypeValueLinks == "") {
            setError((prevState) => ({
              ...prevState,
              ["lettertypeLinks"]: "Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["lettertypeLinks"]: "",
            }));
          }
          setError((prevState) => ({
            ...prevState,
            ["gravureLinks"]: "",
            ["extraWoordLinks"]: "",
            ["initialenLinks"]: "",
            ["gravureLinks"]: "",
            ["woord1Links"]: "",
            ["woord2Links"]: "",
            ["woord3Links"]: "",
            ["woord4Links"]: "",
          }));
        case "1 woord":
          if (woord1ValueLinks == "") {
            setError((prevState) => ({
              ...prevState,
              ["woord1Links"]: "Dit veld mag niet leeg zijn",
            }));
          } else if (woord1ValueLinks.includes(" ")) {
            setError((prevState) => ({
              ...prevState,
              ["woord1Links"]: "Dit veld mag geen spatie bevatten",
            }));
          } else if (woord1ValueLinks.length > 11) {
            setError((prevState) => ({
              ...prevState,
              ["woord1Links"]: "Gebruik maximaal 11 karakters",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["woord1Links"]: "",
            }));
          }
          if (lettertypeValueLinks == "") {
            setError((prevState) => ({
              ...prevState,
              ["lettertypeLinks"]: "Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["lettertypeLinks"]: "",
            }));
          }
          setError((prevState) => ({
            ...prevState,
            ["gravureLinks"]: "",
            ["extraWoordLinks"]: "",
            ["initialenLinks"]: "",
            ["naamLinks"]: "",
            ["datumLinks"]: "",
            ["gravureLinks"]: "",
            ["woord2Links"]: "",
            ["woord3Links"]: "",
            ["woord4Links"]: "",
          }));
          break;
        case "2 woorden":
          if (woord2ValueLinks == "") {
            setError((prevState) => ({
              ...prevState,
              ["woord2Links"]: "Veld woord 2 mag niet leeg zijn",
            }));
          } else if (woord2ValueLinks.length > 18) {
            setError((prevState) => ({
              ...prevState,
              ["woord2Links"]: "Gebruik maximaal 18 karakters",
            }));
          } else if (woord2ValueLinks.split(" ").length > 2) {
            setError((prevState) => ({
              ...prevState,
              ["woord2Links"]: "Dit veld mag niet meer dan één spatie bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["woord2Links"]: "",
            }));
          }
          if (lettertypeValueLinks == "") {
            setError((prevState) => ({
              ...prevState,
              ["lettertypeLinks"]: "Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["lettertypeLinks"]: "",
            }));
          }
          setError((prevState) => ({
            ...prevState,
            ["gravureLinks"]: "",
            ["extraWoordLinks"]: "",
            ["initialenLinks"]: "",
            ["naamLinks"]: "",
            ["datumLinks"]: "",
            ["gravureLinks"]: "",
            ["woord1Links"]: "",
            ["woord3Links"]: "",
            ["woord4Links"]: "",
          }));
          break;
        case "3 woorden":
          if (woord3ValueLinks == "") {
            setError((prevState) => ({
              ...prevState,
              ["woord3Links"]: "Veld woord 3 mag niet leeg zijn",
            }));
          } else if (woord3ValueLinks.length > 24) {
            setError((prevState) => ({
              ...prevState,
              ["woord3Links"]: "Gebruik maximaal 24 karakters",
            }));
          } else if (woord3ValueLinks.split(" ").length > 3) {
            setError((prevState) => ({
              ...prevState,
              ["woord3Links"]:
                "Dit veld mag niet meer dan twee spaties bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["woord3Links"]: "",
            }));
          }
          if (lettertypeValueLinks == "") {
            setError((prevState) => ({
              ...prevState,
              ["lettertypeLinks"]: "Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["lettertypeLinks"]: "",
            }));
          }
          setError((prevState) => ({
            ...prevState,
            ["gravureLinks"]: "",
            ["extraWoordLinks"]: "",
            ["initialenLinks"]: "",
            ["naamLinks"]: "",
            ["datumLinks"]: "",
            ["gravureLinks"]: "",
            ["woord1Links"]: "",
            ["woord2Links"]: "",
            ["woord4Links"]: "",
          }));
          break;
        case "4 woorden":
          if (woord4ValueLinks == "") {
            setError((prevState) => ({
              ...prevState,
              ["woord4Links"]: "Veld woord 4 mag niet leeg zijn",
            }));
          } else if (woord4ValueLinks.length > 30) {
            setError((prevState) => ({
              ...prevState,
              ["woord4Links"]: "Gebruik maximaal 30 karakters",
            }));
          } else if (woord4ValueLinks.split(" ").length > 3) {
            setError((prevState) => ({
              ...prevState,
              ["woord4Links"]:
                "Dit veld mag niet meer dan drie spatie bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["woord4Links"]: "",
            }));
          }
          if (lettertypeValueLinks == "") {
            setError((prevState) => ({
              ...prevState,
              ["lettertypeLinks"]: "Kies een lettertype",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["lettertypeLinks"]: "",
            }));
          }
          setError((prevState) => ({
            ...prevState,
            ["gravureLinks"]: "",
            ["extraWoordLinks"]: "",
            ["initialenLinks"]: "",
            ["naamLinks"]: "",
            ["datumLinks"]: "",
            ["gravureLinks"]: "",
            ["woord1Links"]: "",
            ["woord2Links"]: "",
            ["woord3Links"]: "",
          }));
          break;
        case "Voet/handafdruk":
        case "Poot/snuitafdruk":
        case "Echo":
        case "Vingerafdruk":
        case "Logo/handtekening":
        case "Twee vingerafdrukken in hartvorm":
          if (uploadValueLinks == "" || uploadValueLinks == null) {
            setError((prevState) => ({
              ...prevState,
              ["uploadLinks"]: "* Upload een bestand",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["uploadLinks"]: "",
            }));
          }
          setError((prevState) => ({
            ...prevState,
            ["extraWoordLinks"]: "",
            ["initialenLinks"]: "",
            ["naamLinks"]: "",
            ["datumLinks"]: "",
            ["woord1Links"]: "",
            ["woord2Links"]: "",
            ["woord3Links"]: "",
            ["woord4Links"]: "",
            ["lettertypeLinks"]: "",
          }));
          break;

        default:
          if (gravureLinks == "") {
            setError((prevState) => ({
              ...prevState,
              ["gravureLinks"]: "Veld mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["gravureLinks"]: "",
            }));
          }
      }

      if (
        gravureLinks == "Geen tekst" ||
        gravureLinks == "Initialen/letters/tekens" ||
        gravureLinks == "Hartje ♥ symbool" ||
        gravureLinks == "Infinity ∞ teken" ||
        gravureLinks == "Naam en datum" ||
        gravureLinks == "Naam" ||
        gravureLinks == "Datum" ||
        gravureLinks == "1 woord" ||
        gravureLinks == "2 woorden" ||
        gravureLinks == "3 woorden" ||
        gravureLinks == "4 woorden" ||
        gravureLinks == "Voet/handafdruk" ||
        gravureLinks == "Poot/snuitafdruk" ||
        gravureLinks == "Echo" ||
        gravureLinks == "Vingerafdruk" ||
        gravureLinks == "Logo/handtekening" ||
        gravureLinks == "Twee vingerafdrukken in hartvorm"
      ) {
        setError((prevState) => ({
          ...prevState,
          ["gravureLinks"]: "",
        }));
      }
    }
  }, [value]);

  useEffect(() => {
    if (!error) return;
    const allValuescorrect = Object.values(error).every(
      (value) => value === ""
    );
    if (allValuescorrect) {
      setOptionErrors((prevState) => ({
        ...prevState,
        ["positie"]: false,
      }));
    } else {
      setOptionErrors((prevState) => ({
        ...prevState,
        ["positie"]: true,
      }));
    }
  }, [error]);

  const [values, setValues] = useState([
    {
      key: "gravureLinks",
      value: value?.gravureLinks?.value || "",
    },
    { key: "lettertypeLinks", value: value?.lettertypeLinks?.value || "" },
    { key: "initialenLinks", value: value?.initialenLinks?.value || "" },
    { key: "extraWoordLinks", value: value?.extraWoordLinks?.value || "" },
    { key: "datumLinks", value: value?.datumLinks?.value || "" },
    { key: "naamLinks", value: value?.naamLinks?.value || "" },
    { key: "1 woordLinks", value: value?.woord1Links?.value || "" },
    { key: "2 woordenLinks", value: value?.woord2Links?.value || "" },
    { key: "3 woordenLinks", value: value?.woord3Links?.value || "" },
    { key: "4 woordenLinks", value: value?.woord4Links?.value || "" },
    { key: "uploadLinks", value: value?.uploadLinks?.value || "" },
    {
      key: "gravureMidden",
      value: value?.gravureMidden?.value || "",
    },
    { key: "lettertypeMidden", value: value?.lettertypeMidden?.value || "" },
    { key: "initialenMidden", value: value?.initialenMidden?.value || "" },
    { key: "extraWoordMidden", value: value?.extraWoordMidden?.value || "" },
    { key: "datumMidden", value: value?.datumMidden?.value || "" },
    { key: "naamMidden", value: value?.naamMidden?.value || "" },
    { key: "1 woordMidden", value: value?.woord1Midden?.value || "" },
    { key: "2 woordenMidden", value: value?.woord2Midden?.value || "" },
    { key: "3 woordenMidden", value: value?.woord3Midden?.value || "" },
    { key: "4 woordenMidden", value: value?.woord4Midden?.value || "" },
    { key: "uploadMidden", value: value?.uploadMidden?.value || "" },
    {
      key: "gravureRechts",
      value: value?.gravureRechts?.value || "",
    },
    { key: "lettertypeRechts", value: value?.lettertypeRechts?.value || "" },
    { key: "initialenRechts", value: value?.initialenRechts?.value || "" },
    { key: "extraWoordRechts", value: value?.extraWoordRechts?.value || "" },
    { key: "datumRechts", value: value?.datumRechts?.value || "" },
    { key: "naamRechts", value: value?.naamRechts?.value || "" },
    { key: "1 woordRechts", value: value?.woord1Rechts?.value || "" },
    { key: "2 woordenRechts", value: value?.woord2Rechts?.value || "" },
    { key: "3 woordenRechts", value: value?.woord3Rechts?.value || "" },
    { key: "4 woordenRechts", value: value?.woord4Rechts?.value || "" },
    { key: "uploadRechts", value: value?.uploadRechts?.value || "" },
    {
      key: "gravureAchter",
      value: value?.gravureAchter?.value || "",
    },
    { key: "lettertypeAchter", value: value?.lettertypeAchter?.value || "" },
    { key: "initialenAchter", value: value?.initialenAchter?.value || "" },
    { key: "extraWoordAchter", value: value?.extraWoordAchter?.value || "" },
    { key: "datumAchter", value: value?.datumAchter?.value || "" },
    { key: "naamAchter", value: value?.naamAchter?.value || "" },
    { key: "1 woordAchter", value: value?.woord1Achter?.value || "" },
    { key: "2 woordenAchter", value: value?.woord2Achter?.value || "" },
    { key: "3 woordenAchter", value: value?.woord3Achter?.value || "" },
    { key: "4 woordenAchter", value: value?.woord4Achter?.value || "" },
    { key: "uploadAchter", value: value?.uploadAchter?.value || "" },
  ]);

  useEffect(() => {
    console.log("error in option");
    console.log(error);
  }, [error, values]);

  const isInitialRender = useRef(true);

  useEffect(() => {
    console.log("values in option");
    console.log(values);
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    onChange(values);
  }, [values]);

  const handleChange = (changedKey, newValue) => {
    console.log("handle change");
    console.log(changedKey, newValue);

    // if (changedKey === "gravureLinks") {
    //   if (
    //     !newValue.includes("Initialen/letters/tekens") ||
    //     !newValue.includes("Hartje ♥ symbool")
    //   ) {
    //     setValues((prevValues) =>
    //       prevValues.map((item) =>
    //         item.key === "extraWoordLinks" ? { ...item, value: "" } : item
    //       )
    //     );
    //     setError((prevState) => ({
    //       ...prevState,
    //       ["extraWoordLinks"]: "",
    //     }));
    //   }
    // }
    setValues((prevValues) =>
      prevValues.map((item) =>
        item.key === changedKey ? { ...item, value: newValue } : item
      )
    );

    onChange(values);
  };
  const gravureLinks = values.find((item) => item.key === "gravureLinks").value;
  const extraWoordValueLinks = values.find(
    (item) => item.key === "extraWoordLinks"
  ).value;

  return (
    <>
      <div>
        <div className="flex flex-wrap items-center text-sm mb-2">
          <span className="font-bold min-w-[140px]">Positie: </span>
        </div>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
        >
          <FormGroup>
            {checkmark.map((option, index) => (
              <div key={index}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={option.status}
                      onChange={(e) => handleCheckmarkChange(option.name, e)}
                      value={option.name}
                      sx={{ "&.Mui-checked": { color: "#222" } }}
                    />
                  }
                  label={option.name}
                />
              </div>
            ))}
          </FormGroup>
        </RadioGroup>
      </div>

      {checkmark.map((option, index) => {
        if (option.status) {
          const gravureOption =
            values.find((item) => item.key === `gravure${option.name}`)
              ?.value || "";
          return (
            <div key={option.name}>
              <div className="relative">
                {showErrors && (
                  <p className="absolute  -bottom-6 left-0 text-red-700">
                    {error[gravureOption]}
                  </p>
                )}
                <InputSelect
                  value={gravureOption}
                  onChange={(newTekstValue) => {
                    handleChange(`gravure${option.name}`, newTekstValue);
                  }}
                  title={`gravure ${option.name.toLowerCase()}: `}
                  options={gravureOptions}
                />
              </div>

              {(gravureOption == "Hartje ♥ symbool" ||
                gravureOption == "Infinity ∞ teken") && (
                <div className="relative">
                  {showErrors && (
                    <p className="absolute  -bottom-6 left-0 text-red-700">
                      {error[`extraWoord${option.name}`]}
                    </p>
                  )}
                  <InputSelect
                    value={extraWoordValueLinks}
                    onChange={(newExtraWoordValue) =>
                      handleChange(
                        `extraWoord${option.name}`,
                        newExtraWoordValue
                      )
                    }
                    title="Extra woorden:"
                    options={extraWoordenOptions}
                  />
                </div>
              )}
              {gravureOption == "Initialen/letters/tekens" && (
                <div className="relative">
                  {showErrors && (
                    <p className="absolute  -bottom-6 left-0 text-red-700">
                      {error[`initialenLinks${option.name}`]}
                    </p>
                  )}
                  <InputTextField
                    value={
                      values.find((item) => item.key === "initialen")?.value ||
                      ""
                    }
                    onChange={(newInitialenValue) =>
                      handleChange(`initialen${option.name}`, newInitialenValue)
                    }
                    title="Initialen/letters/tekens:"
                  />
                </div>
              )}
              {(gravureOption == "Datum" ||
                gravureOption == "Naam en datum") && (
                <div className="relative">
                  {showErrors && (
                    <p className="absolute  -bottom-6 left-0 text-red-700">
                      {error[`datum${option.name}`]}
                    </p>
                  )}
                  <InputDate
                    value={
                      values.find((item) => item.key === "datum")?.value || ""
                    }
                    onChange={(newDateValue) =>
                      handleChange(`datum${option.name}`, newDateValue)
                    }
                    title="Datum:"
                  />
                </div>
              )}
              {(gravureOption == "Naam" ||
                gravureOption == "Naam en datum") && (
                <div className="relative">
                  {showErrors && (
                    <p className="absolute  -bottom-6 left-0 text-red-700">
                      {error[`naam${option.name}`]}
                    </p>
                  )}
                  <InputTextField
                    value={
                      values.find((item) => item.key === "naam")?.value || ""
                    }
                    onChange={(newNaamValue) =>
                      handleChange(`naam${option.name}`, newNaamValue)
                    }
                    title="Naam:"
                  />
                </div>
              )}
              {(gravureOption == "1 woord" ||
                `extraWoordValue${option.name}` == "1 extra woord") && (
                <div className="relative">
                  {showErrors && (
                    <p className="absolute  -bottom-6 left-0 text-red-700">
                      {error[`woord1${option.name}`]}
                    </p>
                  )}
                  <InputTextField
                    value={
                      values.find((item) => item.key === "1 woord")?.value || ""
                    }
                    onChange={(new1WoordValue) =>
                      handleChange(`1 woord${option.name}`, new1WoordValue)
                    }
                    title="1 Woord:"
                  />
                </div>
              )}
              {(gravureOption == "2 woorden" ||
                `extraWoordValue${option.name}` == "2 extra woorden") && (
                <div className="relative">
                  {showErrors && (
                    <p className="absolute  -bottom-6 left-0 text-red-700">
                      {error[`woord2${option.name}`]}
                    </p>
                  )}
                  <InputTextField
                    value={
                      values.find((item) => item.key === "2 woorden")?.value ||
                      ""
                    }
                    onChange={(new2WoordenValue) =>
                      handleChange(`2 woorden${option.name}`, new2WoordenValue)
                    }
                    title="2 Woorden:"
                  />
                </div>
              )}
              {gravureOption == "3 woorden" && (
                <div className="relative">
                  {showErrors && (
                    <p className="absolute  -bottom-6 left-0 text-red-700">
                      {error[`woord3${option.name}`]}
                    </p>
                  )}
                  <InputTextField
                    value={
                      values.find((item) => item.key === "3 woorden")?.value ||
                      ""
                    }
                    onChange={(new3WoordenValue) =>
                      handleChange(`3 woorden${option.name}`, new3WoordenValue)
                    }
                    title="3 Woorden:"
                  />
                </div>
              )}
              {gravureOption == "4 woorden" && (
                <div className="relative">
                  {showErrors && (
                    <p className="absolute  -bottom-6 left-0 text-red-700">
                      {error[`woord4${option.name}`]}
                    </p>
                  )}
                  <InputTextField
                    value={
                      values.find((item) => item.key === "4 woorden")?.value ||
                      ""
                    }
                    onChange={(new4WoordenValue) =>
                      handleChange(`4 woorden${option.name}`, new4WoordenValue)
                    }
                    title="4 Woorden:"
                  />
                </div>
              )}
              {(gravureOption == "Initialen/letters/tekens" ||
                gravureOption == "Naam" ||
                gravureOption == "Datum" ||
                gravureOption == "Naam en datum" ||
                gravureOption == "1 woord" ||
                gravureOption == "2 woorden" ||
                gravureOption == "3 woorden" ||
                gravureOption == "4 woorden" ||
                `extraWoordValue${option.name}` == "1 extra woord" ||
                `extraWoordValue${option.name}` == "2 extra woorden") && (
                <div className="relative">
                  {showErrors && (
                    <p className="absolute  -bottom-6 left-0 text-red-700">
                      {error[`lettertype${option.name}`]}
                    </p>
                  )}
                  <InputImageSwatchLarge
                    value={
                      values.find((item) => item.key === "lettertype")?.value ||
                      ""
                    }
                    onChange={(newLettertypeValue) =>
                      handleChange(
                        `lettertype${option.name}`,
                        newLettertypeValue
                      )
                    }
                    title="Lettertype:"
                    options={lettertypeOptions}
                  />
                </div>
              )}
              {(gravureOption == "Voet/handafdruk" ||
                gravureOption == "Poot/snuitafdruk" ||
                gravureOption == "snuitafdruk" ||
                gravureOption == "Echo" ||
                gravureOption == "Vingerafdruk" ||
                gravureOption == "Logo/handtekening" ||
                gravureOption == "Twee vingerafdrukken in hartvorm") && (
                <div className="relative">
                  {showErrors && (
                    <p className="absolute  -bottom-6 left-0 text-red-700">
                      {error[`upload${option.name}`]}
                    </p>
                  )}
                  <InputFile
                    setError={setError}
                    title="Upload:"
                    onChange={(newUploadValue) =>
                      handleChange(`upload${option.name}`, newUploadValue)
                    }
                    value={value}
                  />
                </div>
              )}
            </div>
          );
        }
      })}
    </>
  );
}
