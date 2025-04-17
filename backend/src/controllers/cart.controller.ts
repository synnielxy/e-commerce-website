import { Request, Response } from "express";
import Cart, { ICart } from "../models/cart.model";
import Product from "../models/product.model";

// Get cart for current user
export const getCart = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Add item to cart
export const addToCart = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }
    const { productId, quantity } = req.body;

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if requested quantity exceeds available stock
    if (product.stock < quantity) {
      return res.status(400).json({
        message: "Insufficient stock",
        availableStock: product.stock,
      });
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    // Check if product already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex !== -1) {
      // Check if total quantity (existing + new) exceeds stock
      const totalQuantity =
        cart.items[existingItemIndex].quantity + parseInt(quantity);
      if (totalQuantity > product.stock) {
        return res.status(400).json({
          message: "Insufficient stock",
          availableStock: product.stock,
          currentCartQuantity: cart.items[existingItemIndex].quantity,
        });
      }
      // Update quantity if product exists
      cart.items[existingItemIndex].quantity = totalQuantity;
    } else {
      // Add new item if product doesn't exist
      cart.items.push({
        product: productId,
        quantity: parseInt(quantity) || 0,
        price: product.price,
      });
    }

    await cart.save();
    const populatedCart = await Cart.findById(cart._id).populate(
      "items.product"
    );
    res.status(201).json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update cart item quantity
export const updateCartItem = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }
    const { productId } = req.params;
    const { quantity } = req.body;

    // Find the product to check stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Check if requested quantity exceeds available stock
    if (quantity > product.stock) {
      return res.status(400).json({
        message: "Insufficient stock",
        availableStock: product.stock,
      });
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();
    const populatedCart = await Cart.findById(cart._id).populate(
      "items.product"
    );
    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Remove item from cart
export const removeFromCart = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    const populatedCart = await Cart.findById(cart._id).populate(
      "items.product"
    );
    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Clear cart
export const clearCart = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
