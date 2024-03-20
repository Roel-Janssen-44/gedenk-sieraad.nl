import Image from "next/image";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";

export default function InputRadio({ onChange, title, options, multiple }) {
  return (
    <div>
      <div className="flex flex-wrap items-center text-sm mb-2">
        <span className="font-bold min-w-[140px]">{title}</span>
      </div>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        multiple
      >
        {options.map((option, index) => {
          return (
            <>
              <FormControlLabel
                key={title + "-" + option.value}
                value={option.value}
                control={<Radio sx={{ "&.Mui-checked": { color: "#222" } }} />}
                label={option.value}
                className="mb-1.5 last:mb-0 "
                onChange={(e) => onChange(e.target.value)}
              />
              {option?.imageUrl && (
                <Image
                  src={option.imageUrl}
                  alt="asd"
                  width={125}
                  height={125}
                />
              )}
            </>
          );
        })}
      </RadioGroup>
    </div>
  );
}
