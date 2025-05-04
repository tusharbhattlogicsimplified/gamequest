import { useState } from 'react';
import Image from 'next/image';
import IMAGES from '@/utils/imagePaths'; // Adjust the import path

interface CustomImageProps {
  src: string;
  alt: string;
  width?: number;  // Optional width
  height?: number;  // Optional height
  fill?: boolean;   // Add fill prop to allow the image to fill its parent
  fallbackSrc?: string;  // Optional custom fallback image
  className?: string;    // Allow passing custom class names
  objectFit?: 'contain' | 'cover' | 'fill';  // Optional objectFit for resizing
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  fallbackSrc = IMAGES.fallBackImage.src, // Set default fallback
  className,
  objectFit = 'cover',  // Default objectFit is 'cover'
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setImgSrc(fallbackSrc); // Set fallback image on error
  };

  const handleLoad = () => {
    setIsLoading(false); // Once image is loaded, hide loading state
  };

  // Apply styles for fill, using specific CSS values
  const imageStyles: React.CSSProperties = fill
    ? { position: 'absolute', inset: 0, objectFit }
    : {};

  return (
    <div
      className={`${className} ${fill ? 'relative' : ''}`}
      style={fill ? { position: 'relative', width: '100%', height: '100%' } : {}}
    >
      {/* Show fallback image immediately and replace with the actual image once loaded */}
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        onError={handleError} // Trigger fallback image on error
        onLoadingComplete={handleLoad} // Hide loading state once the image is loaded
        className={`transition-opacity ${isLoading ? 'opacity-0' : 'opacity-100'}`} // Fade in the image after loading
        style={imageStyles} // Apply the dynamic styles based on 'fill'
      />
    </div>
  );
};

export default CustomImage;
