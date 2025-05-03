import React from "react";
import ProductCardLarge from "./ProductCardLarge";
import { Product } from "@/types/productTypes";

interface Props {
  bannerProducts: Product[];
}

function LargeProductBannersSection({ bannerProducts }: Props) {
  
  function LargeProductBanner({
    product,
    alignment,
  }: {
    product: Product;
    alignment: "left" | "center" | "right";
  }) {
    return (
      <div >
        <section className="relative bg-black/30 py-10"> 
          <div className="pl-2 md:pl-22">
            <ProductCardLarge productData={product} alignment={alignment} />
          </div>
        </section>
      </div>
    );
  }

  // Alignment options in repeating order
  const alignments: Array<"right" | "center" | "left"> = [
    "right",
    "center",
    "left",
  ];

  return (
    <div className="flex flex-col gap-y-10 py-10">
      {bannerProducts.map((product, index) => {
        const alignment = alignments[index % alignments.length];
        return (
          <LargeProductBanner
            key={product.id || index}
            product={product}
            alignment={alignment}
          />
        );
      })}
    </div>
  );
}

export default LargeProductBannersSection;
