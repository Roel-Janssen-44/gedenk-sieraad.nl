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

export default function Navbar({ menu }) {
  const { totalQuantity } = useCart();

  const [cartDrawerIsOpen, setCartDrawerIsOpen] = useState(false);
  const toggleCartDrawerIsOpen = () => {
    setCartDrawerIsOpen(!cartDrawerIsOpen);
  };

  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const changeBackground = () => {
    if (window.scrollY >= 100) {
      setNavbarScrolled(true);
    } else {
      setNavbarScrolled(false);
    }
  };

  useEffect(() => {
    changeBackground();
    window.addEventListener("scroll", changeBackground);
  });

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
        className={`fixed top-0 left-0 w-full h-auto z-30 ${
          navbarScrolled ? "bg-primary text-white" : "bg-transparent text-black"
        }`}
      >
        <div className="container">
          <Link href="/" className="flex justify-center py-3">
            <Image
              src={"/images/logo-groot-wit.svg"}
              width={275}
              height={80}
              alt="=Logo gedenk-sieraad.nl"
              className="h-auto"
            />
          </Link>
          <hr
            className={`my-2 h-[1px-] ${
              navbarScrolled ? "bg-white" : "bg-primary"
            }`}
          />
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
                className={`absolute text-center top-0 right-0 w-[18px] h-[18px] text-[8px] rounded-full bg-transparent border-[1px] flex justify-center items-center ${
                  navbarScrolled ? "border-white" : "border-black"
                }`}
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

const CartDrawer = ({ cartDrawerIsOpen, onClose }) => {
  const { cost, checkoutUrl, cartCreate, lines, status, linesAdd } = useCart();
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
            <p>€{cost?.subtotalAmount?.amount}</p>
          </div>

          <Button
            size="large"
            href={checkoutUrl}
            variant="contained"
            className="w-full mt-6 py-3 lowercase text-lg text-white"
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
};

const MenuDrawer = ({ menuDrawerIsOpen, onClose, menu, openMenuItem }) => {
  // const [menuItemDrawerIsOpen, setMenuItemDrawerIsOpen] = useState(false);
  // const [menuItem, setMenuItem] = useState(null);

  // const openMenuItem = (menuItemId) => {
  //   const newMenuItem = menu.items.find((item) => item.id === menuItemId);

  //   setMenuItem(newMenuItem);
  //   setMenuItemDrawerIsOpen(!menuItemDrawerIsOpen);
  // };

  return (
    <Drawer anchor="right" open={menuDrawerIsOpen} onClose={onClose}>
      <div className="h-screen flex flex-col w-max-w-sm w-[384px]">
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
                    <Link href={"#"} className="py-3 px-2 flex">
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
                    <Link href={"#"} className="flex justify-between py-3 px-2">
                      <div>{menuItem.title}</div>
                      <ChevronRightRoundedIcon className="text-gray-600" />
                    </Link>
                  </button>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </Drawer>
  );
};

const MenuItemDrawer = ({
  menuItemDrawerIsOpen,
  onClose,
  menuItem,
  onCloseAll,
}) => {
  return (
    <Drawer anchor="right" open={menuItemDrawerIsOpen} onClose={onClose}>
      <div className="h-screen flex flex-col w-[384px] max-w-sm">
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
          {/* To do add menu item parent with link */}
          <ul role="list" className="">
            {menuItem?.items.map((menuChildItem, index) => (
              <div
                key={"cart_line" + menuChildItem.id}
                className={`w-full text-left ${
                  index !== 0 ? "border-t-[1px] border-gray-200" : "border-none"
                }`}
              >
                <Link href={"#"} className="py-3 px-2 flex">
                  <div>{menuChildItem.title}</div>
                </Link>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </Drawer>
  );
};
