"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
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
        link: "/collections/ashangers",
        label: "Gedenkhangers as/haar",
      },
      {
        link: "/collections/asringen",
        label: "Gedenkringen as/haar",
      },
      {
        link: "/collections/armbanden-met-as",
        label: "Gedenk armbanden as/haar",
      },
      {
        link: "/collections/oorsieraad",
        label: "Gedenk oorsieraden as/haar",
      },
      {
        link: "/collections/asbedels",
        label: "Gedenkbedels as/haar",
      },
      {
        link: "/collections/as-manchetkknopen",
        label: "Gedenk manchetknopen as/haar",
      },
      {
        link: "/collections/ashanger-met-vingerprint-gravure",
        label: "Gedenkhangers as/haar en vingerafdruk/gravure",
      },
    ],
  },
  {
    label: "Gedenksieraden vingerafdruk/gravure",
    items: [
      {
        link: "/collections/hangers",
        label: "Gedenkhangers met vingerafdruk/gravure",
      },
      {
        link: "/collections/ringen",
        label: "Gedenkringen met vingerafdruk/gravure",
      },
      {
        link: "/collections/armband-met-vingerprint",
        label: "Gedenk armbanden met vingerafdruk/gravure",
      },
      {
        link: "/collections/bedels",
        label: "Gedenkbedels met vingerafdruk/gravure",
      },
      {
        link: "/collections/manchetknopen",
        label: "Gedenk manchetknopen met vingerafdruk/gravure",
      },
    ],
  },
  {
    label: "Assortiment",
    items: [
      {
        link: "/collections/specials-mannen",
        label: "Specials mannen",
      },
      {
        link: "/collections/geboortesieraden",
        label: "Geboortesieraden",
      },
      {
        link: "/collections/initials",
        label: "Initialen/letter sieraden",
      },
      {
        link: "/collections/knuffelkeien",
        label: "Knuffelkeitjes/mini urnen",
      },
      {
        link: "/collections/siders",
        label: "Aanschuifringen",
      },
      {
        link: "/collections/colliers-kettingen",
        label: "Colliers/kettingen",
      },
      {
        link: "/collections/accesoires",
        label: "Accessoires/gedenkbonnen",
      },
    ],
  },
  {
    label: "Herinnering dieren",
    items: [
      {
        link: "/collections/hangers-1",
        label: "Gedenkhangers dieren",
      },
      {
        link: "/collections/bedels-1",
        label: "Gedenkbedels dieren",
      },
      {
        link: "/collections/mini-urnen-1",
        label: "Mini urnen dieren",
      },
    ],
  },
];

export default function FilterDrawerFilters({ products, onClose }) {
  const [expanded, setExpanded] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // useEffect(() => {
  //   console.log("facets");
  // }, []);

  const [material, setMaterial] = useState(searchParams.get("Materiaal"));
  const [vendor, setVendor] = useState(searchParams.get("Merk"));
  const [minPrice, setMinPrice] = useState(searchParams.get("MinPrijs"));
  const [maxPrice, setMaxPrice] = useState(searchParams.get("MaxPrijs"));

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // const stateSetters = {
  //   Material: setMaterial,
  //   Vendor: setVendor,
  //   MinPrice: setMinPrice,
  //   MaxPrice: setMaxPrice,
  // };

  // const handleFacetChange = (facetLabel, value) => {
  //   stateSetters[facetLabel](value);

  //   const params = new URLSearchParams(searchParams);
  //   params.set(facetLabel, value);
  //   replace(`${pathname}?${params.toString()}`);
  // };

  // To do update link based on state change

  useEffect(() => {
    // console.log("state change");
    const params = new URLSearchParams(searchParams);
    if (material) {
      params.set("Materiaal", material);
    }
    if (vendor) {
      params.set("Merk", vendor);
    }
    if (minPrice) {
      params.set("MinPrijs", minPrice);
    }
    if (maxPrice) {
      params.set("MaxPrijs", maxPrice);
    }
    replace(`${pathname}?${params.toString()}`);
  }, [vendor, material, minPrice, maxPrice]);

  let vendors = {
    elegant: {
      name: "Elegante hand made",
      amount: 0,
    },
    exquisite: {
      name: "Exquisite hand made",
      amount: 0,
    },
    seeyou: {
      name: "See You Gedenksieraden",
      amount: 0,
    },
  };

  products.forEach((product) => {
    // console.log(product.vendor);
    if (product.vendor === "See You Gedenksieraden") {
      vendors["seeyou"].amount++;
    } else if (product.vendor === "Elegante hand made") {
      vendors["elegant"].amount++;
    } else if (product.vendor === "Exquisite hand made") {
      vendors["exquisite"].amount++;
    }
  });

  // console.log(vendors);

  // const materiaalFacet =
  //   facets?.productFilters
  //     ?.find((filter) => filter.id === "filter.v.option.materiaal")
  //     ?.values.map(({ label, count }) => ({
  //       value: label,
  //       count,
  //     })) || [];

  // const vendorFacet =
  //   facets?.productFilters
  //     ?.find((filter) => filter.id === "filter.p.vendor")
  //     ?.values.map(({ label, count }) => ({
  //       value: label,
  //       count,
  //     })) || [];

  // const priceFacet =
  //   facets?.productFilters
  //     ?.find((filter) => filter.id === "filter.v.price")
  //     ?.values.map(({ label, count }) => ({
  //       value: label,
  //       count,
  //     })) || [];

  return (
    <>
      <div className="px-4 xl:px-0">
        <h5 className="pl-4 font-semibold mb-2">Categorie</h5>
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
        {/* {materiaalFacet[0] && (
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
              {materiaalFacet.map((materiaal) => {
                if (
                  materiaal.value.includes("WD options") ||
                  materiaal.value.toLowerCase().includes("mws")
                ) {
                  return null;
                } else {
                  return (
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
                  );
                }
              })}
            </RadioGroup>
          </div>
        )}*/}
        {vendors && (
          <div className="px-4 mt-10">
            <h5 className="font-semibold mb-2">Merk</h5>
            <div className="mb-2">
              <hr className="h-[3px] rounded-full bg-gray-800" />
            </div>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={vendor}
            >
              {Object.keys(vendors).map((vendorKey) => (
                <FormControlLabel
                  key={"vendorfacet" + vendors[vendorKey].name}
                  value={vendors[vendorKey].name}
                  control={
                    <Radio sx={{ "&.Mui-checked": { color: "#222" } }} />
                  }
                  label={
                    vendors[vendorKey].name + ` (${vendors[vendorKey].amount})`
                  }
                  className="mb-1.5 last:mb-0 "
                  onChange={(e) => setVendor(e.target.value)}
                />
              ))}
            </RadioGroup>
          </div>
        )}
      </div>
      {/* <div className="px-8 mt-10 pb-8 xl:px-4">
        <h5 className="font-semibold mb-2">Prijs:</h5>
        <div className="mb-2">
          <hr className="h-[3px] rounded-full bg-gray-800" />
        </div>
        <div className="flex flex-wrap items-center text-sm mb-2 mt-4">
          <span className="font-bold min-w-[140px]">Van €</span>
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
          <span className="font-bold min-w-[140px]">Tot €</span>
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
      </div> */}
    </>
  );
}
