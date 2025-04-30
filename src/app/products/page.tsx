"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import {
  fetchAllCategories,
  fetchProducts,
  fetchProductsByCategory,
} from "@/services/productService";
import { Category, Product } from "@/types/productTypes";
import ProductCardSmall from "../components/common/ProductCardSmall";
import FilterSidebar from "./components/FilterSiderbar";
import SortDropdown from "../components/ui/SortDropDown";
import ProductCardLarge from "../components/common/ProductCardLarge";
import Footer from "../components/layout/Footer";

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All",
  ]);

  useEffect(() => {
    const getCategories = async () => {
      const cats = await fetchAllCategories();
      setCategories([{ name: "All", slug: "all" }, ...cats]); // Add "All" manually
    };
    getCategories();
    handleApplyFilters();
  }, []);

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
      <div className="min-h-screen bg-[#12121200] text-white px-12">
        <Header />
        <div className="flex gap-6 py-6">
          <FilterSidebar
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            onApply={handleApplyFilters}
          />
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

        <div>
          <ProductCardLarge productData={products[0]} alignment="right" />
          <ProductCardLarge productData={products[0]} alignment="center" />
          <ProductCardLarge productData={products[0]} alignment="left" />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default ProductsPage;
