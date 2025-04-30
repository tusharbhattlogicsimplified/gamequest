import IMAGES from '@/utils/imagePaths';
import Image from 'next/image';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/40 text-gray-300 py-6 text-sm">
      {/* Top Links */}
      <div className="flex flex-wrap justify-center gap-6 border-b border-gray-700 pb-4 mb-4">
        <a href="#" className="hover:text-white transition">Privacy Notice</a>
        <a href="#" className="hover:text-white transition">Terms of Service</a>
        <a href="#" className="hover:text-white transition">Cookie Policy</a>
        <a href="#" className="hover:text-white transition">Company Information</a>
        <a href="#" className="hover:text-white transition">Cookie Preferences</a>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs mb-4">
        Copyright © GameQuest, Inc. All rights reserved
      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-4">
        <a href="#" className="p-2 rounded border border-gray-600 hover:border-white transition">
          <Image
            src={IMAGES.twitterIcon.src}
            alt={IMAGES.twitterIcon.alt}
            width={20}
            height={20}
          />
        </a>
        <a href="#" className="p-2 rounded border border-gray-600 hover:border-white transition">
        <Image
            src={IMAGES.facebookIcon.src}
            alt={IMAGES.facebookIcon.alt}
            width={20}
            height={20}
          />
        </a>
        <a href="#" className="p-2 rounded border border-gray-600 hover:border-white transition">
        <Image
            src={IMAGES.instagramIcon.src}
            alt={IMAGES.instagramIcon.alt}
            width={20}
            height={20}
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
