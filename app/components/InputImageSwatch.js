import { IconButton, Tooltip } from "@mui/material";
import Image from "next/image";

export default function InputImageSwatch({ value, onChange, title, options }) {
  return (
    <div>
      <div className="flex flex-wrap items-center text-sm mb-2">
        <span className="font-bold min-w-[140px]">
          {title} <span className="font-normal">{value}</span>
        </span>
      </div>
      <div className="flex flex-row flex-wrap gap-4">
        {options.map((option) => (
          <Tooltip key={title + "-" + option.value} title={option.value}>
            <IconButton
              onClick={() => onChange(option.value)}
              variant="outlined"
              size="small"
              className="w-auto p-0"
            >
              <div
                className={`border-2 p-1 rounded relative ${
                  value == option.value
                    ? "border-black hover:border-black text-black hover:text-black"
                    : "border-gray-300 text-black hover:border-gray-600 hover:text-black"
                } lowercase p-0`}
              >
                <Image
                  src={option.image.url}
                  width={32}
                  height={32}
                  alt={option.image.altTekst}
                  priority={false}
                  loading="lazy"
                  // className="h-auto w-auto"
                />
              </div>
            </IconButton>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
