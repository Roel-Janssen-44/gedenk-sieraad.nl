"use client";

import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";

import ReactPlayer from "react-player/lazy";

export default function Video() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="py-14">
      <div className="container">
        <div className="p-4">
          <h2 className="text-4xl text-center text-gray-800 mb-4 font-medium">
            Het proces...
          </h2>
          {isClient && (
            <div className="w-full overflow-x-hidden relative pt-[56.25%]">
              <ReactPlayer
                suppressHydrationWarning
                width="100%"
                height="100%"
                playing
                controls={false}
                loop
                muted
                className="absolute top-0 left-0"
                url="https://www.youtube.com/watch?v=T6I1nAT9OHM"
              />
              <Skeleton
                width={"100%"}
                height={"100%"}
                animation="wave"
                variant="rounded"
                className="absolute w-full h-full top-0 left-0 -z-10"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
