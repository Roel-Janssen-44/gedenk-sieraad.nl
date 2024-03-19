import { Select, MenuItem } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

export default function InputSelect({
  value,
  multiple,
  onChange,
  title,
  options,
}) {
  return (
    <div>
      <div className="flex flex-wrap items-center text-sm mb-2">
        <span className="font-bold min-w-[140px]">{title}</span>
      </div>
      {multiple && (
        <>
          <Select
            multiple
            id={title + "-option_select"}
            value={value == "" ? [] : value}
            onChange={(e) => onChange(e.target.value)}
            className="min-w-[140px] max-w-full"
            displayEmpty
            size="small"
            variant="outlined"
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <span className="text-gray-500">-selecteer-</span>;
              }
              return selected.join(", ");
            }}
          >
            {options.map((option) => {
              return (
                <MenuItem key={title + "-" + option.value} value={option.value}>
                  <Checkbox checked={value.indexOf(option.value) > -1} />
                  {option.value}{" "}
                  {option.price !== 0 && `(€${option.price || ""})`}
                </MenuItem>
              );
            })}
          </Select>
        </>
      )}
      {!multiple && (
        <Select
          id={title + "-option_select"}
          value={value == "" ? "-selecteer-" : value}
          onChange={(e) => onChange(e.target.value)}
          className="min-w-[140px] max-w-full"
          displayEmpty
          size="small"
          variant="outlined"
        >
          <MenuItem disabled value="-selecteer-">
            <span className="text-gray-500">-selecteer-</span>
          </MenuItem>
          {options.map((option) => {
            return (
              <MenuItem key={title + "-" + option.value} value={option.value}>
                {option.value} {option.price !== 0 && `(€${option.price || ""}`}
                {!option.price.toString().includes(".") ? ",-)" : ")"}
              </MenuItem>
            );
          })}
        </Select>
      )}
    </div>
  );
}
