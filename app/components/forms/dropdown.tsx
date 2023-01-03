import React, { PropsWithChildren } from "react";

type DropdownProps = {
  label: string;
  options: string[];
};

const Dropdown = ({ label, options }: PropsWithChildren<DropdownProps>) => {
  return (
    <div>
      <label htmlFor={label.replaceAll(" ", "")} className="block text-xs text-gray-700">
        {label}
      </label>
      <select
        id={label.replaceAll(" ", "")}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        {options.map((value) => (
          <option key={value}>{value}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
