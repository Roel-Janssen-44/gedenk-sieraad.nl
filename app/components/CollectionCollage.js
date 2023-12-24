"use client";

import Link from "next/link";
import { Image } from "@shopify/hydrogen-react";
import DOMPurify from "dompurify";
import Button from "@mui/material/Button";

export default function CollectionCollage({ collections }) {
  console.log("collections");
  console.log(collections);
  return (
    <div className="mt-20 container">
      {/* {collections.map((collection, index) => (
        <h2 className="text-2xl font-tangerine">
          Collection {collection.title}
        </h2>
      ))} */}
      {Object.keys(collections).map((key) => {
        const collection = collections[key];
        const htmlContent = collection.descriptionHtml;
        // const htmlContent = "<script>alert(1);</script>";

        const sanitizedHtmlContent = DOMPurify.sanitize(htmlContent);

        return (
          <div
            key={key}
            className="p-4 border-[1px] border-snow-200 rounded shadow-lg mb-10"
          >
            {console.log(key, collections[key])}
            <div className="flex flex-col-reverse gap-4 mb-4">
              <hr className="bg-primary rounded h-[3px] border-none w-16" />
              <h2 className="text-xl ">Collection {collection.title}</h2>
            </div>
            <p
              className="mb-4"
              dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }}
            ></p>

            <Link href={"/"} className="mb-6 block">
              <Button
                variant="contained"
                size="large"
                className="normal-case font-normal"
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
