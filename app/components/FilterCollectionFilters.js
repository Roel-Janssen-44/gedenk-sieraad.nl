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
import InputRadio from "./InputRadio";
import { TextField, Input } from "@mui/material";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

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

export default function FilterDrawerFilters({ facets, onClose }) {
  const [expanded, setExpanded] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  let price;
  try {
    price =
      JSON.parse(facets?.productFilters[2]?.values[0]?.input).price || null;
  } catch {
    price = 10000;
  }

  const [materiaal, setMateriaal] = useState(searchParams.get("Materiaal"));
  const [merk, setMerk] = useState(searchParams.get("Merk"));
  const [minPrijs, setMinPrijs] = useState(searchParams.get("MinPrijs") || 0);
  const [maxPrijs, setMaxPrijs] = useState(
    searchParams.get("MaxPrijs") || price.max
  );

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const stateSetters = {
    Materiaal: setMateriaal,
    Merk: setMerk,
    MinPrijs: setMinPrijs,
    MaxPrijs: setMaxPrijs,
  };

  const handleFacetChange = (facetLabel, value) => {
    stateSetters[facetLabel](value);

    const params = new URLSearchParams(searchParams);
    params.set(facetLabel, value);
    replace(`${pathname}?${params.toString()}`);
  };

  const materiaalFacet =
    facets?.productFilters
      .find((filter) => filter.id === "filter.v.option.materiaal")
      ?.values.map(({ label, count }) => ({
        value: label,
        count,
      })) || [];

  const vendorFacet =
    facets?.productFilters
      .find((filter) => filter.id === "filter.p.vendor")
      ?.values.map(({ label, count }) => ({
        value: label,
        count,
      })) || [];

  const priceFacet =
    facets?.productFilters
      .find((filter) => filter.id === "filter.v.price")
      ?.values.map(({ label, count }) => ({
        value: label,
        count,
      })) || [];

  return (
    <>
      <div className="px-4 xl:px-0">
        <h5 className="pl-4 font-semibold mb-2">Collecties:</h5>
        <div className="px-4 mb-2">
          <hr className="h-[3px] rounded-full bg-gray-800" />
        </div>
        {menu.map((menuSet, index) => (
          <div className="" key={`accordion-${index}`}>
            <Accordion
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              disableGutters={true}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}bh-content`}
                id={`panel${index}bh-header`}
                className={` ${
                  expanded === `panel${index}` ? "bg-gray-200" : "bg-none"
                }`}
              >
                <span>{menuSet.label}</span>
              </AccordionSummary>
              <AccordionDetails className="border-[1px] border-gray-200 p-0">
                <ul className="list-disc pl-8">
                  {menuSet.items.map((item, index) => (
                    <li key={`menuItem-${item.label}-${item.link}`}>
                      <Link
                        href={item.link}
                        className={`py-2 px-4 w-full block ${
                          pathname == item.link ? "text-primary" : ""
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
        {materiaalFacet[0] && (
          <div className="px-4 mt-10 xl:px-0">
            <h5 className="font-semibold mb-2">Materiaal</h5>
            <div className="mb-2">
              <hr className="h-[3px] rounded-full bg-gray-800" />
            </div>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={materiaal}
            >
              {materiaalFacet.map((materiaal) => (
                <FormControlLabel
                  key={"materiaalfacet" + materiaal.value}
                  value={materiaal.value}
                  control={
                    <Radio sx={{ "&.Mui-checked": { color: "#222" } }} />
                  }
                  label={materiaal.value + ` (${materiaal.count})`}
                  className="mb-1.5 last:mb-0 "
                  onChange={(e) =>
                    handleFacetChange("Materiaal", e.target.value)
                  }
                />
              ))}
            </RadioGroup>
          </div>
        )}
        {vendorFacet[0] && (
          <div className="px-4 mt-10">
            <h5 className="font-semibold mb-2">Merk</h5>
            <div className="mb-2">
              <hr className="h-[3px] rounded-full bg-gray-800" />
            </div>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={merk}
            >
              {vendorFacet.map((vendor) => (
                <FormControlLabel
                  key={"vendorfacet" + vendor.value}
                  value={vendor.value}
                  control={
                    <Radio sx={{ "&.Mui-checked": { color: "#222" } }} />
                  }
                  label={vendor.value + ` (${vendor.count})`}
                  className="mb-1.5 last:mb-0 "
                  onChange={(e) => handleFacetChange("Merk", e.target.value)}
                />
              ))}
            </RadioGroup>
          </div>
        )}
      </div>
      <div className="px-8 mt-10 pb-8 xl:px-4">
        <h5 className="font-semibold mb-2">Prijs:</h5>
        <div className="mb-2">
          <hr className="h-[3px] rounded-full bg-gray-800" />
        </div>
        {/* Prijs opties */}
        <div className="flex flex-wrap items-center text-sm mb-2 mt-4">
          <span className="font-bold min-w-[140px]">Van €0.-</span>
        </div>
        <TextField
          type="number"
          value={minPrijs}
          variant="outlined"
          onChange={(e) => handleFacetChange("MinPrijs", e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">€</InputAdornment>,
          }}
        />
        <div className="flex flex-wrap items-center text-sm mb-2 mt-4">
          <span className="font-bold min-w-[140px]">Tot €{price.max}.-</span>
        </div>
        <TextField
          type="number"
          max={price.max}
          value={maxPrijs}
          variant="outlined"
          onChange={(e) => handleFacetChange("MaxPrijs", e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">€</InputAdornment>,
          }}
        />
        <Button
          className="bg-primary w-full mt-8"
          variant="contained"
          size="large"
          onClick={onClose}
        >
          Producten zoeken
        </Button>
      </div>
    </>
  );
}
