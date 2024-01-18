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

const menu = [
  {
    label: "Gedenksieraden as/haar",
    items: [
      {
        link: "/collections/assieraden",
        label: "Gedenksieraden as/haar",
      },
      {
        link: "/collections/ashangers",
        label: "Ashanger",
      },
      {
        link: "/collections/ashanger-met-vingerprint-gravure",
        label: "Ashangers met gravure",
      },
      {
        link: "/collections/asringen",
        label: "Asringen",
      },
      {
        link: "/collections/armband-met-as",
        label: "Armbanden met as",
      },
      {
        link: "/collections/oorsieraden",
        label: "Oorsieraden",
      },
      {
        link: "/collections/asbedels",
        label: "Asbedels",
      },
      {
        link: "/collections/as-manchetknopen",
        label: "Manchetknopen",
      },
    ],
  },
  {
    label: "Gedenkieraden vingerprint/gravure",
    items: [
      {
        link: "/collections/sieraden-met-vingerprint",
        label: "Gedenkieraden vingerprint/gravure",
      },
      {
        link: "/collections/hangers",
        label: "Hangers",
      },
      {
        link: "/collections/ringen",
        label: "Ringern",
      },
      {
        link: "/collections/armband-met-vingerprint",
        label: "Armbanden",
      },
      {
        link: "/collections/bedels",
        label: "Bedels",
      },
      {
        link: "/collections/manchetknopen",
        label: "Manchetknopen",
      },
    ],
  },
  {
    label: "Assortiment",
    items: [
      {
        link: "/collections/assortiment",
        label: "Assortiment",
      },
      {
        link: "/collections/colliers-kettingen",
        label: "Colliers/kettingen",
      },
      {
        link: "/collections/specials-mannen",
        label: "Specials mannen",
      },
      {
        link: "/collections/initials",
        label: "Initials",
      },
      {
        link: "/collections/knuffelkeien",
        label: "Knuffelkeien/mini urnen",
      },
      {
        link: "/collections/geboortesieraden",
        label: "geboortesieraden",
      },
      {
        link: "/collections/siders",
        label: "Aanschuifringen",
      },
      {
        link: "/collections/accespores",
        label: "Accessoires",
      },
    ],
  },
  {
    label: "Herinnering dieren",
    items: [
      {
        link: "/collections/dieren",
        label: "Herinnering dieren",
      },
      {
        link: "/collections/hangers-1",
        label: "Hangers dieren",
      },
      {
        link: "/collections/bedels-1",
        label: "Bedels",
      },
      {
        link: "/collections/mini-urnen-1",
        label: "Mini urnen",
      },
    ],
  },
];

export default function FilterDrawer({ filterDrawerIsOpen, onClose, facets }) {
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
        <FilterCollectionFilters facets={facets} onClose={onClose} />
      </div>
    </Drawer>
  );
}
