import { PropsWithChildren } from "react";
import { Montserrat } from "@next/font/google";
import { Roboto } from "@next/font/google";
import Nav from "./nav";

const montserrat = Montserrat({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const roboto = Roboto({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const Layout = ({ children }: PropsWithChildren) => (
  <div className={`${montserrat.variable} font-sans min-h-full`}>
    <Nav />
    <div>{children}</div>
  </div>
);

export default Layout;
