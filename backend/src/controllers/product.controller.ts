import { Request, Response } from "express";
import Product from "../models/product.model";
import {
  CreateProductInput,
  ProductDTO,
  UpdateProductInput,
} from "../types/product.types";

// Map product to DTO
const mapProductToDTO = (product: any): ProductDTO => {
  return {
    id: product._id,
    name: product.name,
    description: product.description,
    price: product.price,
    imageUrl: product.imageUrl,
    category: product.category,
    stock: product.stock,
    isActive: product.isActive,
    createdAt: product.createdAt,
  };
};

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    // Handle pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Handle search
    const searchQuery = req.query.search as string;
    let query: any = { isActive: true };

    if (searchQuery) {
      query.$text = { $search: searchQuery };
    }

    // Handle category filter
    const category = req.query.category as string;
    if (category) {
      query.category = category;
    }

    // Handle price filter
    const minPrice = parseFloat(req.query.minPrice as string);
    const maxPrice = parseFloat(req.query.maxPrice as string);

    if (!isNaN(minPrice)) {
      query.price = { ...query.price, $gte: minPrice };
    }

    if (!isNaN(maxPrice)) {
      query.price = { ...query.price, $lte: maxPrice };
    }

    // Handle sorting
    let sortOptions: any = { createdAt: -1 }; // Default sort by latest
    const sort = req.query.sort as string;
    
    switch (sort) {
      case 'price-asc':
        sortOptions = { price: 1 };
        break;
      case 'price-desc':
        sortOptions = { price: -1 };
        break;
      case 'last-added':
      default:
        sortOptions = { createdAt: -1 };
        break;
    }

    // Get products
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // Get total count
    const total = await Product.countDocuments(query);

    return res.status(200).json({
      products: products.map(mapProductToDTO),
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error fetching products",
      error: error.message,
    });
  }
};

// Get product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      product: mapProductToDTO(product),
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error fetching product",
      error: error.message,
    });
  }
};

// Create product (admin only)
export const createProduct = async (req: Request, res: Response) => {
  try {
    const productData: CreateProductInput = req.body;

    const product = await Product.create(productData);

    return res.status(201).json({
      message: "Product created successfully",
      product: mapProductToDTO(product),
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error creating product",
      error: error.message,
    });
  }
};

// Update product (admin only)
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productData: UpdateProductInput = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      productData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product: mapProductToDTO(product),
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
};

// Delete product (admin only)
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error deleting product",
      error: error.message,
    });
  }
};
