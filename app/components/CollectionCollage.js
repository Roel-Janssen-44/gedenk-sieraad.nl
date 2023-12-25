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
    <div className="mt-20 container">
      {Object.keys(collections).map((key) => {
        const collection = collections[key];
        const sanitizedHtmlContent = sanitizeHtml(collection.descriptionHtml);

        return (
          <div
            key={key}
            className="p-4 border-[1px] border-snow-200 rounded shadow-lg mb-10"
          >
            <div className="flex flex-col-reverse gap-4 mb-4">
              <hr className="bg-primary rounded h-[3px] border-none w-16" />
              <h2 className="text-xl ">Collection {collection.title}</h2>
            </div>
            <div className="mb-4">
              {isClient ? (
                <p
                  dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }}
                ></p>
              ) : (
                "Loading..."
              )}
            </div>

            <Link href={"/"} className="mb-6 block">
              <Button
                variant="contained"
                size="large"
                className="bg-primary normal-case font-normal"
              >
                Ontdekken
              </Button>
            </Link>
            <Image className="rounded-sm" data={collection.image} />
          </div>
        );
      })}
    </div>
  );
}