import InputRadio from "../InputRadio";
import { aspakketOptions } from "./optionSets";

export default function Aspakket({ value, onChange }) {
  return (
    <InputRadio
      value={value}
      onChange={onChange}
      title="Maak een keuze:"
      options={aspakketOptions}
    />
  );
}
