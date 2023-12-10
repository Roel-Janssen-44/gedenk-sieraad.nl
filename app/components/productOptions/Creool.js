import InputSelect from "../InputSelect";
import { creoolOptions } from "./optionSets";

export default function Creool({ value, onChange }) {
  return (
    <InputSelect
      value={value}
      onChange={onChange}
      title="Creool:"
      options={creoolOptions}
    />
  );
}
