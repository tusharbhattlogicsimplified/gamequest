import React from 'react';
import ProductCardLarge from './ProductCardLarge'; 
import { Product } from '@/app/types/productTypes';

interface LargeGameSectionsProps {
    products: Product[]; 
}

const LargeGameSections: React.FC<LargeGameSectionsProps> = ({ products }) => {
    return (
        <div className='flex flex-col gap-y-10'>
            {products.map((product, index) => {
                const alignments: Array<'left' | 'center' | 'right'> = ['right', 'center', 'left'];
                const alignment = alignments[index % alignments.length];

                return (
                    <ProductCardLarge
                        key={product.id || index} 
                        productData={product}
                        alignment={alignment}
                    />
                );
            })}
        </div>
    );
};

export default LargeGameSections;
