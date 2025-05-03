import React from "react";
import Button from "../ui/Button";
import IMAGES from "@/utils/imagePaths";
import RatingStars from "../ui/RatingStars";
import AvailableOn from "./AvailableOn";
import Link from "next/link";

type Alignment = "left" | "center" | "right";

interface ProductCardLargeProps {
  productData: any;
  alignment?: Alignment;
}

const ProductCardLarge: React.FC<ProductCardLargeProps> = ({
  productData,
  alignment = "left",
}) => {
  const alignmentClasses: Record<Alignment, string> = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end md:mr-44",
  };

  return (
    <>
      <div className="md:absolute right-0  mr-8 flex flex-col gap-y-2 px-8">
        <div className="text-xs">
          <p>Discount {productData?.discountPercentage}% available</p>
        </div>
        <RatingStars rating={productData?.rating} />
      </div>
      <div className={`flex ${alignmentClasses[alignment]} p-6  `}>
        <div className="relative z-10 max-w-2xl  text-left space-y-6 flex flex-col gap-y-10">
          <div className=" flex  flex-col gap-y-4">
            <div className="max-w-[463] flex flex-col gap-y-4">
              <h2 className=" text-3xl md:text-5xl  mb-2 w-full font-aoboshiOne">
                {productData?.title}
              </h2>
              <p className="bg-[#1e1e1e] px-4 py-1 inline-block text-sm uppercase tracking-wide text-gray-300 w-full text-right">
                Return Policy : {productData?.returnPolicy}
              </p>
            </div>
            <div className="py-6">
              <p className="text-gray-300 text-lg">
                {productData?.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-x-8">
              <div className="flex flex-col gap-y-2">
                <Link href={`/product/${productData?.id}`}>
                  <Button text="Buy Now" className="text-lg px-10 py-2.5" />
                </Link>
                <p className="text-md">
                  Buy now for ${productData?.price} only
                </p>
              </div>
              <AvailableOn />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCardLarge;
