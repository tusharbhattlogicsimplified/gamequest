"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import ProductCarousel from "./components/ProductCarousel";
import ProductCardLarge from "../components/common/ProductCardLarge";
import { fetchProducts } from "@/services/productService";
import { Product } from "@/types/productTypes";
import SmallProductCardSection from "../components/common/SmallProductCarousel";
import Link from "next/link";
import IMAGES from "@/utils/imagePaths";
import Image from "next/image";

interface PageSectionProps {
  children: ReactNode;
  className?: string;
}

function Landing() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts(3);
      if (!data || !Array.isArray(data.products)) {
        throw new Error("Invalid product data format");
      }
      setProducts(data.products);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const PageSection: React.FC<PageSectionProps> = ({
    children,
    className = "",
  }) => {
    return (
      <section className={`relative ${className}`}>
        <div className="md:pl-22">{children}</div>
      </section>
    );
  };

  return (
    <>
      <div className="relative flex mb-12">
        <div className="flex-1 flex flex-col relative z-0">
          <main className="">
            <PageSection className="px-8 md:px-16 bg-black/50">
              <ProductCarousel products={products} />
            </PageSection>

            <PageSection className="py-12">
              <div className="w-full flex justify-between flex-col md:flex-row px-5">
                <h2 className="font-standout text-2xl md:text-4xl text-[#DAB785]">
                  MOST TRENDING
                </h2>
                <div className="flex justify-end md:justify-center items-center md:gap-x-2">
                  <Link
                    href={"/products"}
                    className="uppercase text-xs md:text-lg"
                  >
                    Go to Product Store
                  </Link>
                  <Image
                    src={IMAGES.rightArrowIcon.src}
                    width={25}
                    height={25}
                    alt={IMAGES.rightArrowIcon.alt}
                  />
                </div>
              </div>
              <div className="max-w-screen">
                <div className="pl-5">
                  <SmallProductCardSection products={products} />
                </div>
              </div>
            </PageSection>

            <div className="flex flex-col gap-y-10">
              <PageSection className="bg-black/50 py-10">
                <ProductCardLarge productData={products[0]} alignment="right" />
              </PageSection>
              <PageSection className="bg-black/50 py-10">
                <ProductCardLarge
                  productData={products[1]}
                  alignment="center"
                />
              </PageSection>
              <PageSection className="bg-black/50 py-10">
                <ProductCardLarge productData={products[2]} alignment="left" />
              </PageSection>
            </div>
          </main>
        </div>
        <div className="absolute top-0 left-0 h-full w-24 border-r-1 border-white/30 z-20  flex-col bg-none hidden md:flex">
          <Sidebar />
        </div>
      </div>
    </>
  );
}

export default Landing;