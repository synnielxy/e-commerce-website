import { useContext } from 'react';
import { Minus, Plus } from 'lucide-react';
import { CartContext } from "@/contexts/CartContext";
import CartService from "@/services/cart.service";

interface ProductQuantityProps {
  productId: string;
  variant?: 'default' | 'detail';
}

const ProductQuantity = ({ productId, variant = 'default' }: ProductQuantityProps) => {
  const { cart, setCart } = useContext(CartContext);
  
  const cartItem = cart?.items.find(item => item.product._id === productId);
  const quantity = cartItem?.quantity || 0;
  const inCart = !!cartItem;

  const handleAddToCart = async () => {
    try {
      const updatedCart = await CartService.addToCart(productId, 1);
      setCart(updatedCart);
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  const handleUpdateQuantity = async (change: number) => {
    try {
      const newQuantity = Math.max(0, quantity + change);
      
      if (newQuantity === 0) {
        const updatedCart = await CartService.removeFromCart(productId);
        setCart(updatedCart);
      } else {
        const updatedCart = await CartService.updateCartItem(productId, newQuantity);
        setCart(updatedCart);
      }
    } catch (err) {
      console.error('Error updating cart:', err);
    }
  };

  const styles = {
    default: {
      container: "h-6",
      quantityText: "text-[10px]",
      button: "h-6 text-[10px]",
      buttonText: "Add"
    },
    detail: {
      container: "h-full",
      quantityText: "text-xs",
      button: "h-full text-xs font-semibold",
      buttonText: "Add To Cart"
    }
  }[variant];

  if (inCart) {
    return (
      <div className={`flex items-center justify-between bg-[#4F46E5] rounded-sm px-2 ${styles.container}`}>
        <button 
          onClick={() => handleUpdateQuantity(-1)}
          className="text-white hover:bg-[#4338CA] rounded-sm transition h-full flex items-center"
        >
          <Minus className="w-3 h-3" />
        </button>
        <span className={`text-center text-white ${styles.quantityText}`}>{quantity}</span>
        <button 
          onClick={() => handleUpdateQuantity(1)}
          className="text-white hover:bg-[#4338CA] rounded-sm transition h-full flex items-center"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={handleAddToCart}
      className={`w-full text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-sm transition flex items-center justify-center ${styles.button}`}
    >
      {styles.buttonText}
    </button>
  );
};

export default ProductQuantity; 