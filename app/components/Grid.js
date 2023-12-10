"use client";

import * as React from "react";

export default function Grid({ children }) {
  return (
    <div className="w-full flex flex-col sm:flex-row flex-wrap justify-between">
      {children}
    </div>
  );
}
