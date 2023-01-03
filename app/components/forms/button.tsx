import React, { MouseEventHandler, PropsWithChildren } from "react";

type ButtonProps = {
  text: string;
  clickAction: MouseEventHandler;
};

const Button = ({ text, clickAction }: PropsWithChildren<ButtonProps>) => (
  <button
    type="submit"
    onClick={clickAction}
    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 p-1 text-sm text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
  >
    {text}
  </button>
);

export default Button;
