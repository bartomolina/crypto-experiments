import React, { PropsWithChildren } from "react";

type FieldProps = {
  label: string;
  text?: string;
  type?: "input" | "details";
};

const Field = ({ label, text, type = "input" }: PropsWithChildren<FieldProps>) => {  
  return type === "details" ? (
    <div>
      <span className="block text-xs text-gray-700">{label}</span>
      <span className="block text-lg text-gray-900">{text}</span>
    </div>
  ) : (
    <div>
      <label htmlFor={label.replaceAll(" ", "")} className="block text-xs text-gray-700">
        {label}
      </label>
      <input
        type="text"
        defaultValue={text}
        id={label.replaceAll(" ", "")}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
  );
};

export default Field;
