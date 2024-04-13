import Image from "next/image";
import { useState } from "react";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { Button, Modal } from "@mui/material";

export default function InputRadio({ onChange, title, options, multiple }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
                label={
                  option.value +
                  " " +
                  (option?.price != 0 ? `(€${option?.price})` : "")
                }
                className="mb-1.5 last:mb-0 "
                onChange={(e) => onChange(e.target.value)}
              />
              {option?.imageUrl && (
                <>
                  <Button onClick={handleOpen}>
                    <Image
                      aria-hidden
                      src={option.imageUrl}
                      className="rounded"
                      alt="Option descriptive image"
                      width={125}
                      height={125}
                    />
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <div className="fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[528px] max-h-[528px]">
                      <Image
                        aria-hidden
                        src={option.imageUrl}
                        alt="Option descriptive image"
                        width={528}
                        height={528}
                        className="rouned-lg"
                      />
                    </div>
                  </Modal>
                </>
              )}
            </>
          );
        })}
      </RadioGroup>
    </div>
  );
}
