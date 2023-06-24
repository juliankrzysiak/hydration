import { useState } from "react";

interface Args {
  type: string;
  id: string;
  defaultValue?: string;
}

export const useField = ({ type, id, defaultValue }: Args) => {
  const [value, setValue] = useState(defaultValue ?? "");

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event?.target.value);
  };

  const object: [
    {
      id: string;
      type: string;
      value: string;
      onChange: React.ChangeEventHandler;
    },
    React.Dispatch<React.SetStateAction<string>>
  ] = [{ id, type, value, onChange }, setValue];
  return object;
};
