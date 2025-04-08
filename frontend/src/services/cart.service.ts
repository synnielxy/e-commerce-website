import api from "./api";

export interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
  quantity: number;
  price: number;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
  discount: number;
  createdAt: string;
  updatedAt: string;
}

export const CartService = {
  async getCart(): Promise<Cart> {
    try {
      const response = await api.get("/cart");
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error("Session expired. Please login again.");
      } else {
        throw new Error("Failed to fetch cart. Please try again.");
      }
    }
  },

  async addToCart(productId: string, quantity: number): Promise<Cart> {
    const response = await api.post("/cart/items", { productId, quantity });
    return response.data;
  },

  async updateCartItem(productId: string, quantity: number): Promise<Cart> {
    const response = await api.put(`/cart/items/${productId}`, { quantity });
    return response.data;
  },

  async removeFromCart(productId: string): Promise<Cart> {
    const response = await api.delete(`/cart/items/${productId}`);
    return response.data;
  },

  async clearCart(): Promise<Cart> {
    const response = await api.delete("/cart");
    return response.data;
  },
};

export default CartService;
