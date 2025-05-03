import Button from "@/app/components/ui/Button";
import { Product } from "@/types/productTypes";
import Image from "next/image";
import React from "react";

interface ChampionSectionsProps {
  product: Product;
}

// Individual Section Component
function ChampionSection({
  product,
  reverse = false,
}: {
  product: Product;
  reverse?: boolean;
}) {
  const textAlign = reverse ? "items-end text-right" : "items-start text-left";
  const buttonJustify = reverse ? "justify-end" : "justify-start";

  return (
    <div
      className={`w-full flex items-center ${
        reverse ? "flex-row-reverse" : "flex-row"
      }  py-12`}
    >
      {/* Text block */}
      <div className={`w-1/2 flex flex-col  ${reverse ? "items-center" : ""}`}>
      <div className="w-fit flex flex-col gap-y-5">
          <div className="font-aoboshiOne">
            <h3 className="text-3xl md:text-5xl tracking-wider text-center">Akali</h3>
            <p className="text-md md:text-xl tracking-wider">The Rogue Assassin</p>
          </div>
          <div className={`w-full flex justify-center`}>
            <Button text="Buy Now" />
          </div>
        </div>
      </div>

      {/* Image block */}
      <div className="w-1/2 flex justify-center ">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={300}
          height={300}
          className="rounded-full"
        />
      </div>
    </div>
  );
}

// Parent Component
function ChampionSections({ product }: ChampionSectionsProps) {
  // Create 4 sections for demonstration
  const sections = Array.from({ length: 4 });

  return (
    <div className="w-full py-10">
      {sections.map((_, idx) => (
        <ChampionSection
          key={idx}
          product={product}
          reverse={idx % 2 === 1}
        />
      ))}
    </div>
  );
}

export default ChampionSections;
