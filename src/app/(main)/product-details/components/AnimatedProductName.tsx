"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedProductNameProps {
  name: string;
}

const AnimatedProductNameComponent: React.FC<AnimatedProductNameProps> = ({ name }) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    setShouldAnimate(true);
  }, []);

  const words = name.trim().split(/\s+/);
  const mid = Math.ceil(words.length / 2);
  const firstLine = words.slice(0, mid).join(" ");
  const secondLine = words.slice(mid).join(" ");

  const lineHeight = "1em";

  return (
    <div
      className="relative inline-block leading-snug text-center font-algerian text-5xl md:text-7xl font-normal text-[#FFE3C1]"
      style={{ lineHeight }}
    >
      <div className="absolute inset-0 -top-20 h-full" style={{ zIndex: 0 }}>
      </div>

      <div
        className="overflow-hidden"
        style={{ height: lineHeight, position: "relative", zIndex: 10 }}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={shouldAnimate ? { y: "0%" } : false}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {firstLine}
        </motion.div>
      </div>

      {secondLine && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={shouldAnimate ? { opacity: 1 } : false}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="block relative z-10"
        >
          {secondLine}
        </motion.div>
      )}
    </div>
  );
};

const AnimatedProductName = React.memo(AnimatedProductNameComponent);

export default AnimatedProductName;
