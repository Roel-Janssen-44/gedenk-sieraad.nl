"use client";

import { ShopifyProvider, CartProvider } from "@shopify/hydrogen-react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

export default function RootLayout({ shopData, children }) {
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
          <ThemeProvider theme={theme}>
            <Navbar menu={shopData.menu} />
            <Breadcrumb />
            {children}
          </ThemeProvider>
        </CartProvider>
      </ShopifyProvider>
      <Footer />
    </>
  );
}
