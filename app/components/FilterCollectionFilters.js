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

export default function FilterDrawerFilters({ products }) {
  const [expanded, setExpanded] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [material, setMaterial] = useState(searchParams.get("Materiaal"));
  const [vendor, setVendor] = useState(searchParams.get("Merk"));
  const [minPrice, setMinPrice] = useState(searchParams.get("MinPrijs"));
  const [maxPrice, setMaxPrice] = useState(searchParams.get("MaxPrijs"));

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  console.log("products");
  console.log(products);
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (material) {
      params.set("Materiaal", material);
    } else {
      params.delete("Materiaal");
    }
    if (vendor) {
      params.set("Merk", vendor);
    } else {
      params.delete("Merk");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [vendor, material]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (minPrice) {
      params.set("MinPrijs", minPrice);
    }
    if (maxPrice) {
      params.set("MaxPrijs", maxPrice);
    }
    replace(`${pathname}?${params.toString()}`);
  }, [minPrice, maxPrice]);

  let vendors = {
    elegant: {
      name: "Elegant hand made",
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
    milanello: {
      name: "Milanello",
      amount: 0,
    },
    adore: {
      name: "Adore",
      amount: 0,
    },
  };

  let materials = [
    {
      name: "Zilver 925 sterling",
      amount: 0,
    },
    {
      name: "9 KT geelgoud",
      amount: 0,
    },
    {
      name: "14 KT geelgoud",
      amount: 0,
    },
    {
      name: "9 KT witgoud",
      amount: 0,
    },
    {
      name: "14 KT witgoud",
      amount: 0,
    },
    {
      name: "9 KT roségoud",
      amount: 0,
    },
    {
      name: "14 KT roségoud",
      amount: 0,
    },
    {
      name: "Leder",
      amount: 0,
    },
    {
      name: "Staal",
      amount: 0,
    },
    {
      name: "Zilver/geelgoud verguld",
      amount: 0,
    },
    {
      name: "Zilver/roségoud verguld",
      amount: 0,
    },
  ];

  products?.forEach((product) => {
    if (material == null) {
      if (product.vendor === "Elegant hand made") {
        vendors["elegant"].amount++;
      } else if (product.vendor === "Exquisite hand made") {
        vendors["exquisite"].amount++;
      } else if (product.vendor === "See You Gedenksieraden") {
        vendors["seeyou"].amount++;
      } else if (product.vendor === "Adore") {
        vendors["adore"].amount++;
      } else if (product.vendor === "Milanello") {
        vendors["milanello"].amount++;
      }
    } else {
      product.options[0].values.forEach((option) => {
        if (option == material) {
          console.log("inside if statement");

          if (product.vendor === "Elegant hand made") {
            vendors["elegant"].amount++;
          } else if (product.vendor === "Exquisite hand made") {
            vendors["exquisite"].amount++;
          } else if (product.vendor === "See You Gedenksieraden") {
            vendors["seeyou"].amount++;
          } else if (product.vendor === "Adore") {
            vendors["adore"].amount++;
          } else if (product.vendor === "Milanello") {
            vendors["milanello"].amount++;
          }
        }
      });
    }

    if (product.options[0]?.name == "Materiaal") {
      if (vendor == null) {
        product.options[0].values.forEach((option) => {
          let existingMaterial = materials.find(
            (material) => material.name === option
          );
          if (!existingMaterial) {
            materials.push({ name: option, amount: 1 });
          } else {
            existingMaterial.amount++;
          }
        });
      } else {
        if (
          vendor == "Elegant hand made" &&
          product.vendor == "Elegant hand made"
        ) {
          product.options[0].values.forEach((option) => {
            let existingMaterial = materials.find(
              (material) => material.name === option
            );
            if (!existingMaterial) {
              materials.push({ name: option, amount: 1 });
            } else {
              existingMaterial.amount++;
            }
          });
        } else if (
          vendor == "Exquisite hand made" &&
          product.vendor == "Exquisite hand made"
        ) {
          product.options[0].values.forEach((option) => {
            let existingMaterial = materials.find(
              (material) => material.name === option
            );
            if (!existingMaterial) {
              materials.push({ name: option, amount: 1 });
            } else {
              existingMaterial.amount++;
            }
          });
        } else if (
          vendor == "See You Gedenksieraden" &&
          product.vendor == "See You Gedenksieraden"
        ) {
          product.options[0].values.forEach((option) => {
            let existingMaterial = materials.find(
              (material) => material.name === option
            );
            if (!existingMaterial) {
              materials.push({ name: option, amount: 1 });
            } else {
              existingMaterial.amount++;
            }
          });
        }
      }
    }
  });

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
        {materials && (
          <div className="px-4 mt-10">
            <h5 className="font-semibold mb-2">Materiaal</h5>
            <div className="mb-2">
              <hr className="h-[3px] rounded-full bg-gray-800" />
            </div>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={material}
            >
              {materials.map((material) => {
                if (
                  material.name.includes("WD options") ||
                  material.name.toLowerCase().includes("mws")
                ) {
                  return null;
                } else {
                  return (
                    <FormControlLabel
                      key={"materialfacet" + material.name}
                      value={material.name}
                      control={
                        <Radio
                          disabled={material.amount === 0}
                          sx={{ "&.Mui-checked": { color: "#222" } }}
                        />
                      }
                      label={material.name + ` (${material.amount})`}
                      className="mb-1.5 last:mb-0 "
                      onChange={(e) => setMaterial(e.target.value)}
                    />
                  );
                }
              })}

              <Button
                onClick={() => {
                  setMaterial(null);
                }}
                size="large"
                variant="outlined"
                className="mt-3"
              >
                Reset filter
              </Button>
            </RadioGroup>
          </div>
        )}
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
                    <Radio
                      disabled={vendors[vendorKey].amount === 0}
                      sx={{ "&.Mui-checked": { color: "#222" } }}
                    />
                  }
                  label={
                    vendors[vendorKey].name + ` (${vendors[vendorKey].amount})`
                  }
                  className="mb-1.5 last:mb-0 "
                  onChange={(e) => setVendor(e.target.value)}
                />
              ))}
              <Button
                variant="outlined"
                onClick={() => {
                  setVendor(null);
                }}
                size="large"
                className="mt-3"
              >
                Reset filter
              </Button>
            </RadioGroup>
          </div>
        )}
      </div>
      <div className="px-8 mt-10 pb-8 xl:px-4">
        <h5 className="font-semibold mb-2">Prijs:</h5>
        <div className="mb-2">
          <hr className="h-[3px] rounded-full bg-gray-800" />
        </div>
        <div className="flex flex-wrap items-center text-sm mb-2 mt-4">
          <span className="font-bold min-w-[140px]">Van €</span>
        </div>
        <TextField
          type="number"
          value={minPrice}
          variant="outlined"
          onChange={(e) => setMinPrice(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">€</InputAdornment>,
          }}
        />
        <div className="flex flex-wrap items-center text-sm mb-2 mt-4">
          <span className="font-bold min-w-[140px]">Tot €</span>
        </div>
        <TextField
          type="number"
          // max={price.max}
          value={maxPrice}
          variant="outlined"
          onChange={(e) => setMaxPrice(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">€</InputAdornment>,
          }}
        />
        <div>
          <Button
            onClick={() => {
              setMinPrice(null);
              setMaxPrice(null);
            }}
            size="large"
            variant="outlined"
            className="mt-3 w-full"
          >
            Reset filter
          </Button>
        </div>
        <Button
          className="bg-primary w-full mt-8"
          variant="contained"
          size="large"
          // onClick={() => {
          //   // To do add scroll to top
          // }}
        >
          Producten zoeken
        </Button>
      </div>
    </>
  );
}
