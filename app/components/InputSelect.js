import { Select, MenuItem } from "@mui/material";

export default function InputSelect({ value, onChange, title, options }) {
  return (
    <div>
      <div className="flex flex-wrap items-center text-sm mb-2">
        <span className="font-bold min-w-[140px]">{title}</span>
      </div>
      <Select
        id={title + "-option_select"}
        value={value == "" ? "Placeholder" : value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-[140px]"
        displayEmpty
        size="small"
        variant="outlined"
      >
        <MenuItem disabled value="Placeholder">
          <span className="text-gray-500">Placeholder</span>
        </MenuItem>
        {options.map((option) => {
          return (
            <MenuItem key={title + "-" + option.value} value={option.value}>
              {option.value} {option.price !== 0 && `(€${option.price || ""})`}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
}
