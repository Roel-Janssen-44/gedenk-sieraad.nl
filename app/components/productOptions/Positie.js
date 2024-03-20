"use client";

import { useState, useEffect } from "react";

import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
} from "@mui/material";
import InputRadio from "../InputRadio";
import { posititeOptions, gravureOptions } from "./optionSets";

export default function Positie({
  value,
  onChange,
  setOptionErrors,
  showErrors,
}) {
  const [error, setError] = useState(null);

  const [checkedBoxes, setCheckedBoxes] = useState([]);
  // useEffect(() => {
  //   if (value.length === 0) {
  //     setError("* Kies een optie");
  //     setOptionErrors((prevState) => ({
  //       ...prevState,
  //       ["positie"]: true,
  //     }));
  //   } else {
  //     setError(null);
  //     setOptionErrors((prevState) => ({
  //       ...prevState,
  //       ["positie"]: false,
  //     }));
  //   }
  // }, [value]);

  // const handleChange = (newValue) => {
  //   onChange(newValue);
  //   setCheckedBoxes((prevState) => ({
  //     ...prevState,
  //     [newValue]: !prevState[newValue],
  //     // if (prevState.includes(newValue)) {
  //     //   return prevState.filter((value) => value !== newValue);
  //     // } else {
  //     //   return [...prevState, newValue];
  //     // }
  //     // )});
  //   }));
  // };

  // state = {
  //   gilad: true,
  //   jason: false,
  //   antoine: false,
  // };

  const handleChange = (name, event) => {
    console.log("name", name);
    console.log("event", event);
    setChecked((prevState) => ({
      ...prevState,
      [name]: event.target.checked,
    }));
    // setOptionErrors((prevState) => ({
    //   ...prevState,
    //   ["positie"]: true,
    // }));
    // setChecked({ [name]: event.target.checked });
  };

  const [checked, setChecked] = useState([
    { name: "links", status: false },
    { name: "midden", status: false },
    { name: "rechts", status: false },
    { name: "achter", status: false },
  ]);

  // const { gilad, jason, antoine } = this.state;
  // const error = [gilad, jason, antoine].filter(v => v).length !== 2;

  // return (
  //   <>
  //     <div>
  //       <div className="flex flex-wrap items-center text-sm mb-2">
  //         <span className="font-bold min-w-[140px]">Positie: </span>
  //       </div>
  //       <RadioGroup
  //         aria-labelledby="demo-radio-buttons-group-label"
  //         name="radio-buttons-group"
  //       >
  //         <FormGroup>
  //           {checked.map((option, index) => {
  //             return (
  //               <>
  //             <FormControlLabel
  //             control={
  //               <Checkbox checked={{option}} onChange={this.handleChange(option)} value={option} />
  //             }
  //             label="Gilad Gray"
  //           />
  //           <FormControlLabel

  //                 // {option.value}
  //                 {/* <FormControlLabel
  //                   key={"Positie: " + option.value}
  //                   value={option.value}
  //                   control={
  //                     <Checkbox
  //                       checked={checkedBoxes[option.value] || false}
  //                       onChange={handleChange(option.value)}
  //                       value="gilad"
  //                       sx={{ "&.Mui-checked": { color: "#222" } }}
  //                     />
  //                     // <Radio sx={{ "&.Mui-checked": { color: "#222" } }} />
  //                   }
  //                   label={option.value}
  //                   className="mb-1.5 last:mb-0 "
  //                   onChange={(e) => handleChange(e.target.value)}
  //                 /> */}
  //               </>
  //             );
  //           })}
  //         </FormGroup>
  //       </RadioGroup>
  //     </div>
  //   </>
  // );
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
            {checked.map((option, index) => (
              <div key={index}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={option.status}
                      onChange={(e) => handleChange(option.name, e)}
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
    </>
  );
}
