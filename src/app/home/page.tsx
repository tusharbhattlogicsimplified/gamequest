import React from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import ProductCarousel from "./components/ProductCarousel";

function Landing() {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div>
          <ProductCarousel/>
        </div>
      </div>
    </div>
  );
}

export default Landing;
