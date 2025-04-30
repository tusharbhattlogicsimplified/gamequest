import React from 'react';
import ProductCardLarge from './ProductCardLarge'; // adjust path
import { Product } from '@/types/productTypes';

interface LargeGameSectionsProps {
    products: Product[]; // Pass products explicitly
}

const LargeGameSections: React.FC<LargeGameSectionsProps> = ({ products }) => {
    return (
        <>
            <div className='flex flex-col gap-y-10'>
                {products.map((product, index) => {
                    const alignments: Array<'left' | 'center' | 'right'> = ['right', 'center', 'left'];
                    const alignment = alignments[index % alignments.length]; // cycle through alignments

                    return (
                        <ProductCardLarge
                            productData={product}
                            alignment={alignment}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default LargeGameSections;
