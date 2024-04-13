"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function InputFile({ id, onChange, title, value, setError }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedFile) {
      // setError("Fout tijdens het uploaden van het bestand");
      console.error("No file selected");
      return;
    }

    try {
      setLoading(true);
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
          setImageUrl(data.url);

          console.log("File uploaded successfully!");
          setLoading(false);
        } else {
          setLoading(false);
          // setError("Fout tijdens het uploaden van het bestand");

          console.error("Failed to upload file");
        }
      };
    } catch (error) {
      setLoading(false);
      // setError("Fout tijdens het uploaden van het bestand" + error);
      console.error("Error uploading file:", error);
    }
    // onChange(`test inputfile ${id}`, "test value");
  }, [selectedFile]);

  useEffect(() => {
    onChange(id, imageUrl);
  }, [imageUrl]);

  const handleFileUpload = (event) => {
    setLoading(true);
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleDrop = (event) => {
    setLoading(true);
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
    event.currentTarget.classList.remove("border-primary");
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.currentTarget.classList.add("border-primary");
  };

  const handleDragLeave = (event) => {
    event.currentTarget.classList.remove("border-primary");
  };

  return (
    <div>
      <div className="flex flex-wrap items-center text-sm mb-2">
        <span className="font-bold min-w-[140px]">{title}</span>
      </div>
      <label
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        htmlFor={`dropzone-file-${id}`}
        className="w-full xs:w-auto border-2 border-dashed hover:border-transparent sm:inline-block px-3 py-3 xs:px-5 md:px-8 md:py-4 shadow text-gray-800 relative flex flex-col items-center justify-center h-auto rounded-lg cursor-pointer bg-gray-200  hover:bg-gray-300 duration-150"
      >
        <>
          <div className="flex flex-row items-center gap-3">
            <svg
              aria-hidden="true"
              className={`w-10 h-10 text-gray-400 hidden sm:block ${
                imageUrl || loading ? "text-transparent" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <div className="flex flex-col justify-center">
              <p
                className={`mb-2 text-sm text-gray-600 ${
                  imageUrl || loading ? "text-transparent" : ""
                }`}
              >
                <span className="font-semibold">Klik om te uploaden</span> of
                sleep een bestand
              </p>
              <p
                className={`text-xs text-gray-600 ${
                  imageUrl || loading ? "text-transparent" : ""
                }`}
              >
                .PNG, .JPG, .JPEG of .WEBP zijn toegestaan
                {/* // To do - aangeven max upload grootte */}
              </p>
            </div>
            <p
              className={`text-sm absolute top-1/2 pr-3 left-[40%] -translate-y-1/2 text-gray-600 ${
                imageUrl ? "" : "text-transparent"
              }`}
            >
              <span className="font-semibold">Klik of sleep</span> opnieuw een
              bestand om het huidige bestand te vervangen
            </p>
          </div>
        </>
        <input
          id={`dropzone-file-${id}`}
          type="file"
          className="hidden"
          onChange={handleFileUpload}
        />
        {imageUrl && (
          <div className="inline-block">
            <Image
              src={imageUrl}
              height={100}
              width={150}
              aria-hidden
              alt="geuploade afbeelding gebruiker"
              className="w-auto absolute left-0 top-0 rounded-lg h-full"
            />
          </div>
        )}
        {loading && (
          <CircularProgress className="w-10 h-10 absolute top-1/2 -translate-y-1/2 left-8 z-30" />
        )}
      </label>
    </div>
  );
}
