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
import { TextField } from "@mui/material";

const menu = [
  {
    label: "Sieraden met as/haar",
    items: [
      {
        link: "/collection/ashangers",
        label: "Sieraden met as/haar",
      },
      {
        link: "/collection/ashangers",
        label: "Ashangers",
      },
      {
        link: "/collection/all",
        label: "Ashanger met gravure",
      },
      {
        link: "/collection/asringen",
        label: "Asringen",
      },
      {
        link: "/collection/armband-met-as",
        label: "Armbanden met as",
      },
      {
        link: "/collection/oorsieraden",
        label: "Oorsieraden",
      },
      {
        link: "/collection/asbedels",
        label: "Asbedels",
      },
      {
        link: "/collection/manchetknopen",
        label: "Manchetknopen",
      },
    ],
  },
  {
    label: "Sieraden met vingerprint/gravure",
    items: [
      {
        link: "/collection/ashangers",
        label: "Sieraden met vingerprint/gravure",
      },
      {
        link: "/collection/ashangers",
        label: "Hangers",
      },
      {
        link: "/collection/all",
        label: "Ringern",
      },
      {
        link: "/collection/asringen",
        label: "Armbanden",
      },
      {
        link: "/collection/armband-met-as",
        label: "Bedels",
      },
      {
        link: "/collection/oorsieraden",
        label: "Manchetknopen",
      },
    ],
  },
  {
    label: "Assortiment",
    items: [
      {
        link: "/collection/ashangers",
        label: "Assortiment",
      },
      {
        link: "/collection/ashangers",
        label: "Specials mannen",
      },
      {
        link: "/collection/all",
        label: "Geboortesieraden",
      },
      {
        link: "/collection/asringen",
        label: "Initialen/letter sieraden",
      },
      {
        link: "/collection/armband-met-as",
        label: "Knuffelkeitjes/mini urnen",
      },
      {
        link: "/collection/oorsieraden",
        label: "Aanschuifringen",
      },
      {
        link: "/collection/oorsieraden",
        label: "Colliers/kettingen",
      },
      {
        link: "/collection/oorsieraden",
        label: "Accessoires/gedenkbonnen",
      },
    ],
  },
  {
    label: "Herinnering dieren",
    items: [
      {
        link: "/collection/ashangers",
        label: "Herinnering dieren",
      },
      {
        link: "/collection/ashangers",
        label: "Hangers",
      },
      {
        link: "/collection/all",
        label: "Bedels",
      },
      {
        link: "/collection/asringen",
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

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleFacetChange = (facetLabel, value) => {
    const params = new URLSearchParams(searchParams);
    params.set(facetLabel, value);
    replace(`${pathname}?${params.toString()}`);
  };

  const price = JSON.parse(facets.productFilters[2].values[0].input).price;

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
                          href="/collections/all"
                          className="py-2 px-4 w-full block"
                        >
                          {item.label}
                        </Link>
                        {/* To do active link checken & links in menu array invullen */}
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
          {facets.productFilters.map((facet, index) => {
            if (index > 1) return null;
            const options = facet.values.map(({ label, count }) => ({
              value: `${label} (${count})`,
            }));

            return (
              <div className="px-4 mt-10" key={`facet-${index}`}>
                <h5 className="font-semibold mb-2">{facet.label}</h5>
                <div className="mb-2">
                  <hr className="h-[3px] rounded-full bg-gray-800" />
                </div>
                <InputRadio
                  onChange={(value) => handleFacetChange(facet.label, value)}
                  title={""}
                  options={options}
                />
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
            value={price.min}
            variant="outlined"
            // To do handle change
            // onChange={(e) => onChange(e.target.value)}
          />
          <div className="flex flex-wrap items-center text-sm mb-2 mt-4">
            <span className="font-bold min-w-[140px]">Tot €{price.max}.-</span>
          </div>
          <TextField
            type="number"
            max={price.max}
            value={price.max}
            variant="outlined"
            // onChange={(e) => onChange(e.target.value)}
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
      </div>
    </Drawer>
  );
}
