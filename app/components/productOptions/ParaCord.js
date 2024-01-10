"use client";

import { useState, useEffect, useRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";

import InputRadio from "../InputRadio";
import InputSelect from "../InputSelect";

import { paraCordOptions } from "./optionSets";

export default function ParaCord({
  value,
  onChange,
  setOptionErrors,
  showErrors,
}) {
  const [error, setError] = useState([]);

  useEffect(() => {
    if (Array.isArray(value)) {
      const paraCrodSingle = value.find(
        (item) => item.key === "paracordSingle"
      ).value;
      const paracordMulti = value.find(
        (item) => item.key === "paracordMulti"
      ).value;

      if (paraCrodSingle != "" && paracordMulti != "") {
        setError([]);
        setOptionErrors((prevState) => ({
          ...prevState,
          ["paracord"]: false,
        }));
      } else {
        setOptionErrors((prevState) => ({
          ...prevState,
          ["paracord"]: true,
        }));
        if (paraCrodSingle == "") {
          setError((prevState) => ({
            ...prevState,
            ["paracordSingle"]: "* Kies een optie",
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            ["paracordSingle"]: "",
          }));
        }
        console.log("paracordMulti");
        console.log(paracordMulti);
        if (paracordMulti.length != 2) {
          setError((prevState) => ({
            ...prevState,
            ["paracordMulti"]: "* Selecteer twee extra paracords",
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            ["paracordMulti"]: "",
          }));
        }
      }
    }
  }, [value]);

  const [values, setValues] = useState([
    { key: "paracordSingle", value: value?.paracordSingle?.value || "" },
    { key: "paracordMulti", value: value?.paracordMulti?.value || [] },
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
    if (changedKey == "paracordMulti") {
      if (newValue.length > 2) {
        setError((prevState) => ({
          ...prevState,
          ["paracordMulti"]: "* Selecteer maximaal twee extra paracords",
        }));
        setOpenSnackbar(true);
        return null;
      }
      setValues((prevValues) =>
        prevValues.map((item) =>
          item.key === changedKey ? { ...item, value: newValue } : item
        )
      );
    } else {
      setValues((prevValues) =>
        prevValues.map((item) =>
          item.key === changedKey ? { ...item, value: newValue } : item
        )
      );
    }

    onChange(values);
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const closeSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <div className="relative">
        {showErrors && (
          <p className="absolute  -bottom-6 left-0 text-red-700">
            {error["paracordSingle"]}
          </p>
        )}
        <InputRadio
          value={
            values.find((item) => item.key === "paracordSingle")?.value || ""
          }
          onChange={(paracordSingle) =>
            handleChange("paracordSingle", paracordSingle)
          }
          title="paracordSingle:"
          options={paraCordOptions}
        />
      </div>
      <div className="relative">
        {showErrors && (
          <p className="absolute  -bottom-6 left-0 text-red-700">
            {error["paracordMulti"]}
          </p>
        )}
        <InputSelect
          multiple={true}
          value={
            values.find((item) => item.key === "paracordMulti")?.value || ""
          }
          onChange={(paracordMulti) =>
            handleChange("paracordMulti", paracordMulti)
          }
          title="paracordMulti:"
          options={paraCordOptions}
        />
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        message="Selecteer maximaal twee extra paracords"
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Selecteer maximaal twee extra paracords
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={closeSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Alert>
      </Snackbar>
    </>
  );
}
