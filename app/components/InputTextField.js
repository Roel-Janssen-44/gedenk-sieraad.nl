import { TextField } from "@mui/material";

export default function InputTextField({ onChange, title, value }) {
  return (
    <div>
      <div className="flex flex-wrap items-center text-sm mb-2">
        <span className="font-bold min-w-[140px]">{title}</span>
      </div>
      <TextField
        value={value}
        variant="outlined"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
