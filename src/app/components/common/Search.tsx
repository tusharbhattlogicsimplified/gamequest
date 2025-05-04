"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import IMAGES from "@/utils/imagePaths";

const SearchBar = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const handleSearch = () => {
    if (searchText.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchText.trim())}`);
      setIsMobileSearchOpen(false); 
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="hidden md:flex items-center lg:w-xs px-4 py-2 rounded-full border-2 border-white/60 text-white bg-transparent">
        <Image src={IMAGES.searchIcon.src} width={20} height={20} alt="Search" />
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What are you looking for?"
          className="ml-4 w-full bg-transparent outline-none placeholder-gray-400 text-sm"
        />
      </div>

      <div className="md:hidden">
        <button onClick={() => setIsMobileSearchOpen(true)}>
          <Image src={IMAGES.searchIcon.src} width={38} height={38} alt="Search" />
        </button>
      </div>

      {/* Mobile: full-screen overlay */}
      {isMobileSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center px-6">
          <div className="flex w-full gap-2 items-center border border-white rounded-full bg-[#1c1c1c] px-4 py-3">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              placeholder="Search products..."
              className="flex-1 bg-transparent outline-none placeholder-gray-400 text-white text-md"
            />
            <button onClick={handleSearch}>
              <Image src={IMAGES.searchIcon.src} width={20} height={20} alt="Search" />
            </button>
          </div>
          <button
            onClick={() => setIsMobileSearchOpen(false)}
            className="absolute top-5 right-5 text-white text-2xl"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
};

export default SearchBar;
