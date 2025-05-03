'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProductDetails from "../components/ProductDetails";
import { fetchProductById } from "@/services/productService";
import { useAppSelector } from "@/app/store/hooks";
import { Product } from "@/types/productTypes";

// Type for the route segment props
interface ProductDetailsPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  const [product, setProduct] = useState<Product | null>(null);

  const productId = params.id;

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }

    const fetchProduct = async () => {
      const productData = await fetchProductById(Number(productId));
      setProduct(productData);
    };

    if (productId) {
      fetchProduct();
    }
  }, [user, productId, router]);

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
