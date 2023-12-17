"use client";

import Link from "next/link";
import Button from "@mui/material/Button";

export default function NotFound({ type, link, label }) {
  return (
    <div className="container mt-20 text-center">
      <h2 className="text-2xl mb-4">Oeps er is iets mis gegaan...</h2>
      <h2 className="text-xl mb-6">{type || "Pagina"} niet gevonden</h2>
      <Link href={link || "/"}>
        <Button variant={"contained"} className="bg-primary" size="large">
          {label}
        </Button>
      </Link>
    </div>
  );
}
