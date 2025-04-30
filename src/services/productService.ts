// services/productService.ts
import apiClient from '@/lib/axios';
import { Product, Category, ProductListResponse } from '@/types/productTypes';

// Fetch all products
// services/products.ts

export const fetchProducts = async (limit?: number): Promise<ProductListResponse> => {
  const params = new URLSearchParams();
  if (limit !== undefined) {
    params.append('limit', limit.toString());
  }
  const url = params.toString() ? `/products?${params.toString()}` : '/products';
  const response = await apiClient.get<ProductListResponse>(url);
  return response.data;
};


// Fetch product by ID
export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await apiClient.get<Product>(`/products/${id}`);
  return response.data;
};

// Fetch all categories
export const fetchAllCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get<Category[]>('/products/categories');
  return response.data;
};

// Fetch products by category
export const fetchProductsByCategory = async (category: string): Promise<ProductListResponse> => {
  const response = await apiClient.get<ProductListResponse>(`/products/category/${category}`);
  return response.data;
};
