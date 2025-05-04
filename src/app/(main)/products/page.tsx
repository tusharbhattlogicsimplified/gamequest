"use client";
import React, { useEffect, useState } from "react";
import {
  fetchAllCategories,
  fetchProducts,
  fetchProductsByCategory,
} from "@/app/services/productService";
import { Category, Product } from "@/types/productTypes";
import LargeProductBannersSection from "@/app/components/common/LargeProductBannersSection";
import ProductCardSmall from "@/app/components/common/ProductCardSmall";
import SortDropdown from "@/app/components/ui/SortDropDown";
import FilterSidebar from "./components/FilterSiderbar";
import { useSearchParams } from "next/navigation";

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [bannerProducts, setBannerProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"]);
  const [appliedCategories, setAppliedCategories] = useState<string[]>(["All"]);
  const [selectedSortOption, setSelectedSortOption] = useState<string>("");
  const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    initializePage();
  }, [searchQuery]); // Re-run when searchQuery changes

  useEffect(() => {
    updateBannerProducts();
  }, [products]);

  const initializePage = async () => {
    const cats = await fetchAllCategories();
    setCategories([{ name: "All", slug: "all" }, ...cats]);
    await applyFilters(["All"], selectedRating);
  };

  const updateBannerProducts = () => {
    setBannerProducts(products.slice(0, 3));
  };

  const applyFilters = async (categoriesToApply: string[], rating: number | null) => {
    setAppliedCategories([...categoriesToApply]);

    let filteredProducts: Product[] = [];

    if (categoriesToApply.includes("All")) {
      const res = await fetchProducts();
      filteredProducts = res.products;
    } else {
      for (const category of categoriesToApply) {
        const res = await fetchProductsByCategory(category);
        filteredProducts.push(...res.products);
      }
    }

    if (rating !== null) {
      filteredProducts = filteredProducts.filter((p) => Math.round(p.rating) >= rating);
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((p) =>
        p.title.toLowerCase().includes(searchQuery)
      );
    }

    setProducts(applySorting(filteredProducts, selectedSortOption));
  };

  const handleApplyFilters = async (rating: number | null) => {
    setSelectedRating(rating);
    await applyFilters(selectedCategories, rating);
  };

  const applySorting = (products: Product[], sortOption: string) => {
    const sorted = [...products];
    if (sortOption === "Price : Low to High") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Price : High to Low") {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  };

  const handleSortChange = (option: string) => {
    setSelectedSortOption(option);
    setProducts(applySorting(products, option));
  };

  const renderSidebar = () => (
    <FilterSidebar
      categories={categories}
      selectedCategories={selectedCategories}
      setSelectedCategories={setSelectedCategories}
      onApply={handleApplyFilters}
      selectedRating={selectedRating}
      setSelectedRating={setSelectedRating}
    />
  );

  const renderMobileSidebar = () =>
    isMobileFilterVisible && (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex sm:hidden">
        <div className="w-4/5 max-w-xs bg-[#1c1c1c] p-4 h-full overflow-y-auto">
          <FilterSidebar
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            onApply={(rating) => {
              handleApplyFilters(rating);
              setIsMobileFilterVisible(false);
            }}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
          />
        </div>
        <div className="flex-1" onClick={() => setIsMobileFilterVisible(false)}></div>
      </div>
    );

  const renderHeader = () => (
    <div className="mb-7 flex w-full justify-between">
      <div>
        <p>
          Showing results for{" "}
          <span className="text-white/80">
            {searchQuery
              ? `"${searchQuery}" in ${appliedCategories.includes("All")
                  ? "All Categories"
                  : appliedCategories.join(", ")}`
              : appliedCategories.includes("All")
              ? "All Categories"
              : appliedCategories.join(", ")}
          </span>
        </p>
        <p className="text-white/80">{products.length} results found</p>
      </div>
      <div>
        <SortDropdown
          selectedOption={selectedSortOption}
          onChange={handleSortChange}
        />
      </div>
    </div>
  );

  const renderProductGrid = () => (
    <div className="grid gap-x-5 gap-y-10 grid-cols-[repeat(auto-fill,_334px)] justify-center">
      {products.map((product, index) => (
        <ProductCardSmall key={index} productData={product} />
      ))}
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-[#12121200] text-white px-2 md:px-12">
        <div className="flex gap-6 py-6">
          <div className="hidden sm:block">{renderSidebar()}</div>
          {renderMobileSidebar()}
          <div className="w-full px-3 text-xl">
            {renderHeader()}
            {renderProductGrid()}
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
