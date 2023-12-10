import { Button } from "@mui/material";

export default function InputSwatch({ value, onChange, title, options }) {
  return (
    <div>
      <div className="flex flex-wrap items-center text-sm mb-2">
        <span className="font-bold min-w-[140px]">{title}</span>
      </div>
      <div className="flex gap-4">
        {options.map((option) => (
          <Button
            onClick={() => onChange(option.value)}
            variant="outlined"
            size="medium"
            className={`${
              value == option.value
                ? "border-black hover:border-black text-black hover:text-black"
                : "border-gray-300 text-black hover:border-gray-600 hover:text-black"
            } lowercase`}
            key={title + "-" + option.value}
          >
            {option.value}
          </Button>
        ))}
      </div>
    </div>
  );
}
