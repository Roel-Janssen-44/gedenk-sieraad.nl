"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ShopifyProvider, CartProvider } from "@shopify/hydrogen-react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#c79385",
    },
  },
});

import Navbar from "@/components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body className={inter.className}>
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
              <Navbar />
            </ThemeProvider>
            {children}
          </CartProvider>
        </ShopifyProvider>

        {/* ToDo Footer */}
      </body>
    </html>
  );
}
