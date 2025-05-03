"use client";

import React from "react";
import Image from "next/image";

function Arenas() {
  return (
    <div className="w-full flex flex-col items-center py-10">
      <div className=" w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border-2 border-dashed border-white/60 flex items-center justify-center">
        <div className="w-[290px] h-[290px] md:w-[470px] md:h-[470px] rounded-full bg-black/40 "></div>
      </div>
      <div
        className="text-white flex justify-center items-center font-sans relative -translate-y-10 md:-translate-y-1/2 py-10 border border-white/30 md:pl-20 pr-2 md:-translate-x-[50px] flex-col gap-y-10"
        style={{ width: "calc(100%)" }}
      >

        <div className="w-full flex items-center justify-between flex-col md:flex-row">
          <div className="max-w-[400px] pl-2">
            <h4 className="uppercase text-[#e7c084] text-2xl font-semibold tracking-wide">
              Choose from multiple
            </h4>
            <h2 className="text-7xl leading-[1.1] tracking-widest text-[#e7c084] font-semibold mb-4">
              ARENAS
            </h2>
          </div>


          <div className="flex flex-col justify-center items-end gap-6">
            {["Arena 1", "Arena 2", "Arena 3"].map((arena, i) => (
              <div key={arena} className="flex items-center gap-2">
                <p>{arena}</p>
                <div
                  className={`border border-white/60 ${
                    i === 1
                      ? "w-[140px] h-[120px] mr-8"
                      : "w-[120px] h-[100px]"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="px-5">
          <p className="text-sm leading-relaxed text-white/80 text-center">
            Battle across an icy bridge as your team of random champions charge
            toward the enemy Nexus in this chaotically fun 5v5 game mode.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Arenas;
