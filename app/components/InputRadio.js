import { RadioGroup, FormControlLabel, Radio } from "@mui/material";

export default function InputRadio({ onChange, title, options }) {
  return (
    <div>
      <div className="flex flex-wrap items-center text-sm mb-2">
        <span className="font-bold min-w-[140px]">{title}</span>
      </div>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        // defaultValue="female"
        name="radio-buttons-group"
      >
        {options.map((option) => {
          return (
            <FormControlLabel
              key={title + "-" + option.value}
              value={option.value}
              control={<Radio sx={{ "&.Mui-checked": { color: "#222" } }} />}
              label={option.value}
              className="mb-1.5 last:mb-0 "
              onChange={(e) => onChange(e.target.value)}
            />
          );
        })}
      </RadioGroup>
    </div>
  );
}
