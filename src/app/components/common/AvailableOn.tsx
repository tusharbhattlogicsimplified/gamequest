import IMAGES from "@/app/utils/imagePaths";
import Image from "next/image";
import React from "react";
import CustomImage from "../ui/CustomImage";

function AvailableOn() {
  return (
    <div className="flex flex-wrap gap-2 items-center h-min w-fit">
      <span className="text-sm text-gray-300">Available on:</span>
      <div className="flex gap-x-2 h-min items-center">
        <CustomImage
          src={IMAGES.iosIcon.src}
          alt={IMAGES.iosIcon.alt}
          width={40}
          height={40}
        />
        <CustomImage
          src={IMAGES.windowsIcon.src}
          alt={IMAGES.windowsIcon.alt}
          width={40}
          height={40}
        />
      </div>
    </div>
  );
}

export default AvailableOn;
