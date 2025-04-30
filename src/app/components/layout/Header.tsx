import IMAGES from "@/utils/imagePaths";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header className=" text-white w-full sticky">
      <div className="flex justify-between  py-8 items-center">
        {/* Left Navigation */}
        <nav className="flex items-center gap-6 text-white/80">
          <Link href="/" className="hover:text-gray-400">
            Home
          </Link>
          <span className="h-5 w-px bg-gray-600" />
          <Link href="/store" className="hover:text-gray-400">
            Game Store
          </Link>
          <span className="h-5 w-px bg-gray-600" />
          <Link href="/leaderboard" className="hover:text-gray-400">
            Leaderboard
          </Link>
        </nav>

        {/* Search */}
        <div className="flex justify-between items-center gap-6">
          <div className="w-96 px-5 py-2 rounded-full bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 flex gap-x-4">
            <Image
              src={IMAGES.searchIcon.src}
              width={20}
              height={20}
              alt={IMAGES.searchIcon.alt}
            />
            <input
              type="text"
              placeholder="What are you looking for?"
              className="border-0 outline-0 w-full"
            />
          </div>
          <span className="h-5 w-px bg-gray-600" />
          <div>
            <Image
              src={IMAGES.notificationIcon.src}
              width={40}
              height={40}
              alt={IMAGES.notificationIcon.alt}
            />
          </div>
          <span className="h-5 w-px bg-gray-600" />
          <div>
            {" "}
            <Image
              src={IMAGES.shopIcon.src}
              width={40}
              height={40}
              alt={IMAGES.shopIcon.alt}
            />
          </div>
          <span className="h-5 w-px bg-gray-600" />
          <div>
            {" "}
            <Image
              src={IMAGES.emptyCircleIcon.src}
              width={40}
              height={40}
              alt={IMAGES.emptyCircleIcon.alt}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
