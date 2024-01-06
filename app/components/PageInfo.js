"use client";

import { useState, useEffect } from "react";
import sanitizeHtml from "sanitize-html-react";

import "../infopage.css";

export default function PageInfo({ page }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const sanitizedHtmlContent = sanitizeHtml(page.body);
  const clean = sanitizeHtml(page.body, {
    allowedTags: false,
    allowedAttributes: false,
  });
  return (
    <div>
      <div className="mb-4">
        {isClient ? (
          <p dangerouslySetInnerHTML={{ __html: clean }}></p>
        ) : (
          "Loading..."
        )}
      </div>
    </div>
  );
}
