"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";

import InputRadio from "../InputRadio";
import InputSelect from "../InputSelect";
import { Button, Modal } from "@mui/material";

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

      if (paraCrodSingle != "" && paracordMulti.length == 2) {
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
        if (paracordMulti.length !== 2) {
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
        setValues((prevValues) => prevValues.map((item) => item));
      } else {
        setValues((prevValues) =>
          prevValues.map((item) =>
            item.key === changedKey ? { ...item, value: newValue } : item
          )
        );
      }
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

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="relative">
        {showErrors && (
          <p className="absolute  -bottom-6 left-0 text-red-700">
            {error["paracordSingle"]}
          </p>
        )}
        <div className="flex flex-row gap-6">
          <div className="min-w-[150px]">
            <InputRadio
              value={
                values.find((item) => item.key === "paracordSingle")?.value ||
                ""
              }
              onChange={(paracordSingle) =>
                handleChange("paracordSingle", paracordSingle)
              }
              title="Para koord 1e keuze:"
              options={paraCordOptions}
            />
          </div>
          <div className="w-auto h-auto pt-10">
            <Button onClick={handleOpen}>
              <Image src={"/images/paracords.jpg"} width={190} height={250} />
            </Button>
          </div>
        </div>
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
          title="Para koord extra:"
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[750px] max-h-[750px]">
          <Image
            src={"/images/satijnen.jpeg"}
            className="mx-auto my-auto h-full w-auto rounded-lg"
            width={750}
            height={750}
          />
        </div>
      </Modal>
    </>
  );
}
