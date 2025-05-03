"use client";
import React, { JSX, ReactNode, useEffect, useState } from "react";
import { Product } from "@/app/types/productTypes";
import LabelStrip from "@/app/components/ui/LabelStrip";
import RatingStars from "@/app/components/ui/RatingStars";
import AnimatedProductName from "./AnimatedProductName";
import Button from "@/app/components/ui/Button";
import AvailableOn from "@/app/components/common/AvailableOn";
import ChampionSections from "./ChampionSections";
import Arenas from "./Arenas";
import ReviewsCarousel from "./ReviewsCarousel";
import Image from "next/image";
import IMAGES from "@/app/utils/imagePaths";
import SecondaryProductBanner from "./SecondaryProductBanner";
import SmallProductCardSection from "@/app/components/common/SmallProductCarousel";
import { fetchProductsByCategory } from "@/app/services/productService";
import Link from "next/link";
import { useLoader } from "@/app/contexts/LoaderContext";
import CustomImage from "@/app/components/ui/CustomImage";

interface ProductDetailsProps {
  product: Product;
}

interface PageSectionProps {
  children: ReactNode;
  className?: string;
}

function ProductDetails({ product }: ProductDetailsProps): JSX.Element {
  const { showLoader, hideLoader } = useLoader();
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  useEffect(() => {
    getRecommendedProducts();
  }, []);

  useEffect(() => {
    hideLoader();
  }, [recommendedProducts]);

  async function getRecommendedProducts() {
    showLoader();
    const res = await fetchProductsByCategory(product.category);
    if (res) {
      setRecommendedProducts(res.products);
    }
  }

  function ProductBanner() {
    return (
      <div className="flex flex-col w-full">
        <div className="w-full flex justify-center">
          <div className="flex flex-col justify-center items-center md:w-4/5">
            <div className="w-full py-10 bg-[#701d2526] flex flex-col gap-y-28">
              <div>
                <LabelStrip
                  content={`Return Policy : ` + product.returnPolicy}
                />
                <RatingStars rating={product.rating} />
              </div>
              <div className="px-10 flex flex-col gap-y-18">
                <div className="w-full flex flex-col justify-center gap-y-16">
                  <AnimatedProductName name="League of Legends" />
                  <div className="flex flex-col gap-y-5">
                    <div className="flex justify-center">
                      <Button
                        text="Try for free"
                        className="text-lg px-10 py-3 font-semibold"
                      />
                    </div>
                    <div className="text-center text-xs">
                      <p>Discount {product.discountPercentage} available</p>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <AvailableOn />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function HeadingSection({ heading }: { heading: string }): JSX.Element {
    return (
      <div className="flex justify-between py-5 px-5 md:px-20 flex-col md:items-center md:flex-row gap-y-2">
        <h3 className="text-xl md:text-2xl">{heading}</h3>
        <Link href={"/products"}>
          <div className="uppercase flex gap-x-2">
            <p className="text-sm md:text-lg">View All</p>
            <CustomImage
              src={IMAGES.rightArrowIcon.src}
              width={30}
              height={30}
              alt={IMAGES.rightArrowIcon.alt}
            />
          </div>
        </Link>
      </div>
    );
  }

  const PageSection: React.FC<PageSectionProps> = ({
    children,
    className = "",
  }) => {
    return (
      <section
        className={`relative  w-full flex justify-center ${className} md:pl-25`}
      >
        <div className=" w-full flex justify-center border-l border-white/30  items-center">
          {children}
        </div>
      </section>
    );
  };

  return (
    <>
      <div className="w-full flex justify-center z-10">
        <ProductBanner />
      </div>
      <div className="relative -mt-44">
        <PageSection className="bg-black/20 z-0 md:pr-25">
          <div className="py-10 pt-55 md:px-22 px-8">
            {product.description}
            {product.description}
            {product.description}
          </div>
        </PageSection>
        <PageSection className="">
          <div className="flex flex-col w-full gap-y-10 py-20 md:px-22 px-8">
            <div className="w-full font-aoboshiOne uppercase text-[#DAB785]">
              <h3 className="text-2xl md:text-3xl font-normal">Choose your</h3>
              <h3 className="text-4xl md:text-6xl tracking-[0.2em]">
                Champion
              </h3>
            </div>
            <div>
              <p>
                Whether you like to dive straight into the fray, support your
                teammates, or something in between, there’s a spot for you on
                the Rift.
              </p>
            </div>
          </div>
        </PageSection>
        <PageSection className="bg-black">
          <ChampionSections product={product} />
        </PageSection>
        <PageSection className="bg-black/30 ">
          <Arenas />
        </PageSection>
        <PageSection>
          <div className="h-5"></div>
        </PageSection>
        <HeadingSection heading="Reviews from other top buyers" />

        <PageSection>
          <ReviewsCarousel reviews={product.reviews} />
        </PageSection>
        <PageSection className="bg-black/30">
          <SecondaryProductBanner product={product} />
        </PageSection>
        <PageSection>
          <div className="h-5"></div>
        </PageSection>
        <HeadingSection heading="Products recommended for you" />
        <PageSection className="">
          <div className="w-full pl-8 pb-7">
            <SmallProductCardSection products={recommendedProducts} />
          </div>
        </PageSection>
      </div>
    </>
  );
}

export default ProductDetails;
