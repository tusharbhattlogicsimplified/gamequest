import React from 'react';
import ProductCardSmall from './ProductCardSmall'; // Assuming it's in the same directory

interface SmallProductCardSectionProps {
  products: any[]; // or provide a specific type for product data
}

const SmallProductCardSection: React.FC<SmallProductCardSectionProps> = ({ products }) => {
  return (
    <div className="flex flex-wrap gap-4 py-8">
      {products.map((product, index) => (
        <ProductCardSmall key={index} productData={product} />
      ))}
    </div>
  );
};

export default SmallProductCardSection;
