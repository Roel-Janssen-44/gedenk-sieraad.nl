import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/nl";
import dayjs from "dayjs";

export default function InputDate({ value, onChange, title, options }) {
  return (
    <div>
      <div className="flex flex-wrap items-center text-sm mb-2">
        <span className="font-bold min-w-[140px]">{title}</span>
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="nl">
        <DatePicker
          className="py-0 w-auto max-w-[145px]"
          onChange={(value) => {
            const day = String(value.$D).padStart(2, "0");
            const month = String(value.$M + 1).padStart(2, "0");
            const year = value.$y;
            const newDate = `${day}-${month}-${year}`;
            onChange(newDate);
          }}
        />
      </LocalizationProvider>
    </div>
  );
}
