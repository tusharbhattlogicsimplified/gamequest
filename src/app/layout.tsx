"use client";
import {
  Aoboshi_One,

  Press_Start_2P,
  Wallpoet,
} from "next/font/google";
import "./globals.css";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { LoaderProvider } from "@/contexts/LoaderContext";
import { LoaderWrapper } from "./components/common/LoaderWrapper";
import { Provider } from "react-redux";
import {  store } from "../store";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins", 
  display: "swap",
});

const wallpoet = Wallpoet({
  subsets: ["latin"],
  weight: ["400"], 
  variable: "--font-wallpoet", 
  display: "swap",
});

const press_Start_2P = Press_Start_2P({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-press_Start_2P", 
  display: "swap",
});

const aoboshi_One = Aoboshi_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-aoboshi_One", 
  display: "swap",
});

const algerian = localFont({
  src: [

    {
      path: "../../public/fonts/algerian.ttf", 
      weight: "400",
      style: "normal",
    },
  ],
  variable
  : "--font-algerian",
  display: "swap",
  preload: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${wallpoet.variable} ${press_Start_2P.variable}  ${aoboshi_One.variable} ${algerian.variable} antialiased`}
      >
        <Provider store={store}>
            <LoaderProvider>
              <LoaderWrapper>
                <div className=" ">
                  {/* <Header /> */}
                  {children}
                  {/* <Footer /> */}
                </div>
              </LoaderWrapper>
            </LoaderProvider>
        </Provider>
      </body>
    </html>
  );
}
