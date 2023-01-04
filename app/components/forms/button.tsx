import React, { MouseEventHandler, PropsWithChildren } from "react";

type ButtonProps = {
  text: string;
  clickAction: MouseEventHandler;
  disabled?: boolean;
};

const Button = ({ text, clickAction, disabled = false }: PropsWithChildren<ButtonProps>) => (
  <button
    type="submit"
    onClick={clickAction}
    disabled={disabled}
    className={
      disabled
        ? "inline-flex justify-center rounded-md border border-transparent bg-indigo-200 p-1 text-sm text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2"
        : "inline-flex justify-center rounded-md border border-transparent bg-indigo-600 p-1 text-sm text-white shadow-sm hover:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2"
    }
  >
    {text}
  </button>
);

export default Button;
