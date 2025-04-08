import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import CartService from "@/services/cart.service";
import { AuthContext } from "./AuthContext";

// Define CartItem type
interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
  quantity: number;
  price: number;
}

// Define a minimal cart type
interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
  discount: number;
  createdAt: string;
  updatedAt: string;
}

// Define context type
interface CartContextType {
  cart: Cart | null;
  setCart: (cart: Cart) => void;
}

// Create the context with default values
export const CartContext = createContext<CartContextType>({
  cart: null,
  setCart: () => {},
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    // Fetch cart data if user is authenticated
    const fetchCart = async () => {
      if (isAuthenticated) {
        try {
          console.log("Fetching cart data..."); // Log before fetching
          const userCart = await CartService.getCart();
          console.log("Cart data received:", userCart); // Log received data
          setCart(userCart);
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      }
    };

    fetchCart();
  }, [isAuthenticated]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
