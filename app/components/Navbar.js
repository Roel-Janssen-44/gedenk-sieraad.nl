"use client";

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

import CartDrawer from "@/components/drawers/Cart";
import MenuDrawer from "@/components/drawers/Menu";
import MenuItemDrawer from "@/components/drawers/MenuItem";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  color: "white",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    color: "white",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Navbar({
  menu,
  setCartDrawerIsOpen,
  cartDrawerIsOpen,
}) {
  const { totalQuantity } = useCart();

  const toggleCartDrawerIsOpen = () => {
    setCartDrawerIsOpen(!cartDrawerIsOpen);
  };

  // const [navbarScrolled, setNavbarScrolled] = useState(false);
  // const changeBackground = () => {
  //   if (window.scrollY >= 10) {
  //     setNavbarScrolled(true);
  //   } else {
  //     setNavbarScrolled(false);
  //   }
  // };

  // useEffect(() => {
  //   changeBackground();
  //   window.addEventListener("scroll", changeBackground);
  // });

  const [menuDrawerIsOpen, setMenuDrawerIsOpen] = useState(false);
  const toggleMenuDrawerIsOpen = () => {
    setMenuDrawerIsOpen(!menuDrawerIsOpen);
  };

  const [menuItemDrawerIsOpen, setMenuItemDrawerIsOpen] = useState(false);
  const [menuItem, setMenuItem] = useState(null);
  const openMenuItem = (menuItemId) => {
    const newMenuItem = menu.items.find((item) => item.id === menuItemId);
    setMenuItem(newMenuItem);
    setMenuItemDrawerIsOpen(!menuItemDrawerIsOpen);
  };
  const toggleMenuItemDrawerIsOpen = () => {
    setMenuItemDrawerIsOpen(!menuItemDrawerIsOpen);
  };
  const onCloseAll = () => {
    setMenuDrawerIsOpen(false);
    setMenuItemDrawerIsOpen(false);
  };

  return (
    <>
      <header
        className={`absolute top-0 left-0 w-full z-30 text-white `}
        // ${
        //   navbarScrolled ? "bg-primary" : "bg-transparent"
        // }
      >
        <div className="container">
          <Link href="/" className="flex justify-center py-3 px-2 mt-2">
            <Image
              src={"/images/logo-groot-wit.svg"}
              width={275}
              height={80}
              alt="=Logo gedenk-sieraad.nl"
              className="w-auto"
            />
          </Link>
          <hr className="my-2 h-[1px-] bg-white" />
          <div className="flex felx-row justify-center gap-4">
            <IconButton
              onClick={toggleMenuDrawerIsOpen}
              size="large"
              color="inherit"
            >
              <MenuRoundedIcon fontSize="40px" />
            </IconButton>
            {/* Nav items */}
            <div className="hidden sm:block">{/* To do pc menu items */}</div>
            {/* Search */}
            <div className="hidden lg:block">
              <Search>
                <SearchIconWrapper>
                  <SearchRoundedIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Zoeken..."
                  inputProps={{ "aria-label": "zoeken" }}
                />
              </Search>
            </div>
            <Link className="lg:hidden" href={"/search"}>
              <IconButton size="large" color="inherit" onClick={null}>
                <SearchRoundedIcon fontSize="40px" />
              </IconButton>
            </Link>
            <IconButton
              size="large"
              // edge="start"
              color="inherit"
              aria-label="open drawer"
              className="ml-0 relative"
              onClick={toggleCartDrawerIsOpen}
            >
              <ShoppingBagRoundedIcon fontSize="40px" />
              <span
                className={`absolute text-center top-0 right-0 w-[18px] h-[18px] text-[8px] rounded-full bg-transparent border-[1px] flex justify-center items-center border-white`}
              >
                {totalQuantity}
              </span>
            </IconButton>
          </div>
        </div>
      </header>
      <CartDrawer
        cartDrawerIsOpen={cartDrawerIsOpen}
        onClose={toggleCartDrawerIsOpen}
      />
      <MenuDrawer
        menuDrawerIsOpen={menuDrawerIsOpen}
        onClose={toggleMenuDrawerIsOpen}
        menu={menu}
        openMenuItem={openMenuItem}
      />
      <MenuItemDrawer
        menuItemDrawerIsOpen={menuItemDrawerIsOpen}
        onClose={toggleMenuItemDrawerIsOpen}
        menuItem={menuItem}
        onCloseAll={onCloseAll}
      />
    </>
  );
}
