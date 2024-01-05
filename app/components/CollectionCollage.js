"use client";

import sanitizeHtml from "sanitize-html-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Image } from "@shopify/hydrogen-react";
import Button from "@mui/material/Button";

export default function CollectionCollage({ collections }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="pt-28 pb-16 container">
      {Object.keys(collections).map((key, index) => {
        const collection = collections[key];
        const sanitizedHtmlContent = sanitizeHtml(collection.descriptionHtml);

        return (
          <div key={key} className="mb-10 bg-white rounded-lg relative">
            <div className="p-4 pt-5">
              <h2 className="text-5xl font-tangerine mb-4 text-gray-800">
                {collection.title}
              </h2>
              <div className="mb-4">
                {isClient ? (
                  <p
                    dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }}
                    className="before:mb-1 before:mr-2 before:inline-block before:content-[''] before:w-16 before:bg-primary before:rounded before:h-[3px]"
                  ></p>
                ) : (
                  "Loading..."
                )}
              </div>
              {console.log(collection)}

              <Link
                href={"/collections/" + collection.handle}
                className="inline-block"
              >
                <Button
                  variant="contained"
                  size="large"
                  className="bg-primary normal-case font-normal"
                >
                  Ontdekken
                </Button>
              </Link>
            </div>
            <div className="h-56 overflow-hidden relative rounded-b-lg">
              <Image
                className={`absolute ${
                  index == 1 ? "top-1/2 -translate-y-1/2" : "top-0"
                }`}
                data={collection.image}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
