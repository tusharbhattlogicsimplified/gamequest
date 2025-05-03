'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductDetails from "../components/ProductDetails";
import { fetchProductById } from "@/services/productService";
import { useAppSelector } from "@/app/store/hooks";
import { Product } from "@/types/productTypes";

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user); // Get user from redux state

  const [product, setProduct] = useState<Product| null>(null);

  // Access the product ID from params (params are already available in the page component)
  const productId = params.id;

  useEffect(() => {
    // Check if the user is logged in, if not, redirect to login page
    if (!user) {
      router.push('/login');
    }

    // Fetch the product once the user is logged in
    const fetchProduct = async () => {
      // Ensure productId is converted to a number
      const productData = await fetchProductById(Number(productId));
      setProduct(productData);
    };

    if (productId) {
      fetchProduct();
    }
  }, [user, productId, router]);

  if (!user) {
    return null; // Or a loading spinner
  }

  if (!product) {
    return <div>Loading...</div>; // Or some other loading state
  }

  return (
    <div className="py-0">
      <ProductDetails product={product} />
    </div>
  );
}
