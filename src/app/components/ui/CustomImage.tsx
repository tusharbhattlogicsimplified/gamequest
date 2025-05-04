import { useState, useEffect } from 'react';
import Image from 'next/image';
import IMAGES from '@/utils/imagePaths';

interface CustomImageProps {
  src: string;
  alt: string;
  width?: number; 
  height?: number;  
  fill?: boolean;   
  fallbackSrc?: string;  
  className?: string;   
  objectFit?: 'contain' | 'cover' | 'fill'; 
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  fallbackSrc = IMAGES.fallBackImage.src,
  className,
  objectFit = 'cover',  
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setImgSrc(src);
    setIsLoading(true);
  }, [src]);

  const handleError = () => {
    setImgSrc(fallbackSrc); 
  };

  const handleLoad = () => {
    setIsLoading(false); 
  };

  const imageStyles: React.CSSProperties = fill
    ? { position: 'absolute', inset: 0, objectFit }
    : {};

  return (
    <div
      className={`${className} ${fill ? 'relative' : ''}`}
      style={fill ? { position: 'relative', width: '100%', height: '100%' } : {}}
    >
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        onError={handleError} 
        onLoad={handleLoad} 
        className={`transition-opacity ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        style={imageStyles} 
      />
    </div>
  );
};

export default CustomImage;
