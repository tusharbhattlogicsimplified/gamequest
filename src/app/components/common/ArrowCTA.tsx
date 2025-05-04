import React from 'react';
import Link from 'next/link';

interface ArrowCTAProps {
  text: string;
  href: string;
}

const ArrowCTA: React.FC<ArrowCTAProps> = ({ text, href }) => {
  return (
    <div className="flex justify-end md:justify-center items-center md:gap-x-1 group h-fit transition-all duration-300 relative">
      <Link
        href={href}
        className="uppercase text-xs md:text-lg text-white group-hover:text-[#E58F28] transition-colors duration-300"
      >
        {text}
      </Link>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        viewBox="0 0 17 25"
        fill="none"
        className="text-white group-hover:text-[#E58F28] transition-colors duration-300"
      >
        <path
          d="M4 12.5H6.5M20 12.5L14 6.5M20 12.5L14 18.5M20 12.5H9.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="absolute bottom-0 left-0 right-0 border-b-[1px] border-transparent group-hover:border-[#E58F28] transition-all duration-300"></div>
    </div>
  );
};

export default ArrowCTA;
