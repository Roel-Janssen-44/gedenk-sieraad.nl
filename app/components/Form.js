"use client";

import Link from "next/link";
import React, { useState, useRef } from "react";
import { Button } from "@mui/material";

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default function Form() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    checkbox: false,
  });

  const form = useRef(null);

  const [status, setStatus] = useState("");
  const [loader, setLoader] = useState(false);
  const [nameErrorValue, setNameErrorValue] = useState("");
  let nameError = true;
  const [emailErrorValue, setEmailErrorValue] = useState("");
  let emailError = true;
  const [phoneErrorValue, setPhoneErrorValue] = useState("");
  let phoneError = true;
  const [messageErrorValue, setMessageErrorValue] = useState("");
  let messageError = true;
  const [checkboxErrorValue, setCheckboxErrorValue] = useState("");
  let checkboxError = true;

  const [sendStatus, setSendStatus] = useState("");

  const handleChange = (event) => {
    if (event.target.id === "checkbox") {
      setInputs((values) => ({ ...values, ["checkbox"]: !inputs.checkbox }));
      return;
    }
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleName = () => {
    if (inputs.name === "" || inputs.name === undefined) {
      nameError = true;
      setNameErrorValue("vul een naam in");
      return;
    }
    if (inputs.name !== "") {
      nameError = false;
      setNameErrorValue("");
    }
  };
  const handleEmail = () => {
    if (inputs.email === "" || inputs.email === undefined) {
      emailError = true;
      setEmailErrorValue("vul een email in");
      return;
    }
    if (inputs.email !== "") {
      emailError = false;
      setEmailErrorValue("");
    }
  };
  const handlePhone = () => {
    if (inputs.phone === "" || inputs.phone === undefined) {
      phoneError = true;
      setPhoneErrorValue("vul een telefoonnummer in");
      return;
    }
    if (inputs.phone !== "") {
      phoneError = false;
      setPhoneErrorValue("");
    }
  };
  const handleMessage = () => {
    messageError = false;
    setMessageErrorValue("");
  };
  //   const handleCheckbox = () => {
  //     if (inputs.checkbox) {
  //       checkboxError = false;
  //       setCheckboxErrorValue("");
  //       return;
  //     }
  //     setCheckboxErrorValue(
  //       "U dient akkoord te gaan met de algemene voorwaarden"
  //     );
  //   };

  const handleForm = (event) => {
    handleName();
    handleEmail();
    handlePhone();
    handleMessage();
    // handleCheckbox();
    if (
      nameError === false &&
      emailError === false &&
      phoneError === false &&
      messageError === false
      //   checkboxError === false
    ) {
      setLoader(true);
      setStatus("");
      handleSubmit(event, inputs);
    }
  };

  const handleSubmit = async (event, inputs) => {
    event.preventDefault();
    setSendStatus("Aan het laden...");
    const data = new FormData(form.current);
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setSendStatus("Verzonden");
        } else {
          setSendStatus(
            "Wegens een technische storing is het formulier niet verzonden."
          );
        }
      });
  };

  return (
    <>
      <p
        className={`text-xl mb-10 ml-1 ${
          sendStatus === "Verzonden" ? "text-green-600" : ""
        } 
      ${sendStatus === "Aan het laden..." ? "text-gray" : ""}
      ${
        sendStatus ===
        "Wegens een technische storing is het formulier niet verzonden."
          ? "text-red-600"
          : ""
      }`}
      >
        {sendStatus}
      </p>
      <form ref={form}>
        <input
          type="hidden"
          name="access_key"
          value="6e41f45f-095a-4428-a182-5bd54e9a2c37"
        />
        {/* <input
          type="hidden"
          name="subject"
          value="Contactformulier Websidesign"
        /> */}
        {/* <input type="hidden" name="form-name" value="Websidesign-ContactForm" /> */}
        <div className="w-full md:top-20 max-w-md mx-auto sm:max-w-none">
          <div className="relative mb-8 w-10/12 sm:w-8/12 mx-auto md:ml-0 md:w-full lg:w-[47.5%] lg:mr-[2.5%] lg:inline-block">
            <input
              onChange={handleChange}
              className="text-gray peer border-b-2 border-blue py-2 px-2 mb-1 w-full placeholder-transparent focus:outline-none"
              type="text"
              id="name"
              name="name"
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="cursor-auto font-bold peer-placeholder-shown:font-normal peer-focus:font-bold absolute ml-2 left-0 text-blue opacity-100 -top-4 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:opacity-85 peer-focus:-top-4 peer-focus:opacity-100 peer-focus:text-sm"
            >
              Naam *
            </label>
            <p className="text-[red] w-full">{nameErrorValue}</p>
          </div>
          <div className="relative mb-8 w-10/12 sm:w-8/12 mx-auto md:ml-0 md:w-full lg:w-[47.5%] lg:ml-[2.5%] lg:inline-block">
            <input
              onChange={handleChange}
              className="text-gray peer border-b-2 border-blue py-2 px-2 mb-1 w-full placeholder-transparent focus:outline-none"
              type="text"
              id="phone"
              name="phone"
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="cursor-auto font-bold peer-placeholder-shown:font-normal peer-focus:font-bold absolute ml-2 left-0 text-blue opacity-100 -top-4 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:opacity-85 peer-focus:-top-4 peer-focus:opacity-100 peer-focus:text-sm"
            >
              Telefoonnummer *
            </label>
            <p className="text-[red] w-full">{phoneErrorValue}</p>
          </div>
          <div className="relative mb-8 w-10/12 sm:w-8/12 mx-auto md:ml-0 md:w-full">
            <input
              onChange={handleChange}
              className="text-gray peer border-b-2 border-blue py-2 px-2 mb-1 w-full placeholder-transparent focus:outline-none"
              type="text"
              id="email"
              name="email"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="cursor-auto font-bold peer-placeholder-shown:font-normal peer-focus:font-bold absolute ml-2 left-0 text-blue opacity-100 -top-4 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:opacity-85 peer-focus:-top-4 peer-focus:opacity-100 peer-focus:text-sm"
            >
              Email *
            </label>
            <p className="text-[red] w-full">{emailErrorValue}</p>
          </div>
          <div className="relative mb-8 w-10/12 sm:w-8/12 mx-auto md:ml-0 md:w-full">
            <textarea
              onChange={handleChange}
              className="text-gray peer border-b-2 border-blue py-2 px-2 mb-1 w-full placeholder-transparent focus:outline-none"
              rows={3}
              id="message"
              name="message"
              placeholder=" "
            />
            <label
              htmlFor="message"
              className="cursor-auto font-bold absolute ml-2 left-0 text-blue opacity-100 -top-4 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:font-normal peer-placeholder-shown:text-base peer-placeholder-shown:opacity-85 peer-focus:-top-4 peer-focus:opacity-100 peer-focus:text-sm peer-focus:font-bold"
            >
              Bericht
            </label>
            <p className="text-[red] w-full">{messageErrorValue}</p>
          </div>

          {/* <div className="w-10/12 sm:w-8/12 mx-auto md:ml-0 md:w-full mb-8 -mt-4">
            <input
              className="text-blue peer border-b-2 mr-2 border-blue py-2 px-2 mb-1"
              type="checkbox"
              id="checkbox"
              name="checkbox"
              onChange={handleChange}
            />
            <label htmlFor="checkbox" className="cursor-auto text-black">
              Ik heb de
              <Link
                href="/algemene-voorwaarden"
                className="font-bold text-blue font-swiss"
                target="_blank"
              >
                {" "}
                Algemene voorwaarden{" "}
              </Link>
              en
              <Link
                href="/privacy-verklaring"
                className="font-bold text-blue font-swiss"
                target="_blank"
              >
                {" "}
                Privacy verklaring{" "}
              </Link>
              gelezen en ga hiermee akkoord *
            </label>
            <p className="text-[red] w-full">{checkboxErrorValue}</p>
          </div> */}

          <div className="w-10/12 sm:w-8/12 mx-auto md:ml-0 md:w-full">
            <Button
              onClick={() => {
                handleForm(event);
                setLoader(false);
                setStatus("");
              }}
              size="large"
              variant="contained"
              className="bg-primary border-2 text-white "
            >
              Verzenden
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
