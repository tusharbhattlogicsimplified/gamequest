import IMAGES from "@/app/utils/imagePaths";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const SORT_OPTIONS = [
  "Release date : Old to New",
  "Release date : New to Old",
  "Price : Low to High",
  "Price : High to Low",
];

export default function SortDropdown() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dropdownClasses, setDropdownClasses] = useState("opacity-0 scale-95");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setVisible(true);
      setDropdownClasses("opacity-0 scale-95");
      setTimeout(() => {
        setDropdownClasses("opacity-100 scale-100");
      }, 10); 
    } else {
      setDropdownClasses("opacity-0 scale-95");
      setTimeout(() => {
        setVisible(false);
      }, 150);
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 rounded-full border text-white border-white flex items-center gap-2 text-[15px]"
      >
        Sort by
        <Image
          src={IMAGES.dropdownArrowIcon.src}
          width={10}
          height={10}
          alt={IMAGES.dropdownArrowIcon.alt}
        />
      </button>

      {visible && (
        <div
          className={`absolute right-0 mt-2 min-w-72 bg-[#2a2117] rounded-xl shadow-lg space-y-3 z-50 p-6 text-[15px]
            transition-all duration-200 ease-out origin-top-right transform
            ${dropdownClasses}
          `}
        >
          {SORT_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => {
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 rounded-full transition ${
                option === "selected"
                  ? "bg-orange-500 text-white"
                  : "text-white hover:bg-orange-400/20"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
