import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface LoaderProps {
  isVisible: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ isVisible }) => {
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 500);
    }

  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="absolute inset-0 bg-[#312819] z-100 flex items-center justify-center h-screen w-screen overflow-hidden">
          <motion.h2
            className="text-4xl font-bold font-standout text-[#DAB785]"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.5, 1, 0.5],
              transition: {
                opacity: {
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                },
                scale: { duration: 2, repeat: Infinity, repeatType: "reverse" },
              },
            }}
            exit={{ opacity: 0 }}
          >
            GameQuest
          </motion.h2>
        </div>
      )}
    </AnimatePresence>
  );
};
