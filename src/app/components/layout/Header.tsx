import React, { useState, useRef, useEffect } from "react";
import IMAGES from "@/app/utils/imagePaths";
import Link from "next/link";
import Notification from "../common/Notification";
import CustomImage from "../ui/CustomImage";

function Header() {
  const [showNotification, setShowNotification] = useState(false);
  const notifRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current?.contains(e.target as Node)) {
        setShowNotification(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="text-white w-full sticky top-0 z-50 bg-[#15140f] px-4 md:px-10">
        <div className="flex justify-between py-3 md:py-8 items-center">
          <nav className="hidden sm:flex items-center gap-6 text-white/80">
            <Link href="/" className="hover:text-gray-400">
              Home
            </Link>
            <span className="h-5 w-px bg-gray-600" />
            <Link href="/products" className="hover:text-gray-400">
              Product Store
            </Link>
          </nav>

          <div className="flex sm:hidden">
            <button onClick={() => ({})}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 6.75h16.5m-16.5 6.75h16.5"
                />
              </svg>
            </button>
          </div>

          <div className="flex justify-between items-center gap-6 relative">
            <div className="hidden sm:flex w-96 px-5 py-2 rounded-full bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 gap-x-4">
              <CustomImage
                src={IMAGES.searchIcon.src}
                width={20}
                height={20}
                alt={IMAGES.searchIcon.alt}
              />
              <input
                type="text"
                placeholder="What are you looking for?"
                className="border-0 outline-0 w-full bg-transparent"
              />
            </div>

            <div className="flex sm:hidden">
              <button>
                <CustomImage
                  src={IMAGES.searchIcon.src}
                  width={40}
                  height={40}
                  alt={IMAGES.searchIcon.alt}
                />
              </button>
            </div>

            <span className="h-5 w-px bg-gray-600" />

            <div className="relative" ref={notifRef}>
              <button onClick={() => setShowNotification(!showNotification)}>
                <CustomImage
                  src={IMAGES.notificationIcon.src}
                  width={40}
                  height={40}
                  alt={IMAGES.notificationIcon.alt}
                />
              </button>
              {showNotification && (
                <div className="absolute right-0 top-12 z-50">
                  <Notification
                    showNotification={showNotification}
                    setShowNotification={setShowNotification}
                  />
                </div>
              )}
            </div>

            <span className="h-5 w-px bg-gray-600" />
            <div>
              <CustomImage
                src={IMAGES.shopIcon.src}
                width={40}
                height={40}
                alt={IMAGES.shopIcon.alt}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
