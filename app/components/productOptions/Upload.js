"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    try {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);

      reader.onload = async () => {
        const response = await fetch("/api/fileUpload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ file: reader.result }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("data");
          console.log(data);
          setImageUrl(data.url);
          console.log("File uploaded successfully!");
        } else {
          console.error("Failed to upload file");
        }
      };
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    console.log("selectedFile");
    console.log(selectedFile);
  }, [selectedFile]);

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={handleUpload}>Upload</button>
      {imageUrl && (
        <Image
          src={imageUrl}
          height={200}
          width={200}
          aria-hidden
          alt="geuploade afbeelding gebruiker"
        />
      )}
    </div>
  );
}
