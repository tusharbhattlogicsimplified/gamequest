"use client";
import React, { useEffect, useState } from "react";
import {
  fetchAllCategories,
  fetchProducts,
  fetchProductsByCategory,
} from "@/app/services/productService";
import { Category, Product } from "@/types/productTypes";
import ProductCardSmall from "../components/common/ProductCardSmall";
import FilterSidebar from "./components/FilterSiderbar";
import SortDropdown from "../components/ui/SortDropDown";
import LargeProductBannersSection from "../components/common/LargeProductBannersSection";

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [bannerProducts, setBannerProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All",
  ]);
  const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      const cats = await fetchAllCategories();
      setCategories([{ name: "All", slug: "all" }, ...cats]); 
    };
    getCategories();
    handleApplyFilters();
  }, []);

  useEffect(() => {
    setBannerProducts(products.splice(0, 3));
  }, [products]);

  const handleApplyFilters = async () => {
    if (selectedCategories.includes("All")) {
      const res = await fetchProducts();
      setProducts(res.products);
    } else {
      const allProducts: Product[] = [];
      for (const category of selectedCategories) {
        const res = await fetchProductsByCategory(category);
        allProducts.push(...res.products);
      }
      setProducts(allProducts);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#12121200] text-white px-2 md:px-12">
        <div className="flex gap-6 py-6">
          {/* Desktop Sidebar */}
          <div className="hidden sm:block">
            <FilterSidebar
              categories={categories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              onApply={handleApplyFilters}
            />
          </div>

          {/* Mobile Sidebar */}
          {isMobileFilterVisible && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex sm:hidden">
              <div className="w-4/5 max-w-xs bg-[#1c1c1c] p-4 h-full overflow-y-auto">
                <FilterSidebar
                  categories={categories}
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                  onApply={() => {
                    handleApplyFilters();
                    setIsMobileFilterVisible(false);
                  }}
                />
              </div>
              <div
                className="flex-1"
                onClick={() => setIsMobileFilterVisible(false)}
              ></div>
            </div>
          )}

          <div className="w-full px-3 text-xl">
            <div className="mb-7 flex w-full justify-between">
              <div>
                <p>Showing result for </p>
                <p className="text-white/80">{products.length} results found</p>
              </div>
              <div>
                <SortDropdown />
              </div>
            </div>
            <div className="grid gap-x-5 gap-y-10 grid-cols-[repeat(auto-fill,_334px)] justify-center">
              {products.map((product, index) => (
                <ProductCardSmall key={index} productData={product} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <LargeProductBannersSection bannerProducts={bannerProducts} />

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 sm:hidden">
        <button
          onClick={() => setIsMobileFilterVisible(true)}
          className="bg-white text-black px-4 py-2 rounded-full shadow-lg"
        >
          Filter
        </button>
      </div>
    </>
  );
}

export default ProductsPage;
