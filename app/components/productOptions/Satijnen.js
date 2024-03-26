"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import { Button, Modal } from "@mui/material";

import InputRadio from "../InputRadio";
import InputSelect from "../InputSelect";

import { satijnenOptions } from "./optionSets";

export default function Satijnen({
  value,
  onChange,
  setOptionErrors,
  showErrors,
}) {
  const [error, setError] = useState([]);

  useEffect(() => {
    if (Array.isArray(value)) {
      const paraCrodSingle = value.find(
        (item) => item.key === "satijnenSingle"
      ).value;
      const satijnenMulti = value.find(
        (item) => item.key === "satijnenMulti"
      ).value;

      if (paraCrodSingle != "" && satijnenMulti.length == 4) {
        setError([]);
        setOptionErrors((prevState) => ({
          ...prevState,
          ["satijnen"]: false,
        }));
      } else {
        setOptionErrors((prevState) => ({
          ...prevState,
          ["satijnen"]: true,
        }));
        if (paraCrodSingle == "") {
          setError((prevState) => ({
            ...prevState,
            ["satijnenSingle"]: "* Kies een optie",
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            ["satijnenSingle"]: "",
          }));
        }
        console.log("satijnenMulti");
        console.log(satijnenMulti);
        if (satijnenMulti.length !== 4) {
          setError((prevState) => ({
            ...prevState,
            ["satijnenMulti"]: "* Selecteer vier extra satijnens",
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            ["satijnenMulti"]: "",
          }));
        }
      }
    }
  }, [value]);

  const [values, setValues] = useState([
    { key: "satijnenSingle", value: value?.satijnenSingle?.value || "" },
    { key: "satijnenMulti", value: value?.satijnenMulti?.value || [] },
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
    if (changedKey == "satijnenMulti") {
      if (newValue.length > 4) {
        setError((prevState) => ({
          ...prevState,
          ["satijnenMulti"]: "* Selecteer maximaal vier extra satijnen",
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
            {error["satijnenSingle"]}
          </p>
        )}
        <div className="flex flex-row gap-6">
          <div className="min-w-[150px]">
            <InputRadio
              value={
                values.find((item) => item.key === "satijnenSingle")?.value ||
                ""
              }
              onChange={(satijnenSingle) =>
                handleChange("satijnenSingle", satijnenSingle)
              }
              title="Satijnen armbandje 1e keuze:"
              options={satijnenOptions}
            />
          </div>
          <div className="w-auto h-auto pt-7">
            <div className="w-auto h-auto sticky top-10">
              <Button onClick={handleOpen}>
                <Image src={"/images/satijnen.jpeg"} width={150} height={235} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        {showErrors && (
          <p className="absolute -bottom-6 left-0 text-red-700">
            {error["satijnenMulti"]}
          </p>
        )}
        <InputSelect
          multiple={true}
          value={
            values.find((item) => item.key === "satijnenMulti")?.value || ""
          }
          onChange={(satijnenMulti) =>
            handleChange("satijnenMulti", satijnenMulti)
          }
          title="Satijnen armbandjes extra:"
          options={satijnenOptions}
        />
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        message="Selecteer maximaal twee extra satijnens"
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Selecteer maximaal vier extra satijnen
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
