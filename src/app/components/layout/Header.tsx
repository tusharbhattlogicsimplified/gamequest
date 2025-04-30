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
          <div className="w-96 px-5 py-2 rounded-full bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="border-0 outline-0 w-full"
            />
          </div>
          <span className="h-5 w-px bg-gray-600" />
          <div>
            icon 1
          </div>
          <span className="h-5 w-px bg-gray-600" />
          <div>
            icon 2
          </div>
          <span className="h-5 w-px bg-gray-600" />
          <div>
            icon 3
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
