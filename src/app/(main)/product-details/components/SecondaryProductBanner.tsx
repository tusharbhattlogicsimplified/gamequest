import AvailableOn from "@/app/components/common/AvailableOn";
import Button from "@/app/components/ui/Button";
import { Product } from "@/types/productTypes";
import React from "react";

function SecondaryProductBanner({ product }: { product: Product }) {
  return (
    <div className="flex items-center justify-center bg-gradient-to-br w-full py-40 px-8">
      <div className="flex flex-col md:flex-row w-full md:pl-25">
        <div className="border border-[#9e896e] rounded-tr-md w-full md:w-1/2 h-64 md:h-auto" />

        <div className="text-white w-full md:w-1/2 flex flex-col items-center justify-center md:px-20 mt-10 md:mt-0 gap-y-10 ">
          <div className="uppercase text-center font-aoboshiOne mb-6 text-[#DAB785]">
            <h3 className="text-3xl">{"start your"}</h3>
            <h3 className="text-7xl tracking-widest">{"Legend"}</h3>
          </div>

          <div className="text-sm text-center leading-relaxed space-y-4 mb-6">
            <p>{product.description}</p>
            <p>{product.description}</p>
          </div>

          <div className="flex items-center gap-x-10 w-full  justify-between md:px-5">
            <div className="flex flex-col gap-y-2">
              <Button text="Buy Now" className="text-sm md:text-md min-w-24"/>
              <span className="text-xs">{"Buy now for $40 only"}</span>
            </div>
            <div className="w-full md:w-fit justify-center items-center">
              <AvailableOn />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecondaryProductBanner;
