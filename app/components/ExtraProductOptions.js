"use client";

import Creool from "./productOptions/Creool";
import Aspakket from "./productOptions/Aspakket";
import Hars from "./productOptions/Hars";
import Tekst from "./productOptions/Tekst";

export default function ExtraProductOptions({
  tags,
  extraOptions,
  setExtraOptions,
}) {
  const handleChange = (newValue, option) => {
    const existingOptionIndex = extraOptions.findIndex((o) => o.key === option);
    if (existingOptionIndex !== -1) {
      setExtraOptions((prevOptions) => {
        const updatedOptions = [...prevOptions];
        updatedOptions[existingOptionIndex].value = newValue;
        return updatedOptions;
      });
    } else {
      setExtraOptions((prevOptions) => [
        ...prevOptions,
        { key: option, value: newValue },
      ]);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {tags.map((tag, index) => {
        const Component = components[tag];
        if (Component) {
          return (
            <Component
              key={index}
              value={
                extraOptions.find((option) => option.key === tag)?.value || ""
              }
              onChange={(value) => handleChange(value, tag)}
            />
          );
        }
        return null;
      })}
    </div>
  );
}

const components = {
  creool: Creool,
  aspakket: Aspakket,
  hars: Hars,
  tekst: Tekst,
};