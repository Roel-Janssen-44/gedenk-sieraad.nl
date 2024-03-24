"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import {
  getStorefrontApiUrl,
  getPrivateTokenHeaders,
} from "@/lib/shopify-client";

import Drawer from "@mui/material/Drawer";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputRadio from "../InputRadio";
import { TextField, Input } from "@mui/material";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

import FilterCollectionFilters from "../FilterCollectionFilters";

export default function FilterDrawer({
  filterDrawerIsOpen,
  onClose,
  products,
}) {
  return (
    <Drawer anchor="left" open={filterDrawerIsOpen} onClose={onClose}>
      <div className="h-screen flex flex-col w-full max-w-[325px]">
        <div className="mb-8 bg-primary text-white">
          <div className="flex container h-16 items-center justify-between">
            <h2 className="text-lg font-medium">filter producten</h2>
            <div className="flex items-center z-40">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="close drawer"
                sx={{ mr: -1 }}
                onClick={() => onClose()}
              >
                <CloseRoundedIcon />
              </IconButton>
            </div>
          </div>
        </div>
        <FilterCollectionFilters products={products} onClose={onClose} />
      </div>
    </Drawer>
  );
}
