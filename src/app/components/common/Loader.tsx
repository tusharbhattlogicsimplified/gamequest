// components/Loader.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  isVisible: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <div className='absolute h-screen w-screen '>
        </div>
      )}
    </AnimatePresence>
  );
};
