"use client";

import {
  Image,
  useCart,
  CartLineProvider,
  CartLineQuantity,
  CartLineQuantityAdjustButton,
} from "@shopify/hydrogen-react";
import { useState } from "react";
import Link from "next/link";

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";

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

export default function Navbar() {
  const { totalQuantity } = useCart();

  const navItems = ["Home", "About", "Contact"];

  const [cartDrawerIsOpen, setCartDrawerIsOpen] = useState(false);
  const toggleCartDrawerIsOpen = () => {
    setCartDrawerIsOpen(!cartDrawerIsOpen);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Link href="/">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block", color: "white" } }}
            >
              Gedenk-sieraad.nl
            </Typography>
          </Link>
          {/* Nav items */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                {item}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Zoeken..."
              inputProps={{ "aria-label": "zoeken" }}
            />
          </Search>
          <Badge
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            badgeContent={totalQuantity}
            color="error"
            overlap="circular"
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ ml: 2, color: "white" }}
              onClick={toggleCartDrawerIsOpen}
            >
              <ShoppingBagRoundedIcon fontSize="medium" />
            </IconButton>
          </Badge>
        </Toolbar>
      </AppBar>
      <CartDrawer
        cartDrawerIsOpen={cartDrawerIsOpen}
        onClose={toggleCartDrawerIsOpen}
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
            <div className="flex items-center">
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
                      <Image
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
            <p>Subtotaal</p>
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
