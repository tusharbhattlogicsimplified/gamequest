// components/LoaderWrapper.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Loader } from './Loader';
import { useLoader } from '@/contexts/LoaderContext';

export const LoaderWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { isLoading: isApiLoading } = useLoader();
  const [isRouteChanging, setIsRouteChanging] = useState(false);

  useEffect(() => {
    if (!pathname) return;

    setIsRouteChanging(true);
    const timeout = setTimeout(() => setIsRouteChanging(false), 500); // small delay to simulate route load

    return () => clearTimeout(timeout);
  }, [pathname]);

  const showLoader = isRouteChanging || isApiLoading;

  return (
    <>
      <Loader isVisible={showLoader} />
      {children}
    </>
  );
};
