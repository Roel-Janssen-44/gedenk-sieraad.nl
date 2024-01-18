import {
  Image as HydrogenImage,
  useCart,
  CartLineProvider,
  CartLineQuantity,
  CartLineQuantityAdjustButton,
} from "@shopify/hydrogen-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { styled, alpha } from "@mui/material/styles";

import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";

import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import InputBase from "@mui/material/InputBase";

export default function CartDrawer({ cartDrawerIsOpen, onClose }) {
  const { cost, checkoutUrl, lines } = useCart();
  return (
    <Drawer anchor="right" open={cartDrawerIsOpen} onClose={onClose}>
      <div className="h-screen flex flex-col w-full max-w-sm">
        <div className="mb-8 bg-primary text-white">
          <div className="flex container h-16 items-center justify-between">
            <h2 className="text-lg font-medium">Winkelwagen</h2>
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

        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {lines?.map((line) => (
              <div key={"cart_line" + line.id}>
                <CartLineProvider line={line}>
                  <li className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <HydrogenImage
                        data={line.merchandise.image}
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href="#">{line.merchandise.product.handle}</a>
                          </h3>
                          <p className="ml-4">
                            €{line.cost.totalAmount.amount}
                          </p>
                        </div>
                        {line.merchandise.selectedOptions.map((option) => (
                          <p
                            key={"selectedOptions_" + option.value}
                            className="mt-1 text-sm text-gray-500 font-bold"
                          >
                            {option.name}:{" "}
                            <span className="font-normal">{option.value}</span>
                          </p>
                        ))}
                        {line.attributes?.map((attribute) => (
                          <p
                            key={"selectedAttributes_" + attribute.value}
                            className="mt-1 text-sm text-gray-500 font-bold"
                          >
                            {attribute.key}:{" "}
                            <span className="font-normal">
                              {attribute.value}
                            </span>
                          </p>
                        ))}
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500 font-bold">
                          Aantal:{" "}
                          <span className="font-normal">
                            <CartLineQuantity />
                          </span>
                        </p>

                        <CartLineQuantityAdjustButton
                          adjust="remove"
                          className="text-gray-600 hover:text-gray-500"
                        >
                          <DeleteRoundedIcon />
                        </CartLineQuantityAdjustButton>
                      </div>
                    </div>
                  </li>
                </CartLineProvider>
              </div>
            ))}
          </ul>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotaal:</p>
            <p>€{cost?.subtotalAmount?.amount || "0.00"}</p>
          </div>

          <Button
            size="large"
            href={checkoutUrl}
            variant="contained"
            className="w-full mt-6 py-3 lowercase text-lg bg-primary text-white"
          >
            Ga door naar de kassa
          </Button>
          <div className="flex justify-center text-center text-sm text-gray-500">
            <p>
              of{" "}
              <Button
                size="large"
                href={checkoutUrl}
                variant="text"
                className="py-3 pl-0 lowercase"
              >
                Ga door met shoppen
              </Button>
            </p>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

// To do button link aanpassen wanneer winkelwagen leeg is
