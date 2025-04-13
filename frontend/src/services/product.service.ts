import api from "./api";
import {
  Product,
  ProductsResponse,
  CreateProductData,
  UpdateProductData,
} from "../types/product.types";

interface GetProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'last-added' | 'price-asc' | 'price-desc';
}

export const ProductService = {
  async getProducts(
    params: GetProductsParams = {}
  ): Promise<ProductsResponse> {
    const response = await api.get("/products", { params });
    return response.data;
  },

  async getProductById(id: string): Promise<Product> {
    const response = await api.get(`/products/${id}`);
    return response.data.product;
  },

  async createProduct(data: CreateProductData): Promise<Product> {
    const response = await api.post("/products", data);
    return response.data.product;
  },

  async updateProduct(id: string, data: UpdateProductData): Promise<Product> {
    const response = await api.put(`/products/${id}`, data);
    return response.data.product;
  },

  async deleteProduct(id: string): Promise<void> {
    await api.delete(`/products/${id}`);
  },
};

export default ProductService;
