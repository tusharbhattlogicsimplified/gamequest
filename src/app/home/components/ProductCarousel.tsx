"use client";

import Button from "@/app/components/ui/Button";
import IMAGES from "@/utils/imagePaths";
import Image from "next/image";
import { useState } from "react";

const games = [
  {
    title: "Days Gone",
    releaseDate: "30th December",
    description: `Players assume the role of Deacon St. John, a former bounty hunter struggling to survive in a post-apocalyptic world filled with zombie-like creatures called Freaks. Though players are surrounded by death and danger on all sides, the world that they get to explore feels as though it’s truly alive, which can encourage players to take risks when they probably shouldn't.`,
    tryUrl: "#",
    buyUrl: "#",
    backgroundImage: "/images/days-gone.jpg", // optional
  },
  {
    title: "Days Gone 2",
    releaseDate: "30th December",
    description: `Players assume the role of Deacon St. John, a former bounty hunter struggling to survive in a post-apocalyptic world filled with zombie-like creatures called Freaks. Though players are surrounded by death and danger on all sides, the world that they get to explore feels as though it’s truly alive, which can encourage players to take risks when they probably shouldn't.`,
    tryUrl: "#",
    buyUrl: "#",
    backgroundImage: "/images/days-gone.jpg", // optional
  },
  // Add more games here
];

export default function ProductCarousel() {
  const [active, setActive] = useState(0);
  const game = games[active];

  return (
    <div className="relative w-full h-[500px] flex items-center  text-white ">
      {/* Optional: background image */}
      {/* {game.backgroundImage && (
        // <Image
        //   src={game.backgroundImage}
        //   alt={game.title}
        //   fill
        //   className="object-cover opacity-10 absolute top-0 left-0 z-0"
        // />
      )} */}

      <div className="relative z-10 w-full text-left space-y-6">
        <div className="max-w-2xl flex  flex-col gap-y-4">
          <div className="w-[463]">
            <h2 className="text-7xl font-title mb-2 w-full">{game.title}</h2>
            <p className="bg-[#1e1e1e] px-4 py-1 inline-block text-sm uppercase tracking-wide text-gray-300 w-full text-right">
              Release Date: {game.releaseDate}
            </p>
          </div>
          <div className="py-6">
            <p className="text-gray-300 text-sm">{game.description}</p>

          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              text="Try For Free"

            />

            <span className="text-sm text-gray-300">Available on:</span>

            <Image src={IMAGES.iosIcon.src} alt={IMAGES.iosIcon.alt} width={28} height={28} />
            <Image
              src={IMAGES.windowsIcon.src}
              alt={IMAGES.windowsIcon.alt}
              width={28}
              height={28}
            />
          </div>

          <div className="text-sm text-green-400 flex items-center gap-2">
            {/* <Image
              src="/icons/check-circle.svg"
              alt="Friends"
              width={14}
              height={14}
            /> */}
            40 of your friends are playing
          </div>

        </div>

        {/* Dots */}
        <div className="flex gap-2 mt-6 w-full justify-center">
          {games.map((_, idx) => (
            <button
              key={idx}
              className={`w-2 h-2 rounded-full ${idx === active ? "bg-orange-500" : "bg-white/30"
                }`}
              onClick={() => setActive(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
