import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import Link from "next/link";
import AvailableOn from "@/app/components/common/AvailableOn";
import Button from "@/app/components/ui/Button";
import RatingStars from "@/app/components/ui/RatingStars";
import { Product } from "@/types/productTypes";


export default function ProductCarousel({ products }: { products: Product[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"right" | "left">("right");

  const nextSlide = () => {
    setDirection("right");
    setActiveIndex((prev) => (prev + 1) % products.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > activeIndex ? "right" : "left");
    setActiveIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className="relative overflow-hidden h-[600px] w-full">
      <div className="relative h-full w-full">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            initial={{
              x: direction === "right" ? "-100%" : "100%",
              opacity: 0,
            }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction === "right" ? "100%" : "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <CarouselItem product={products[activeIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 w-2 ${
              index === activeIndex ? "bg-[#DAB785]" : "bg-white/50 "
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function CarouselItem({ product }: { product: Product }) {
  return (
    <div className="relative w-full h-full flex items-center text-white">

      <div className="relative z-10 w-full md:w-2/3 text-left space-y-6  ">
        <div className=" flex flex-col gap-y-4 max-w-[550px]">
          <div className="">
            <h2 className="text-3xl md:text-7xl font-title mb-2 w-full capitalize">
              {product?.title.split(" ").slice(0, 2).join(" ")}
            </h2>

            <p className="bg-[#1e1e1e] px-4 py-1 inline-block text-sm uppercase tracking-wide text-gray-300 w-full text-right">
              Return Policy: {product?.returnPolicy}
            </p>
          </div>

          <div className="py-6">
            <p className="text-gray-300 text-sm">{product?.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-col gap-y-2">
              <Link href={`/product/${product?.id}`}>
                <Button text="Buy Now" className="text-lg px-10 py-2.5" />
              </Link>
              <p className="text-sm ml-1">Buy now for ${product?.price} only</p>
            </div>
            <AvailableOn />
          </div>

          <div className="flex flex-col gap-y-2">
            <p className="text-xs text-green-400">
              Discount {product?.discountPercentage}% available
            </p>
            <RatingStars rating={product?.rating} />
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        
        {product?.thumbnail && (<Image
          src={product?.thumbnail}
          alt={product?.title}
          width={500}
          height={500}
          objectFit="fit" 
        />)}
      </div>
    </div>
  );
}
