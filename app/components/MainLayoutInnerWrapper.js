"use client";

import { ShopifyProvider, CartProvider } from "@shopify/hydrogen-react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, createContext, useContext } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#c79385",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          color: "#fff",
        },
      },
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        ol: {
          justifyContent: "center",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
  },
});

import Navbar from "./Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export const CartContext = createContext();

export const useCartDrawer = () => {
  return useContext(CartContext);
};

export default function RootLayout({ shopData, children }) {
  const [cartDrawerIsOpen, setCartDrawerIsOpen] = useState(false);
  return (
    <>
      <ShopifyProvider
        storeDomain={`https://${process.env.NEXT_PUBLIC_STORE_DOMAIN}`}
        storefrontToken={process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN}
        storefrontApiVersion="2023-10"
        countryIsoCode="NL"
        languageIsoCode="NL"
      >
        <CartProvider
          onLineAdd={() => {
            console.log("a line is being added");
          }}
          onLineAddComplete={() => {
            console.log("a line has been added");
          }}
        >
          <CartContext.Provider value={setCartDrawerIsOpen}>
            <ThemeProvider theme={theme}>
              <Navbar
                cartDrawerIsOpen={cartDrawerIsOpen}
                setCartDrawerIsOpen={setCartDrawerIsOpen}
                menu={shopData.menu}
              />
              <Breadcrumb />
              {children}
            </ThemeProvider>
          </CartContext.Provider>
        </CartProvider>
      </ShopifyProvider>
      <Footer />
    </>
  );
}
