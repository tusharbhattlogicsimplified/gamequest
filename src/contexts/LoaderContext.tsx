// contexts/LoaderContext.tsx
'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoaderContextType {
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const useLoader = (): LoaderContextType => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
};

export const LoaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loadingCount, setLoadingCount] = useState(0);

  const showLoader = () => setLoadingCount(count => count + 1);
  const hideLoader = () => setLoadingCount(count => Math.max(count - 1, 0));

  return (
    <LoaderContext.Provider value={{ isLoading: loadingCount > 0, showLoader, hideLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};
