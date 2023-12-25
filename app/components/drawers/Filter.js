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
        <div className="px-4">
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
          {facets?.productFilters.map((facet, index) => {
            if (index > 1) return null;
            const options = facet.values.map(({ label, count }) => ({
              value: label,
              count,
            }));

            return (
              <div className="px-4 mt-10" key={`facet-${index}`}>
                <h5 className="font-semibold mb-2">{facet.label}</h5>
                <div className="mb-2">
                  <hr className="h-[3px] rounded-full bg-gray-800" />
                </div>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={index == 0 ? materiaal : merk}
                >
                  {options.map((option) => {
                    if (option.value.includes("MWS")) return null;
                    return (
                      <FormControlLabel
                        key={
                          facet.label + "-" + option.value + "-" + option.count
                        }
                        value={option.value}
                        control={
                          <Radio sx={{ "&.Mui-checked": { color: "#222" } }} />
                        }
                        label={option.value + ` (${option.count})`}
                        className="mb-1.5 last:mb-0 "
                        onChange={(e) =>
                          handleFacetChange(facet.label, e.target.value)
                        }
                      />
                    );
                  })}
                </RadioGroup>
              </div>
            );
          })}
        </div>
        <div className="px-8 mt-10 pb-8">
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
              startAdornment: (
                <InputAdornment position="start">€</InputAdornment>
              ),
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
              startAdornment: (
                <InputAdornment position="start">€</InputAdornment>
              ),
            }}
          />
          {/* <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">kg</InputAdornment>
              ),
            }}
          /> */}
          <Button
            className="bg-primary w-full mt-8"
            variant="contained"
            size="large"
            onClick={onClose}
          >
            Producten zoeken
          </Button>
        </div>
      </div>
    </Drawer>
  );
}