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

export default function MenuDrawer({
  menuDrawerIsOpen,
  onClose,
  menu,
  openMenuItem,
}) {
  return (
    <Drawer anchor="right" open={menuDrawerIsOpen} onClose={onClose}>
      <div className="h-screen flex flex-col w-max-w-sm w-[325px]">
        <div className="mb-2 bg-primary text-white">
          <div className="flex container h-16 items-center justify-end">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="close drawer"
              onClick={() => onClose()}
            >
              <CloseRoundedIcon />
            </IconButton>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-2 sm:px-6">
          <ul role="list" className="">
            {menu?.items.map((menuItem, index) => {
              if (menuItem.items[0] == undefined) {
                return (
                  <div
                    key={"cart_line" + menuItem.id}
                    className={`w-full text-left ${
                      index !== 0
                        ? "border-t-[1px] border-gray-200"
                        : "border-none"
                    }`}
                  >
                    <Link
                      target="_blank"
                      rel="nofollow"
                      href={menuItem.url}
                      className="py-3 px-2 flex"
                    >
                      <div>{menuItem.title}</div>
                    </Link>
                  </div>
                );
              } else {
                return (
                  <button
                    onClick={() => openMenuItem(menuItem.id)}
                    key={"cart_line" + menuItem.id}
                    className={`block w-full relative ${
                      index !== 0
                        ? "border-t-[1px] border-gray-200"
                        : "border-none"
                    }`}
                  >
                    <span className="flex justify-between py-3 px-2">
                      <span className="text-left">{menuItem?.title}</span>
                      <ChevronRightRoundedIcon className="text-gray-600" />
                    </span>
                  </button>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </Drawer>
  );
}
