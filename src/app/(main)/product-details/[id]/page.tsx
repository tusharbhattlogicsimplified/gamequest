"use client"
import { useAppSelector } from '@/store/hooks';
import { fetchProductById } from '@/app/services/productService';
import { Product } from '@/types/productTypes';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation'; 
import { useState, useEffect } from 'react';
import ProductDetails from '../components/ProductDetails';

export default function ProductDetailsPage() {
  const { id } = useParams(); 
  const router = useRouter(); 

  const [product, setProduct] = useState<Product | null>(null);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }

    const fetchProduct = async () => {
      const productData = await fetchProductById(Number(id));
      setProduct(productData);
    };

    if (id) {
      fetchProduct();
    }
  }, [user, id, router]);

  if (!user) {
    return null;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-0">
      <ProductDetails product={product} />
    </div>
  );
}
