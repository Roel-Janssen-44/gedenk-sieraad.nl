"use client";

import { useCart } from "@shopify/hydrogen-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

import { styled, alpha } from "@mui/material/styles";

import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

import IconButton from "@mui/material/IconButton";
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
    padding: theme.spacing(1, 0, 1, 1.5),
    transition: theme.transitions.create("width"),
    width: "100%",
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
  const tawkMessengerRef = useRef();

  const { totalQuantity } = useCart();

  const toggleCartDrawerIsOpen = () => {
    setCartDrawerIsOpen(!cartDrawerIsOpen);
  };

  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const changeBackground = () => {
    if (window.scrollY >= 10) {
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

  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();
  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-30 text-white pb-2 ${
          navbarScrolled ? "bg-primary" : "bg-transparent"
        }`}
      >
        <div className="container">
          <Link href="/" className="w-full h-auto py-3 block px-2 mt-2">
            <Image
              src={"/images/logo-groot-wit.svg"}
              width={275}
              height={50}
              alt="=Logo gedenk-sieraad.nl"
              className="w-[325px] h-auto mx-auto"
            />
          </Link>
          <hr className="my-2 h-[1px-] bg-white" />
          <div className="flex felx-row justify-center gap-4 xl:justify-start">
            <IconButton
              onClick={toggleMenuDrawerIsOpen}
              size="large"
              color="inherit"
              className="xl:hidden"
              aria-label="Menu toggle"
            >
              <MenuRoundedIcon fontSize="40px" />
            </IconButton>
            {/* Nav items */}
            <div className="hidden xl:block flex-1">
              <ul role="list" className="flex flex-row">
                {menu?.items.map((menuItem, index) => {
                  if (menuItem.items[0] == undefined) {
                    return (
                      <Link
                        key={"menu_item" + menuItem.id}
                        target="_blank"
                        rel="nofollow"
                        href={menuItem.url}
                        className="py-3 px-1 text-left flex items-center                           
                          relative before:absolute before:left-0 before:-translate-x-[101%] before:bottom-2 before:h-[2px] before:w-full before:bg-white hover:before:translate-x-0 before:transition-all overflow-hidden"
                      >
                        <div>{menuItem.title}</div>
                      </Link>
                    );
                  } else {
                    const itemPathAfterDotCom = menuItem?.url.split(".com")[1];
                    return (
                      <div
                        key={"menu_item" + menuItem.id}
                        className="relative group"
                      >
                        <Link
                          className="flex                           
                          relative before:absolute before:left-0 before:-translate-x-[101%] before:bottom-2 before:h-[2px] before:w-full before:bg-white hover:before:translate-x-0 before:transition-all overflow-hidden"
                          href={itemPathAfterDotCom}
                          onClick={() => {
                            scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                          }}
                        >
                          <span className="flex justify-between py-3 px-2 items-center">
                            <span className="text-left">{menuItem?.title}</span>
                            <ExpandMoreRoundedIcon className="text-white" />
                          </span>
                        </Link>
                        <div className="absolute invisible min-w-[200px] shadow-md opacity-0 group-hover:visible group-hover:opacity-100 transition-all bg-white rounded-b-md rounded-t-sm text-black flex-1 overflow-y-auto ">
                          <ul role="list">
                            {menuItem?.items.map((menuChildItem, index) => {
                              const childPathAfterDotCom =
                                menuChildItem?.url.split(".com")[1];
                              return (
                                <div
                                  className="px-3"
                                  key={"menuChildItem" + menuChildItem.url}
                                >
                                  <Link
                                    href={childPathAfterDotCom}
                                    className={`py-3 px-2 flex w-full text-left ${
                                      index !== 0
                                        ? "border-t-[1px] border-gray-200"
                                        : "border-none"
                                    }
                                    relative before:absolute before:left-0 before:opacity-0 before:bottom-2 before:h-[2px] before:w-full before:bg-primary hover:before:opacity-100 before:transition-all overflow-hidden"
                                  `}
                                    onClick={() => {
                                      scrollTo({
                                        top: 0,
                                        behavior: "smooth",
                                      });
                                    }}
                                  >
                                    <div key={"cart_line" + menuChildItem.id}>
                                      <div>{menuChildItem.title}</div>
                                    </div>
                                  </Link>
                                </div>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    );
                  }
                })}
              </ul>
            </div>
            {/* Search */}
            <div
              aria-hidden
              className="hidden sm:flex justify-center items-center xl:hidden"
            >
              <Search className="bg-transparent border-[1px] border-white text-white">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    router.push(`/search?search=${searchTerm}`);
                  }}
                >
                  <StyledInputBase
                    placeholder="Zoeken..."
                    inputProps={{ "aria-label": "zoeken" }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onSubmit={() => router.push(`/search?seach=${searchTerm}`)}
                  />
                  <IconButton
                    onClick={() => router.push(`/search?search=${searchTerm}`)}
                  >
                    <SearchRoundedIcon className="text-white" />
                  </IconButton>
                </form>
              </Search>
            </div>
            <Link className="sm:hidden xl:block" href={"/search"}>
              <IconButton size="large" color="inherit" onClick={null}>
                <SearchRoundedIcon fontSize="40px" />
              </IconButton>
            </Link>
            <IconButton
              size="large"
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
      {/* <TawkMessengerReact
        propertyId="628d2b18b0d10b6f3e73d6c2"
        widgetId="1g3rn0mja"
        ref={tawkMessengerRef}
      /> */}
    </>
  );
}
