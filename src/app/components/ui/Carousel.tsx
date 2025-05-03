'use client';
import React, { useRef, useState } from 'react';

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  gap?: string; 
}

function Carousel<T>({ items, renderItem, gap = 'gap-4' }: CarouselProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false); // State for mouse down
  let startX = 0;
  let scrollLeft = 0;

  const onMouseDown = (e: React.MouseEvent) => {
    const slider = containerRef.current;
    if (!slider) return;
    setIsDown(true);
    slider.classList.add('cursor-grabbing');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  };

  const onMouseLeave = () => {
    setIsDown(false);
    containerRef.current?.classList.remove('cursor-grabbing');
  };

  const onMouseUp = () => {
    setIsDown(false);
    containerRef.current?.classList.remove('cursor-grabbing');
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !containerRef.current) return;

    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed factor
    containerRef.current.scrollLeft = scrollLeft - walk;

    e.preventDefault();
  };

  const onWheel = (e: React.WheelEvent) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`flex overflow-x-scroll ${gap} px-2 py-1 scroll-smooth no-scrollbar cursor-grab w-full`}
      style={{ WebkitOverflowScrolling: 'touch' }}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onWheel={onWheel}
    >
      {items.map((item, index) => (
        <div key={index} className="flex-shrink-0">
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

export default Carousel;
