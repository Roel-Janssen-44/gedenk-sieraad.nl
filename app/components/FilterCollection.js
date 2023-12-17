"use client";

import { useState } from "react";

import IconButton from "@mui/material/IconButton";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

import FilterDrawer from "@/components/drawers/Filter";

export default function FilterCollection({ facets }) {
  const [filterDrawerIsOpen, setFilterDrawerIsOpen] = useState(false);
  const toggleFilterDrawerIsOpen = () => {
    setFilterDrawerIsOpen(!filterDrawerIsOpen);
  };

  return (
    <>
      <IconButton
        className="fixed top-1/2 -translate-y-1/2 left-0 rounded-none rounded-r bg-gray-200 hover:bg-primary focus:bg-primary text-gray-700 hover:text-white focus:text-white w-10 h-10"
        onClick={toggleFilterDrawerIsOpen}
      >
        <PlayArrowRoundedIcon fontSize="32px" />
      </IconButton>
      <div className="hidde">filter menu</div>
      <FilterDrawer
        filterDrawerIsOpen={filterDrawerIsOpen}
        onClose={toggleFilterDrawerIsOpen}
        facets={facets}
      />
    </>
  );
}
