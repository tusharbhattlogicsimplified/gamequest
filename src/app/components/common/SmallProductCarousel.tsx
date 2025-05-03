import React, { useRef, useState } from 'react';
import ProductCardSmall from './ProductCardSmall';

interface SmallProductCardSectionProps {
  products: any[]; // ideally, use a specific type
}

const SmallProductCardSection: React.FC<SmallProductCardSectionProps> = ({ products }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // adjust scroll sensitivity
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={scrollRef}
      className="flex overflow-x-auto whitespace-nowrap gap-4 py-8 cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {products.map((product, index) => (
        <div key={index} className="inline-block">
          <ProductCardSmall productData={product} />
        </div>
      ))}
    </div>
  );
};

export default SmallProductCardSection;
