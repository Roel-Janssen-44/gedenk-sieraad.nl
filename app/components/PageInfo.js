"use client";

import { useState, useEffect } from "react";
import sanitizeHtml from "sanitize-html-react";

import "../infopage.css";

export default function PageInfo({ page }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  // const sanitizedHtmlContent = sanitizeHtml(page.body, {
  //   allowedTags: false,
  //   allowedAttributes: false,
  // });
  // Add display: inline-block to opening tags
  const sanitizedHtmlContent = sanitizeHtml(page.body, {
    allowedTags: false,
    allowedAttributes: false,
    transformTags: {
      img: (tagName, attribs) => {
        // Add display: inline-block only to img tags
        if (!attribs.style) {
          attribs.style = "";
        }
        attribs.style += "display: inline-block;";
        return { tagName, attribs };
      },
      iframe: (tagName, attribs) => {
        // Add display: inline-block only to img tags
        if (!attribs.style) {
          attribs.style = "";
        }
        attribs.style += "display: inline-block;";
        return { tagName, attribs };
      },
    },
  });

  return (
    <div>
      <div className="mb-4">
        {isClient ? (
          <p dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }}></p>
        ) : (
          "Loading..."
        )}
      </div>
    </div>
  );
}
