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
    <div className="pt-28 pb-16 container max-w-7xl mx-auto">
      {Object.keys(collections).map((key, index) => {
        const collection = collections[key];
        const sanitizedHtmlContent = sanitizeHtml(collection.descriptionHtml);

        return (
          <div
            key={key}
            className={`mb-10 bg-white rounded-lg shadow relative max-w-md lg:mb-20 lg:flex lg:aspect-[2/1] lg:gap-4 lg:max-w-[850px] 
            ${index === 0 ? "lg:flex-row-reverse xl:mx-auto xl:max-w-4xl" : ""}
            ${
              index === 1
                ? "ml-auto lg:flex-row xl:flex-col-reverse xl:max-w-md xl:mr-24"
                : ""
            }
            ${
              index === 2
                ? "lg:flex-row-reverse xl:flex-col xl:max-w-md xl:-mt-[600px] xl:ml-24"
                : ""
            }
            `}
          >
            {/* ${index === 2 ? "-mt-[500px]" : ""} */}
            {/* ${index === 1 ? "ml-auto lg:flex lg:flex-col-reverse" : ""} */}
            <div className="p-4 pt-5 flex flex-col justify-center">
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
            <div
              className={`relative min-w-[50%] w-auto min-h-[224px] h-full overflow-hidden rounded-b-lg rounded-t-sm
              ${index % 2 == 0 ? "lg:rounded-l-lg lg:rounded-r-none" : ""}
              ${index % 2 == 1 ? "lg:rounded-r-lg lg:rounded-l-none" : ""}
              ${index == 1 ? "xl:rounded-t-lg xl:rounded-b-none" : ""}
              ${index == 2 ? "xl:rounded-b-lg xl:rounded-t-none" : ""}
              `}
            >
              <Image
                className={`absolute 
                ${index == 0 ? "lg:top-10" : ""}
                ${
                  index == 1
                    ? "top-1/2 -translate-y-1/2"
                    : "top-0 -translate-y-10"
                }
                ${index == 2 ? "lg:top-10 xl:top-0" : ""}
                `}
                data={collection.image}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
