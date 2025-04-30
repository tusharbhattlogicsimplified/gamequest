import React from "react";
import Button from "../ui/Button";
import IMAGES from "@/utils/imagePaths";
import RatingStars from "../ui/RatingStars";

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
    right: "justify-end",
  };

  return (
    <>
      <div className="w-full flex justify-end px-6">
        <RatingStars rating={productData?.rating} />
      </div>
      <div className={`flex ${alignmentClasses[alignment]} p-6 w-11/12 `}>
        <div className="relative z-10 max-w-lg text-left space-y-6 flex flex-col gap-y-10">
          <div className="max-w-2xl flex  flex-col gap-y-4">
            <div className="w-[463] flex flex-col gap-y-4">
              <h2 className="text-5xl  mb-2 w-full font-aoboshiOne">{productData?.title}</h2>
              <p className="bg-[#1e1e1e] px-4 py-1 inline-block text-sm uppercase tracking-wide text-gray-300 w-full text-right">
                Release Date : check
              </p>
            </div>
            <div className="py-6">
              <p className="text-gray-300 text-sm">
                {productData?.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button text="Play Now" className="text-lg"/>
              <span className="text-sm text-gray-300">Available on:</span>

              {/* <Image src={IMAGES.iosIcon.src} alt={IMAGES.iosIcon.alt} width={28} height={28} />
            <Image
              src={IMAGES.windowsIcon.src}
              alt={IMAGES.windowsIcon.alt}
              width={28}
              height={28}
            /> */}
            </div>

            <div className="text-sm text-green-400 flex items-center gap-2">
              {/* <Image
              src="/icons/check-circle.svg"
              alt="Friends"
              width={14}
              height={14}
            /> */}
              40 of your friends are playing
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCardLarge;
