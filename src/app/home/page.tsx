'use client';

import React, { ReactNode, useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import ProductCarousel from "./components/ProductCarousel";
import Carousel from "../components/ui/Carousel";
import ProductCardSmall from "../components/common/ProductCardSmall";
import ProductCardLarge from "../components/common/ProductCardLarge";
import { fetchProducts } from "@/services/productService";
import { Product } from "@/types/productTypes";
import LargeGameSections from "../components/common/LargeGameSections";
import SmallProductCardSection from "../components/common/SmallProductCardSection";
import Footer from "../components/layout/Footer";

export const games = [
  {
    title: 'World of Warcraft',
    price: 48,
    players: '10k+ Players',
    genres: ['Action', 'Adventure'],
    releaseDate: '10th August 2022',
    onlineUsers: 1200,
    rating: 4,
  },
  {
    title: 'The Witcher',
    price: 48,
    players: '10k+ Players',
    genres: ['Action', 'Adventure'],
    releaseDate: '10th August 2022',
    onlineUsers: 1200,
    rating: 3,
  },
  {
    title: 'Horizon',
    price: 48,
    players: '10k+ Players',
    genres: ['Action', 'Adventure'],
    releaseDate: '10th August 2022',
    onlineUsers: 1200,
    rating: 4,
  },
  {
    title: 'Valorant',
    price: 48,
    players: '10k+ Players',
    genres: ['Action', 'Adventure'],
    releaseDate: '10th August 2022',
    onlineUsers: 1200,
    rating: 3,
  },
  {
    title: 'Cyberpunk 2077',
    price: 48,
    players: '10k+ Players',
    genres: ['RPG', 'Open World'],
    releaseDate: '10th August 2022',
    onlineUsers: 1200,
    rating: 4,
  },
  {
    title: 'Cyberpunk 20771',
    price: 48,
    players: '10k+ Players',
    genres: ['RPG', 'Open World'],
    releaseDate: '10th August 2022',
    onlineUsers: 1200,
    rating: 4,
  },
];

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
      // Optional: Validate API shape (defensive check)
      if (!data || !Array.isArray(data.products)) {
        throw new Error('Invalid product data format');
      }
      setProducts(data.products);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      // setError('Failed to load products. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const PageSection: React.FC<PageSectionProps> = ({ children, className = '' }) => {
    return (
      <section className={`relative ${className}`}>
        <div className="pl-20">
          {children}
        </div>
      </section>
    );
  };




  return (
    <>
      <div className="relative min-h-screen flex overflow-x-hidden mb-12">
        {/* Content Area first (sections span full width) */}
        <div className="flex-1 flex flex-col relative z-0">
          <main className="flex-1">

            <PageSection className="px-8">
              <Header />
            </PageSection>

            <PageSection className="px-8">
              <ProductCarousel />
            </PageSection>

            <PageSection className="bg-[#14141400]">
              <SmallProductCardSection products={products} />
            </PageSection>

            <div className="flex flex-col gap-y-10">
              <PageSection className="bg-green-300/10">
                <ProductCardLarge productData={products[0]} alignment="right" />
              </PageSection>
              <PageSection className="bg-green-300/10">
                <ProductCardLarge productData={products[1]} alignment="center" />
              </PageSection>
              <PageSection className="bg-green-300/10">
                <ProductCardLarge productData={products[2]} alignment="left" />
              </PageSection>
            </div>

          </main>
        </div>

        {/* Sidebar sits on top (absolute overlay) */}
        <div className="absolute top-0 left-0 h-full w-20 border-r border-gray-700 z-20 flex flex-col bg-none">
          <Sidebar />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>

  );
}

export default Landing;
