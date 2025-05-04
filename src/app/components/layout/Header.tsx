"use client";

import React, { useState, useRef, useEffect } from "react";
import IMAGES from "@/utils/imagePaths";
import Link from "next/link";
import Notification from "../common/Notification";
import Image from "next/image";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";
import SearchBar from "../common/Search";

function Header() {

  const [showNotification, setShowNotification] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotification(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);
  
  return (
    <>
      <header className="text-white w-full sticky top-0 z-50 bg-[#0f0a00] px-4 md:pr-10 md:pl-4">
        <div className="flex justify-between py-3 md:py-8 items-center">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-white/80">
            <Link
              href="/home"
              className="hover:text-[#DAB785] font-standout text-[#DAB785] px-3 mr-1"
            >
              <h2 className="text-3xl">GQ</h2>
            </Link>

            <Link href="/home" className="hover:text-[#DAB785]">
              Home
            </Link>
            <span className="h-5 w-px bg-gray-600" />
            <Link href="/products" className="hover:text-[#DAB785]">
              Product Store
            </Link>
          </nav>

          {/* Hamburger Menu for Mobile */}
          <div className="flex md:hidden">
            <button onClick={() => setIsSidebarOpen((prev) => !prev)}>
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

          <div className="flex justify-between items-center gap-6 relative ">
              <SearchBar/>
            <span className="h-5 w-px bg-gray-600" />

            {/* Notification */}
            <div className="relative" ref={notifRef}>
              <button onClick={() => setShowNotification(!showNotification)}>
                <Image
                  src={IMAGES.notificationIcon.src}
                  width={40}
                  height={40}
                  alt={IMAGES.notificationIcon.alt}
                  className="cursor-pointer"
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

            {/* Shopping Icon */}
            <div>
              <Link href={"/products"}>
                <Image
                  src={IMAGES.shopIcon.src}
                  width={40}
                  height={40}
                  alt={IMAGES.shopIcon.alt}
                />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed z-50">
          <Sidebar />
        </div>
      )}
    </>
  );
}

export default Header;
