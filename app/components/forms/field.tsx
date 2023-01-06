import React, { PropsWithChildren, ChangeEventHandler } from "react";

type FieldProps = {
  type?: "input" | "details";
  label: string;
  text?: string;
  id?: string;
  changeAction?: ChangeEventHandler<HTMLInputElement>;
};

const Field = ({ type = "input", label, text, id, changeAction }: PropsWithChildren<FieldProps>) => {  
  return type === "details" ? (
    <div>
      <span className="block text-xs text-gray-400">{label}</span>
      <span className="block text-gray-900">{text}</span>
    </div>
  ) : (
    <div>
      <label htmlFor={label.replaceAll(" ", "").replaceAll("(", "").replaceAll(")", "")} className="block text-xs text-gray-400">
        {label}
      </label>
      <input
        type="text"
        defaultValue={text}
        id={id ? id : label.replaceAll(" ", "").replaceAll("(", "").replaceAll(")", "")}
        onChange={changeAction}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
  );
};

export default Field;
