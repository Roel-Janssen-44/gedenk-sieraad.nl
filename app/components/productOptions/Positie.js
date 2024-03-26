"use client";

import { useState, useEffect, useRef } from "react";

import {
  RadioGroup,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import InputFile from "../InputFile";
import InputSelect from "../InputSelect";
import InputTextField from "../InputTextField";
import InputDate from "../InputDate";
import InputImageSwatchLarge from "../InputImageSwatchLarge";

import { gravureOptions, lettertypeOptions } from "./optionSets";

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
    if (Array.isArray(value)) {
      const gravureLinks = value.find(
        (item) => item.key === "gravureLinks"
      ).value;
      const initialenValueLinks = value.find(
        (item) => item.key === "initialenLinks"
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

      const gravureMidden = value.find(
        (item) => item.key === "gravureMidden"
      ).value;
      const initialenValueMidden = value.find(
        (item) => item.key === "initialenMidden"
      ).value;
      const datumValueMidden = value.find(
        (item) => item.key === "datumMidden"
      ).value;
      const naamValueMidden = value.find(
        (item) => item.key === "naamMidden"
      ).value;
      const woord1ValueMidden = value.find(
        (item) => item.key === "1 woordMidden"
      ).value;
      const woord2ValueMidden = value.find(
        (item) => item.key === "2 woordenMidden"
      ).value;
      const woord3ValueMidden = value.find(
        (item) => item.key === "3 woordenMidden"
      ).value;
      const woord4ValueMidden = value.find(
        (item) => item.key === "4 woordenMidden"
      ).value;
      const uploadValueMidden = value.find(
        (item) => item.key === "uploadMidden"
      ).value;

      const gravureRechts = value.find(
        (item) => item.key === "gravureRechts"
      ).value;
      const initialenValueRechts = value.find(
        (item) => item.key === "initialenRechts"
      ).value;
      const datumValueRechts = value.find(
        (item) => item.key === "datumRechts"
      ).value;
      const naamValueRechts = value.find(
        (item) => item.key === "naamRechts"
      ).value;
      const woord1ValueRechts = value.find(
        (item) => item.key === "1 woordRechts"
      ).value;
      const woord2ValueRechts = value.find(
        (item) => item.key === "2 woordenRechts"
      ).value;
      const woord3ValueRechts = value.find(
        (item) => item.key === "3 woordenRechts"
      ).value;
      const woord4ValueRechts = value.find(
        (item) => item.key === "4 woordenRechts"
      ).value;
      const uploadValueRechts = value.find(
        (item) => item.key === "uploadRechts"
      ).value;

      const gravureAchter = value.find(
        (item) => item.key === "gravureAchter"
      ).value;
      const initialenValueAchter = value.find(
        (item) => item.key === "initialenAchter"
      ).value;
      const datumValueAchter = value.find(
        (item) => item.key === "datumAchter"
      ).value;
      const naamValueAchter = value.find(
        (item) => item.key === "naamAchter"
      ).value;
      const woord1ValueAchter = value.find(
        (item) => item.key === "1 woordAchter"
      ).value;
      const woord2ValueAchter = value.find(
        (item) => item.key === "2 woordenAchter"
      ).value;
      const woord3ValueAchter = value.find(
        (item) => item.key === "3 woordenAchter"
      ).value;
      const woord4ValueAchter = value.find(
        (item) => item.key === "4 woordenAchter"
      ).value;
      const uploadValueAchter = value.find(
        (item) => item.key === "uploadAchter"
      ).value;

      const lettertypeValue = value.find(
        (item) => item.key === "lettertype"
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
          // if (lettertypeValueLinks == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeLinks"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeLinks"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["gravureLinks"]: "",
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
            ["initialenLinks"]: "",
            // ["lettertypeLinks"]: "",
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
          setError((prevState) => ({
            ...prevState,
            ["gravureLinks"]: "",
            ["initialenLinks"]: "",
            ["naamLinks"]: "",
            ["datumLinks"]: "",
            ["gravureLinks"]: "",
            ["woord1Links"]: "",
            ["woord3Links"]: "",
            ["woord4Links"]: "",
            // ["lettertypeLinks"]: "",
          }));
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
          // if (lettertypeValueLinks == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeLinks"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeLinks"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["gravureLinks"]: "",
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
          // if (lettertypeValueLinks == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeLinks"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeLinks"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["gravureLinks"]: "",
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
          // if (lettertypeValueLinks == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeLinks"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeLinks"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["gravureLinks"]: "",
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
          // if (lettertypeValueLinks == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeLinks"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeLinks"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["gravureLinks"]: "",
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
          // if (lettertypeValueLinks == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeLinks"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeLinks"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["gravureLinks"]: "",
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
          // if (lettertypeValueLinks == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeLinks"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeLinks"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["gravureLinks"]: "",
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
          // if (lettertypeValueLinks == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeLinks"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeLinks"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["gravureLinks"]: "",
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
            ["initialenLinks"]: "",
            ["naamLinks"]: "",
            ["datumLinks"]: "",
            ["woord1Links"]: "",
            ["woord2Links"]: "",
            ["woord3Links"]: "",
            ["woord4Links"]: "",
            // ["lettertypeLinks"]: "",
          }));
          break;
        default:
          if (
            gravureLinks == "" &&
            checkmark.find((item) => item.name === "Links").status
          ) {
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

      switch (gravureMidden) {
        case "Initialen/letters/tekens":
          if (initialenValueMidden == "") {
            setError((prevState) => ({
              ...prevState,
              ["initialenMidden"]: "Veld initiaal mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["initialenMidden"]: "",
            }));
          }
          // if (lettertypeValueMidden == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeMidden"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeMidden"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["gravureMidden"]: "",
            ["naamMidden"]: "",
            ["datumMidden"]: "",
            ["gravureMidden"]: "",
            ["woord1Midden"]: "",
            ["woord2Midden"]: "",
            ["woord3Midden"]: "",
            ["woord4Midden"]: "",
          }));
          break;
        case "Geen tekst":
          setError((prevState) => ({
            ...prevState,
            ["gravureMidden"]: "",
            ["initialenMidden"]: "",
            // ["lettertypeMidden"]: "",
            ["naamMidden"]: "",
            ["datumMidden"]: "",
            ["gravureMidden"]: "",
            ["woord1Midden"]: "",
            ["woord2Midden"]: "",
            ["woord3Midden"]: "",
            ["woord4Midden"]: "",
          }));
          break;
        case "Hartje ♥ symbool":
        case "Infinity ∞ teken":
          setError((prevState) => ({
            ...prevState,
            ["gravureMidden"]: "",
            ["initialenMidden"]: "",
            ["naamMidden"]: "",
            ["datumMidden"]: "",
            ["gravureMidden"]: "",
            ["woord1Midden"]: "",
            ["woord3Midden"]: "",
            ["woord4Midden"]: "",
            // ["lettertypeMidden"]: "",
          }));
          break;
        case "Datum":
          if (datumValueMidden == "") {
            setError((prevState) => ({
              ...prevState,
              ["datumMidden"]: "Veld datum mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["datumMidden"]: "",
            }));
          }
          // if (lettertypeValueMidden == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeMidden"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeMidden"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["gravureMidden"]: "",
            ["initialenMidden"]: "",
            ["naamMidden"]: "",
            ["gravureMidden"]: "",
            ["woord1Midden"]: "",
            ["woord2Midden"]: "",
            ["woord3Midden"]: "",
            ["woord4Midden"]: "",
          }));
          break;
        case "Naam":
          if (naamValueMidden == "") {
            setError((prevState) => ({
              ...prevState,
              ["naamMidden"]: "Veld naam mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["naamMidden"]: "",
            }));
          }
          // if (lettertypeValueMidden == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeMidden"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeMidden"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["gravureMidden"]: "",
            ["initialenMidden"]: "",
            ["datumMidden"]: "",
            ["gravureMidden"]: "",
            ["woord1Midden"]: "",
            ["woord2Midden"]: "",
            ["woord3Midden"]: "",
            ["woord4Midden"]: "",
          }));
          break;
        case "Naam en datum":
          if (naamValueMidden == "") {
            setError((prevState) => ({
              ...prevState,
              ["naamMidden"]: "Veld naam mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["naamMidden"]: "",
            }));
          }
          if (datumValueMidden == "") {
            setError((prevState) => ({
              ...prevState,
              ["datumMidden"]: "Veld datum mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["datumMidden"]: "",
            }));
          }
          // if (lettertypeValueMidden == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeMidden"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeMidden"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["gravureMidden"]: "",
            ["initialenMidden"]: "",
            ["gravureMidden"]: "",
            ["woord1Midden"]: "",
            ["woord2Midden"]: "",
            ["woord3Midden"]: "",
            ["woord4Midden"]: "",
          }));
        case "1 woord":
          if (woord1ValueMidden == "") {
            setError((prevState) => ({
              ...prevState,
              ["woord1Midden"]: "Dit veld mag niet leeg zijn",
            }));
          } else if (woord1ValueMidden.includes(" ")) {
            setError((prevState) => ({
              ...prevState,
              ["woord1Midden"]: "Dit veld mag geen spatie bevatten",
            }));
          } else if (woord1ValueMidden.length > 11) {
            setError((prevState) => ({
              ...prevState,
              ["woord1Midden"]: "Gebruik maximaal 11 karakters",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["woord1Midden"]: "",
            }));
          }
          // if (lettertypeValueMidden == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeMidden"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeMidden"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["gravureMidden"]: "",
            ["initialenMidden"]: "",
            ["naamMidden"]: "",
            ["datumMidden"]: "",
            ["gravureMidden"]: "",
            ["woord2Midden"]: "",
            ["woord3Midden"]: "",
            ["woord4Midden"]: "",
          }));
          break;
        case "2 woorden":
          if (woord2ValueMidden == "") {
            setError((prevState) => ({
              ...prevState,
              ["woord2Midden"]: "Veld woord 2 mag niet leeg zijn",
            }));
          } else if (woord2ValueMidden.length > 18) {
            setError((prevState) => ({
              ...prevState,
              ["woord2Midden"]: "Gebruik maximaal 18 karakters",
            }));
          } else if (woord2ValueMidden.split(" ").length > 2) {
            setError((prevState) => ({
              ...prevState,
              ["woord2Midden"]:
                "Dit veld mag niet meer dan één spatie bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["woord2Midden"]: "",
            }));
          }
          // if (lettertypeValueMidden == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeMidden"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeMidden"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["gravureMidden"]: "",
            ["initialenMidden"]: "",
            ["naamMidden"]: "",
            ["datumMidden"]: "",
            ["gravureMidden"]: "",
            ["woord1Midden"]: "",
            ["woord3Midden"]: "",
            ["woord4Midden"]: "",
          }));
          break;
        case "3 woorden":
          if (woord3ValueMidden == "") {
            setError((prevState) => ({
              ...prevState,
              ["woord3Midden"]: "Veld woord 3 mag niet leeg zijn",
            }));
          } else if (woord3ValueMidden.length > 24) {
            setError((prevState) => ({
              ...prevState,
              ["woord3Midden"]: "Gebruik maximaal 24 karakters",
            }));
          } else if (woord3ValueMidden.split(" ").length > 3) {
            setError((prevState) => ({
              ...prevState,
              ["woord3Midden"]:
                "Dit veld mag niet meer dan twee spaties bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["woord3Midden"]: "",
            }));
          }
          // if (lettertypeValueMidden == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeMidden"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeMidden"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["gravureMidden"]: "",
            ["initialenMidden"]: "",
            ["naamMidden"]: "",
            ["datumMidden"]: "",
            ["gravureMidden"]: "",
            ["woord1Midden"]: "",
            ["woord2Midden"]: "",
            ["woord4Midden"]: "",
          }));
          break;
        case "4 woorden":
          if (woord4ValueMidden == "") {
            setError((prevState) => ({
              ...prevState,
              ["woord4Midden"]: "Veld woord 4 mag niet leeg zijn",
            }));
          } else if (woord4ValueMidden.length > 30) {
            setError((prevState) => ({
              ...prevState,
              ["woord4Midden"]: "Gebruik maximaal 30 karakters",
            }));
          } else if (woord4ValueMidden.split(" ").length > 3) {
            setError((prevState) => ({
              ...prevState,
              ["woord4Midden"]:
                "Dit veld mag niet meer dan drie spatie bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["woord4Midden"]: "",
            }));
          }
          // if (lettertypeValueMidden == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeMidden"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeMidden"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["gravureMidden"]: "",
            ["initialenMidden"]: "",
            ["naamMidden"]: "",
            ["datumMidden"]: "",
            ["gravureMidden"]: "",
            ["woord1Midden"]: "",
            ["woord2Midden"]: "",
            ["woord3Midden"]: "",
          }));
          break;
        case "Voet/handafdruk":
        case "Poot/snuitafdruk":
        case "Echo":
        case "Vingerafdruk":
        case "Logo/handtekening":
        case "Twee vingerafdrukken in hartvorm":
          if (uploadValueMidden == "" || uploadValueMidden == null) {
            setError((prevState) => ({
              ...prevState,
              ["uploadMidden"]: "* Upload een bestand",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["uploadMidden"]: "",
            }));
          }
          setError((prevState) => ({
            ...prevState,
            ["initialenMidden"]: "",
            ["naamMidden"]: "",
            ["datumMidden"]: "",
            ["woord1Midden"]: "",
            ["woord2Midden"]: "",
            ["woord3Midden"]: "",
            ["woord4Midden"]: "",
            // ["lettertypeMidden"]: "",
          }));
          break;

        default:
          if (
            gravureMidden == "" &&
            checkmark.find((item) => item.name === "Midden").status
          ) {
            setError((prevState) => ({
              ...prevState,
              ["gravureMidden"]: "Veld mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["gravureMidden"]: "",
            }));
          }
      }

      switch (gravureRechts) {
        case "Initialen/letters/tekens":
          if (initialenValueRechts == "") {
            setError((prevState) => ({
              ...prevState,
              ["initialenRechts"]: "Veld initiaal mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["initialenRechts"]: "",
            }));
          }
          // if (lettertypeValueRechts == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeRechts"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeRechts"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["gravureRechts"]: "",
            ["naamRechts"]: "",
            ["datumRechts"]: "",
            ["gravureRechts"]: "",
            ["woord1Rechts"]: "",
            ["woord2Rechts"]: "",
            ["woord3Rechts"]: "",
            ["woord4Rechts"]: "",
          }));
          break;
        case "Geen tekst":
          setError((prevState) => ({
            ...prevState,
            ["gravureRechts"]: "",
            ["initialenRechts"]: "",
            // ["lettertypeRechts"]: "",
            ["naamRechts"]: "",
            ["datumRechts"]: "",
            ["gravureRechts"]: "",
            ["woord1Rechts"]: "",
            ["woord2Rechts"]: "",
            ["woord3Rechts"]: "",
            ["woord4Rechts"]: "",
          }));
          break;
        case "Hartje ♥ symbool":
        case "Infinity ∞ teken":
          setError((prevState) => ({
            ...prevState,
            ["gravureRechts"]: "",
            ["initialenRechts"]: "",
            ["naamRechts"]: "",
            ["datumRechts"]: "",
            ["gravureRechts"]: "",
            ["woord1Rechts"]: "",
            ["woord3Rechts"]: "",
            ["woord4Rechts"]: "",
            // ["lettertypeRechts"]: "",
          }));
          break;
        case "Datum":
          if (datumValueRechts == "") {
            setError((prevState) => ({
              ...prevState,
              ["datumRechts"]: "Veld datum mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["datumRechts"]: "",
            }));
          }
          // if (lettertypeValueRechts == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeRechts"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeRechts"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["gravureRechts"]: "",
            ["initialenRechts"]: "",
            ["naamRechts"]: "",
            ["gravureRechts"]: "",
            ["woord1Rechts"]: "",
            ["woord2Rechts"]: "",
            ["woord3Rechts"]: "",
            ["woord4Rechts"]: "",
          }));
          break;
        case "Naam":
          if (naamValueRechts == "") {
            setError((prevState) => ({
              ...prevState,
              ["naamRechts"]: "Veld naam mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["naamRechts"]: "",
            }));
          }
          // if (lettertypeValueRechts == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeRechts"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeRechts"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["gravureRechts"]: "",
            ["initialenRechts"]: "",
            ["datumRechts"]: "",
            ["gravureRechts"]: "",
            ["woord1Rechts"]: "",
            ["woord2Rechts"]: "",
            ["woord3Rechts"]: "",
            ["woord4Rechts"]: "",
          }));
          break;
        case "Naam en datum":
          if (naamValueRechts == "") {
            setError((prevState) => ({
              ...prevState,
              ["naamRechts"]: "Veld naam mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["naamRechts"]: "",
            }));
          }
          if (datumValueRechts == "") {
            setError((prevState) => ({
              ...prevState,
              ["datumRechts"]: "Veld datum mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["datumRechts"]: "",
            }));
          }
          // if (lettertypeValueRechts == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeRechts"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeRechts"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["gravureRechts"]: "",
            ["initialenRechts"]: "",
            ["gravureRechts"]: "",
            ["woord1Rechts"]: "",
            ["woord2Rechts"]: "",
            ["woord3Rechts"]: "",
            ["woord4Rechts"]: "",
          }));
        case "1 woord":
          if (woord1ValueRechts == "") {
            setError((prevState) => ({
              ...prevState,
              ["woord1Rechts"]: "Dit veld mag niet leeg zijn",
            }));
          } else if (woord1ValueRechts.includes(" ")) {
            setError((prevState) => ({
              ...prevState,
              ["woord1Rechts"]: "Dit veld mag geen spatie bevatten",
            }));
          } else if (woord1ValueRechts.length > 11) {
            setError((prevState) => ({
              ...prevState,
              ["woord1Rechts"]: "Gebruik maximaal 11 karakters",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["woord1Rechts"]: "",
            }));
          }
          // if (lettertypeValueRechts == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeRechts"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeRechts"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["gravureRechts"]: "",
            ["initialenRechts"]: "",
            ["naamRechts"]: "",
            ["datumRechts"]: "",
            ["gravureRechts"]: "",
            ["woord2Rechts"]: "",
            ["woord3Rechts"]: "",
            ["woord4Rechts"]: "",
          }));
          break;
        case "2 woorden":
          if (woord2ValueRechts == "") {
            setError((prevState) => ({
              ...prevState,
              ["woord2Rechts"]: "Veld woord 2 mag niet leeg zijn",
            }));
          } else if (woord2ValueRechts.length > 18) {
            setError((prevState) => ({
              ...prevState,
              ["woord2Rechts"]: "Gebruik maximaal 18 karakters",
            }));
          } else if (woord2ValueRechts.split(" ").length > 2) {
            setError((prevState) => ({
              ...prevState,
              ["woord2Rechts"]:
                "Dit veld mag niet meer dan één spatie bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["woord2Rechts"]: "",
            }));
          }
          // if (lettertypeValueRechts == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeRechts"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeRechts"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["gravureRechts"]: "",
            ["initialenRechts"]: "",
            ["naamRechts"]: "",
            ["datumRechts"]: "",
            ["gravureRechts"]: "",
            ["woord1Rechts"]: "",
            ["woord3Rechts"]: "",
            ["woord4Rechts"]: "",
          }));
          break;
        case "3 woorden":
          if (woord3ValueRechts == "") {
            setError((prevState) => ({
              ...prevState,
              ["woord3Rechts"]: "Veld woord 3 mag niet leeg zijn",
            }));
          } else if (woord3ValueRechts.length > 24) {
            setError((prevState) => ({
              ...prevState,
              ["woord3Rechts"]: "Gebruik maximaal 24 karakters",
            }));
          } else if (woord3ValueRechts.split(" ").length > 3) {
            setError((prevState) => ({
              ...prevState,
              ["woord3Rechts"]:
                "Dit veld mag niet meer dan twee spaties bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["woord3Rechts"]: "",
            }));
          }
          // if (lettertypeValueRechts == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeRechts"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeRechts"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["gravureRechts"]: "",
            ["initialenRechts"]: "",
            ["naamRechts"]: "",
            ["datumRechts"]: "",
            ["gravureRechts"]: "",
            ["woord1Rechts"]: "",
            ["woord2Rechts"]: "",
            ["woord4Rechts"]: "",
          }));
          break;
        case "4 woorden":
          if (woord4ValueRechts == "") {
            setError((prevState) => ({
              ...prevState,
              ["woord4Rechts"]: "Veld woord 4 mag niet leeg zijn",
            }));
          } else if (woord4ValueRechts.length > 30) {
            setError((prevState) => ({
              ...prevState,
              ["woord4Rechts"]: "Gebruik maximaal 30 karakters",
            }));
          } else if (woord4ValueRechts.split(" ").length > 3) {
            setError((prevState) => ({
              ...prevState,
              ["woord4Rechts"]:
                "Dit veld mag niet meer dan drie spatie bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["woord4Rechts"]: "",
            }));
          }
          // if (lettertypeValueRechts == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeRechts"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeRechts"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["gravureRechts"]: "",
            ["initialenRechts"]: "",
            ["naamRechts"]: "",
            ["datumRechts"]: "",
            ["gravureRechts"]: "",
            ["woord1Rechts"]: "",
            ["woord2Rechts"]: "",
            ["woord3Rechts"]: "",
          }));
          break;
        case "Voet/handafdruk":
        case "Poot/snuitafdruk":
        case "Echo":
        case "Vingerafdruk":
        case "Logo/handtekening":
        case "Twee vingerafdrukken in hartvorm":
          if (uploadValueRechts == "" || uploadValueRechts == null) {
            setError((prevState) => ({
              ...prevState,
              ["uploadRechts"]: "* Upload een bestand",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["uploadRechts"]: "",
            }));
          }
          setError((prevState) => ({
            ...prevState,
            ["initialenRechts"]: "",
            ["naamRechts"]: "",
            ["datumRechts"]: "",
            ["woord1Rechts"]: "",
            ["woord2Rechts"]: "",
            ["woord3Rechts"]: "",
            ["woord4Rechts"]: "",
            // ["lettertypeRechts"]: "",
          }));
          break;

        default:
          if (
            gravureRechts == "" &&
            checkmark.find((item) => item.name === "Rechts").status
          ) {
            setError((prevState) => ({
              ...prevState,
              ["gravureRechts"]: "Veld mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["gravureRechts"]: "",
            }));
          }
      }

      switch (gravureAchter) {
        case "Initialen/letters/tekens":
          if (initialenValueAchter == "") {
            setError((prevState) => ({
              ...prevState,
              ["initialenAchter"]: "Veld initiaal mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["initialenAchter"]: "",
            }));
          }
          // if (lettertypeValueAchter == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeAchter"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeAchter"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["gravureAchter"]: "",
            ["naamAchter"]: "",
            ["datumAchter"]: "",
            ["gravureAchter"]: "",
            ["woord1Achter"]: "",
            ["woord2Achter"]: "",
            ["woord3Achter"]: "",
            ["woord4Achter"]: "",
          }));
          break;
        case "Geen tekst":
          setError((prevState) => ({
            ...prevState,
            ["gravureAchter"]: "",
            ["initialenAchter"]: "",
            // ["lettertypeAchter"]: "",
            ["naamAchter"]: "",
            ["datumAchter"]: "",
            ["gravureAchter"]: "",
            ["woord1Achter"]: "",
            ["woord2Achter"]: "",
            ["woord3Achter"]: "",
            ["woord4Achter"]: "",
          }));
          break;
        case "Hartje ♥ symbool":
        case "Infinity ∞ teken":
          setError((prevState) => ({
            ...prevState,
            ["gravureAchter"]: "",
            ["initialenAchter"]: "",
            ["naamAchter"]: "",
            ["datumAchter"]: "",
            ["gravureAchter"]: "",
            ["woord1Achter"]: "",
            ["woord3Achter"]: "",
            ["woord4Achter"]: "",
            // ["lettertypeAchter"]: "",
          }));
          break;
        case "Datum":
          if (datumValueAchter == "") {
            setError((prevState) => ({
              ...prevState,
              ["datumAchter"]: "Veld datum mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["datumAchter"]: "",
            }));
          }
          // if (lettertypeValueAchter == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeAchter"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeAchter"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["gravureAchter"]: "",
            ["initialenAchter"]: "",
            ["naamAchter"]: "",
            ["gravureAchter"]: "",
            ["woord1Achter"]: "",
            ["woord2Achter"]: "",
            ["woord3Achter"]: "",
            ["woord4Achter"]: "",
          }));
          break;
        case "Naam":
          if (naamValueAchter == "") {
            setError((prevState) => ({
              ...prevState,
              ["naamAchter"]: "Veld naam mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["naamAchter"]: "",
            }));
          }
          // if (lettertypeValueAchter == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          // ["lettertypeAchter"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeAchter"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["gravureAchter"]: "",
            ["initialenAchter"]: "",
            ["datumAchter"]: "",
            ["gravureAchter"]: "",
            ["woord1Achter"]: "",
            ["woord2Achter"]: "",
            ["woord3Achter"]: "",
            ["woord4Achter"]: "",
          }));
          break;
        case "Naam en datum":
          if (naamValueAchter == "") {
            setError((prevState) => ({
              ...prevState,
              ["naamAchter"]: "Veld naam mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["naamAchter"]: "",
            }));
          }
          if (datumValueAchter == "") {
            setError((prevState) => ({
              ...prevState,
              ["datumAchter"]: "Veld datum mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["datumAchter"]: "",
            }));
          }
          // if (lettertypeValueAchter == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeAchter"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeAchter"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["gravureAchter"]: "",
            ["initialenAchter"]: "",
            ["gravureAchter"]: "",
            ["woord1Achter"]: "",
            ["woord2Achter"]: "",
            ["woord3Achter"]: "",
            ["woord4Achter"]: "",
          }));
        case "1 woord":
          if (woord1ValueAchter == "") {
            setError((prevState) => ({
              ...prevState,
              ["woord1Achter"]: "Dit veld mag niet leeg zijn",
            }));
          } else if (woord1ValueAchter.includes(" ")) {
            setError((prevState) => ({
              ...prevState,
              ["woord1Achter"]: "Dit veld mag geen spatie bevatten",
            }));
          } else if (woord1ValueAchter.length > 11) {
            setError((prevState) => ({
              ...prevState,
              ["woord1Achter"]: "Gebruik maximaal 11 karakters",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["woord1Achter"]: "",
            }));
          }
          // if (lettertypeValueAchter == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeAchter"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeAchter"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["gravureAchter"]: "",
            ["initialenAchter"]: "",
            ["naamAchter"]: "",
            ["datumAchter"]: "",
            ["gravureAchter"]: "",
            ["woord2Achter"]: "",
            ["woord3Achter"]: "",
            ["woord4Achter"]: "",
          }));
          break;
        case "2 woorden":
          if (woord2ValueAchter == "") {
            setError((prevState) => ({
              ...prevState,
              ["woord2Achter"]: "Veld woord 2 mag niet leeg zijn",
            }));
          } else if (woord2ValueAchter.length > 18) {
            setError((prevState) => ({
              ...prevState,
              ["woord2Achter"]: "Gebruik maximaal 18 karakters",
            }));
          } else if (woord2ValueAchter.split(" ").length > 2) {
            setError((prevState) => ({
              ...prevState,
              ["woord2Achter"]:
                "Dit veld mag niet meer dan één spatie bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["woord2Achter"]: "",
            }));
          }
          // if (lettertypeValueAchter == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeAchter"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeAchter"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["gravureAchter"]: "",
            ["initialenAchter"]: "",
            ["naamAchter"]: "",
            ["datumAchter"]: "",
            ["gravureAchter"]: "",
            ["woord1Achter"]: "",
            ["woord3Achter"]: "",
            ["woord4Achter"]: "",
          }));
          break;
        case "3 woorden":
          if (woord3ValueAchter == "") {
            setError((prevState) => ({
              ...prevState,
              ["woord3Achter"]: "Veld woord 3 mag niet leeg zijn",
            }));
          } else if (woord3ValueAchter.length > 24) {
            setError((prevState) => ({
              ...prevState,
              ["woord3Achter"]: "Gebruik maximaal 24 karakters",
            }));
          } else if (woord3ValueAchter.split(" ").length > 3) {
            setError((prevState) => ({
              ...prevState,
              ["woord3Achter"]:
                "Dit veld mag niet meer dan twee spaties bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["woord3Achter"]: "",
            }));
          }
          // if (lettertypeValueAchter == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeAchter"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeAchter"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["gravureAchter"]: "",
            ["initialenAchter"]: "",
            ["naamAchter"]: "",
            ["datumAchter"]: "",
            ["gravureAchter"]: "",
            ["woord1Achter"]: "",
            ["woord2Achter"]: "",
            ["woord4Achter"]: "",
          }));
          break;
        case "4 woorden":
          if (woord4ValueAchter == "") {
            setError((prevState) => ({
              ...prevState,
              ["woord4Achter"]: "Veld woord 4 mag niet leeg zijn",
            }));
          } else if (woord4ValueAchter.length > 30) {
            setError((prevState) => ({
              ...prevState,
              ["woord4Achter"]: "Gebruik maximaal 30 karakters",
            }));
          } else if (woord4ValueAchter.split(" ").length > 3) {
            setError((prevState) => ({
              ...prevState,
              ["woord4Achter"]:
                "Dit veld mag niet meer dan drie spatie bevatten",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["woord4Achter"]: "",
            }));
          }
          // if (lettertypeValueAchter == "") {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeAchter"]: "Kies een lettertype",
          //   }));
          // } else {
          //   setError((prevState) => ({
          //     ...prevState,
          //     ["lettertypeAchter"]: "",
          //   }));
          // }
          setError((prevState) => ({
            ...prevState,
            ["gravureAchter"]: "",
            ["initialenAchter"]: "",
            ["naamAchter"]: "",
            ["datumAchter"]: "",
            ["gravureAchter"]: "",
            ["woord1Achter"]: "",
            ["woord2Achter"]: "",
            ["woord3Achter"]: "",
          }));
          break;
        case "Voet/handafdruk":
        case "Poot/snuitafdruk":
        case "Echo":
        case "Vingerafdruk":
        case "Logo/handtekening":
        case "Twee vingerafdrukken in hartvorm":
          if (uploadValueAchter == "" || uploadValueAchter == null) {
            setError((prevState) => ({
              ...prevState,
              ["uploadAchter"]: "* Upload een bestand",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["uploadAchter"]: "",
            }));
          }
          setError((prevState) => ({
            ...prevState,
            ["initialenAchter"]: "",
            ["naamAchter"]: "",
            ["datumAchter"]: "",
            ["woord1Achter"]: "",
            ["woord2Achter"]: "",
            ["woord3Achter"]: "",
            ["woord4Achter"]: "",
            // ["lettertypeAchter"]: "",
          }));
          break;

        default:
          if (
            gravureAchter == "" &&
            checkmark.find((item) => item.name === "Achter").status
          ) {
            setError((prevState) => ({
              ...prevState,
              ["gravureAchter"]: "Veld mag niet leeg zijn",
            }));
          } else {
            setError((prevState) => ({
              ...prevState,
              ["gravureAchter"]: "",
            }));
          }
      }

      // Lettertype check
      if (
        gravureLinks == "Initialen/letters/tekens" ||
        gravureLinks == "Naam" ||
        gravureLinks == "Naam en datum" ||
        gravureLinks == "Datum" ||
        gravureLinks == "1 woord" ||
        gravureLinks == "2 woorden" ||
        gravureLinks == "3 woorden" ||
        gravureLinks == "4 woorden" ||
        gravureMidden == "Initialen/letters/tekens" ||
        gravureMidden == "Naam" ||
        gravureMidden == "Naam en datum" ||
        gravureMidden == "Datum" ||
        gravureMidden == "1 woord" ||
        gravureMidden == "2 woorden" ||
        gravureMidden == "3 woorden" ||
        gravureMidden == "4 woorden" ||
        gravureRechts == "Initialen/letters/tekens" ||
        gravureRechts == "Naam" ||
        gravureRechts == "Naam en datum" ||
        gravureRechts == "Datum" ||
        gravureRechts == "1 woord" ||
        gravureRechts == "2 woorden" ||
        gravureRechts == "3 woorden" ||
        gravureRechts == "4 woorden" ||
        gravureAchter == "Initialen/letters/tekens" ||
        gravureAchter == "Naam" ||
        gravureAchter == "Naam en datum" ||
        gravureAchter == "Datum" ||
        gravureAchter == "1 woord" ||
        gravureAchter == "2 woorden" ||
        gravureAchter == "3 woorden" ||
        gravureAchter == "4 woorden"
      ) {
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
      if (
        gravureMidden == "Geen tekst" ||
        gravureMidden == "Initialen/letters/tekens" ||
        gravureMidden == "Hartje ♥ symbool" ||
        gravureMidden == "Infinity ∞ teken" ||
        gravureMidden == "Naam en datum" ||
        gravureMidden == "Naam" ||
        gravureMidden == "Datum" ||
        gravureMidden == "1 woord" ||
        gravureMidden == "2 woorden" ||
        gravureMidden == "3 woorden" ||
        gravureMidden == "4 woorden" ||
        gravureMidden == "Voet/handafdruk" ||
        gravureMidden == "Poot/snuitafdruk" ||
        gravureMidden == "Echo" ||
        gravureMidden == "Vingerafdruk" ||
        gravureMidden == "Logo/handtekening" ||
        gravureMidden == "Twee vingerafdrukken in hartvorm"
      ) {
        setError((prevState) => ({
          ...prevState,
          ["gravureMidden"]: "",
        }));
      }
      if (
        gravureRechts == "Geen tekst" ||
        gravureRechts == "Initialen/letters/tekens" ||
        gravureRechts == "Hartje ♥ symbool" ||
        gravureRechts == "Infinity ∞ teken" ||
        gravureRechts == "Naam en datum" ||
        gravureRechts == "Naam" ||
        gravureRechts == "Datum" ||
        gravureRechts == "1 woord" ||
        gravureRechts == "2 woorden" ||
        gravureRechts == "3 woorden" ||
        gravureRechts == "4 woorden" ||
        gravureRechts == "Voet/handafdruk" ||
        gravureRechts == "Poot/snuitafdruk" ||
        gravureRechts == "Echo" ||
        gravureRechts == "Vingerafdruk" ||
        gravureRechts == "Logo/handtekening" ||
        gravureRechts == "Twee vingerafdrukken in hartvorm"
      ) {
        setError((prevState) => ({
          ...prevState,
          ["gravureRechts"]: "",
        }));
      }
      if (
        gravureAchter == "Geen tekst" ||
        gravureAchter == "Initialen/letters/tekens" ||
        gravureAchter == "Hartje ♥ symbool" ||
        gravureAchter == "Infinity ∞ teken" ||
        gravureAchter == "Naam en datum" ||
        gravureAchter == "Naam" ||
        gravureAchter == "Datum" ||
        gravureAchter == "1 woord" ||
        gravureAchter == "2 woorden" ||
        gravureAchter == "3 woorden" ||
        gravureAchter == "4 woorden" ||
        gravureAchter == "Voet/handafdruk" ||
        gravureAchter == "Poot/snuitafdruk" ||
        gravureAchter == "Echo" ||
        gravureAchter == "Vingerafdruk" ||
        gravureAchter == "Logo/handtekening" ||
        gravureAchter == "Twee vingerafdrukken in hartvorm"
      ) {
        setError((prevState) => ({
          ...prevState,
          ["gravureAchter"]: "",
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
    { key: "initialenLinks", value: value?.initialenLinks?.value || "" },
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
    { key: "initialenMidden", value: value?.initialenMidden?.value || "" },
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
    { key: "initialenRechts", value: value?.initialenRechts?.value || "" },
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
    { key: "initialenAchter", value: value?.initialenAchter?.value || "" },
    { key: "datumAchter", value: value?.datumAchter?.value || "" },
    { key: "naamAchter", value: value?.naamAchter?.value || "" },
    { key: "1 woordAchter", value: value?.woord1Achter?.value || "" },
    { key: "2 woordenAchter", value: value?.woord2Achter?.value || "" },
    { key: "3 woordenAchter", value: value?.woord3Achter?.value || "" },
    { key: "4 woordenAchter", value: value?.woord4Achter?.value || "" },
    { key: "uploadAchter", value: value?.uploadAchter?.value || "" },

    { key: "lettertype", value: value?.lettertype?.value || "" },
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

    setValues((prevValues) =>
      prevValues.map((item) =>
        item.key === changedKey ? { ...item, value: newValue } : item
      )
    );

    onChange(values);
  };
  const gravureLinks = values.find((item) => item.key === "gravureLinks").value;

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
            <div className="flex flex-col gap-6" key={option.name}>
              <div className="relative">
                {showErrors && (
                  <p className="absolute  -bottom-6 left-0 text-red-700">
                    {error[`gravure${option.name}`]}
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
              {gravureOption == "Initialen/letters/tekens" && (
                <div className="relative">
                  {showErrors && (
                    <p className="absolute  -bottom-6 left-0 text-red-700">
                      {error[`initialenLinks${option.name}`]}
                    </p>
                  )}
                  <InputTextField
                    value={
                      values.find(
                        (item) => item.key === `initialen${option.name}`
                      )?.value || ""
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
                      values.find((item) => item.key === `datum${option.name}`)
                        ?.value || ""
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
                      values.find((item) => item.key === `naam${option.name}`)
                        ?.value || ""
                    }
                    onChange={(newNaamValue) =>
                      handleChange(`naam${option.name}`, newNaamValue)
                    }
                    title="Naam:"
                  />
                </div>
              )}
              {gravureOption == "1 woord" && (
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
              {gravureOption == "2 woorden" && (
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
                      values.find(
                        (item) => item.key === `3 woorden${option.name}`
                      )?.value || ""
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
                      values.find(
                        (item) => item.key === `4 woorden${option.name}`
                      )?.value || ""
                    }
                    onChange={(new4WoordenValue) =>
                      handleChange(`4 woorden${option.name}`, new4WoordenValue)
                    }
                    title="4 Woorden:"
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
                    title="bestand toevoegen:"
                    onChange={(newUploadValue) =>
                      handleChange(`upload${option.name}`, newUploadValue)
                    }
                    value={
                      values.find((item) => item.key === `upload${option.name}`)
                        ?.value || ""
                    }
                  />
                </div>
              )}
            </div>
          );
        }
      })}
      {(gravureLinks == "Initialen/letters/tekens" ||
        gravureLinks == "Naam" ||
        gravureLinks == "Naam en datum" ||
        gravureLinks == "Datum" ||
        gravureLinks == "1 woord" ||
        gravureLinks == "2 woorden" ||
        gravureLinks == "3 woorden" ||
        gravureLinks == "4 woorden") && (
        // ||
        // gravureMidden == "Initialen/letters/tekens" ||
        // gravureMidden == "Naam" ||
        // gravureMidden == "Naam en datum" ||
        // gravureMidden == "Datum" ||
        // gravureMidden == "1 woord" ||
        // gravureMidden == "2 woorden" ||
        // gravureMidden == "3 woorden" ||
        // gravureMidden == "4 woorden" ||
        // gravureRechts == "Initialen/letters/tekens" ||
        // gravureRechts == "Naam" ||
        // gravureRechts == "Naam en datum" ||
        // gravureRechts == "Datum" ||
        // gravureRechts == "1 woord" ||
        // gravureRechts == "2 woorden" ||
        // gravureRechts == "3 woorden" ||
        // gravureRechts == "4 woorden" ||
        // gravureAchter == "Initialen/letters/tekens" ||
        // gravureAchter == "Naam" ||
        // gravureAchter == "Naam en datum" ||
        // gravureAchter == "Datum" ||
        // gravureAchter == "1 woord" ||
        // gravureAchter == "2 woorden" ||
        // gravureAchter == "3 woorden" ||
        // gravureAchter == "4 woorden"
        <div className="relative">
          {showErrors && (
            <p className="absolute  -bottom-6  left-0 text-red-700">
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
