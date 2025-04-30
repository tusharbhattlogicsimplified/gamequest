import Image from 'next/image'; // for Next.js
import Button from '../ui/Button';

interface ProductCardSmallProps {
  productData: any;
  onBuyClick?: () => void;
}

const ProductCardSmall: React.FC<ProductCardSmallProps> = ({
  productData,
  onBuyClick,
}) => {
  return (
    <div className="bg-yellow-100 rounded-lg shadow-md p-4 flex-shrink-0 w-[320px] h-[383px]">
      <span className="bg-[#3D352A] text-white rounded-full px-2 py-0.5 text-[10px]">
        Discount {productData?.discountPercentage} %
      </span>
      <div className="flex items-center justify-center text-xs ">
        <Image
          src={productData?.thumbnail}
          alt={productData?.title}
          width={180}
          height={180}
          className="rounded-full" // Add a class for styling if needed
        />
      </div>
      <div>
        <h3 className="font-bold text-xl text-[#281E1F]">{productData?.title}</h3>

        {/* Rating */}
        <div className="text-orange-400 text-sm">
          {'★'.repeat(productData?.rating)}{'☆'.repeat(5 - productData?.rating)}
        </div>

        {/* Genres */}
        <div className="text-sm text-red-600 font-medium space-x-1  capitalize">
          {/* <span className="">•</span> */}
          {productData?.tags.map((genre: any, i: any) => (
            <span key={i}>
              {genre}
              {i < productData?.tags.length - 1 && <span className=""> •</span>}
            </span>
          ))}
          <p className='text-black text-xs'>{productData?.returnPolicy}</p>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg text-[#281E1F]">${productData?.price}</span>
          <Button
            text='Buy Now'
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSmall;
