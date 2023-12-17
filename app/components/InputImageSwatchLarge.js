import { Button, Tooltip } from "@mui/material";
import Image from "next/image";

export default function InputImageSwatchLarge({
  value,
  onChange,
  title,
  options,
}) {
  return (
    <div>
      <div className="flex flex-wrap items-center text-sm mb-2">
        <span className="font-bold min-w-[140px]">{title}</span>
      </div>
      <div className="flex flex-row flex-wrap gap-4">
        {options.map((option) => (
          <Tooltip key={title + "-" + option.value} title={option.value}>
            <Button
              onClick={() => onChange(option.value)}
              variant="outlined"
              size="large"
              className={`border-2 p-1 rounded ${
                value == option.value
                  ? "border-black hover:border-black text-black hover:text-black"
                  : "border-gray-300 text-black hover:border-gray-600 hover:text-black"
              } lowercase p-0`}
            >
              <Image
                src={option.image.url}
                width={120}
                height={60}
                alt={option.image.altText}
                priority={false}
                loading="lazy"
                // className="h-auto"
              />
            </Button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
