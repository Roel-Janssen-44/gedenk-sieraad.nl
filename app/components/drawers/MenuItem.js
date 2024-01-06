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

export default function MenuItemDrawer({
  menuItemDrawerIsOpen,
  onClose,
  menuItem,
  onCloseAll,
}) {
  const pathAfterDotCom = menuItem?.url.split(".com")[1];

  return (
    <Drawer anchor="left" open={menuItemDrawerIsOpen} onClose={onClose}>
      <div className="h-screen flex flex-col w-[325px] max-w-sm">
        <div className="mb-2 bg-primary text-white">
          <div className="flex container h-16 items-center justify-between">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="close drawer"
              onClick={() => onClose()}
            >
              <ChevronLeftRoundedIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="close all drawers"
              onClick={() => onCloseAll()}
            >
              <CloseRoundedIcon />
            </IconButton>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-2 sm:px-6">
          <Link
            href={pathAfterDotCom}
            onClick={() => onCloseAll()}
            className="py-3 px-2 flex border-b-[1px] border-primary"
          >
            <div>{menuItem?.title}</div>
          </Link>

          <ul role="list" className="">
            {menuItem?.items.map((menuChildItem, index) => {
              const childPathAfterDotCom = menuChildItem?.url.split(".com")[1];
              return (
                <div
                  key={"cart_line" + menuChildItem.id}
                  className={`w-full text-left ${
                    index !== 0
                      ? "border-t-[1px] border-gray-200"
                      : "border-none"
                  }`}
                >
                  <Link
                    onClick={() => onCloseAll()}
                    href={childPathAfterDotCom}
                    className="py-3 px-2 flex"
                  >
                    <div>{menuChildItem.title}</div>
                  </Link>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </Drawer>
  );
}
