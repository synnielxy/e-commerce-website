import { useContext } from 'react';
import { Minus, Plus } from 'lucide-react';
import { CartContext } from "@/contexts/CartContext";
import CartService from "@/services/cart.service";

interface ProductQuantityProps {
  productId: string;
}

const ProductQuantity = ({ productId }: ProductQuantityProps) => {
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

  if (inCart) {
    return (
      <div className="flex-1">
        <div className="flex items-center justify-between bg-[#4F46E5] h-6 rounded-sm px-2">
          <button 
            onClick={() => handleUpdateQuantity(-1)}
            className="text-white hover:bg-[#4338CA] rounded-sm transition h-full flex items-center"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-center text-[10px] text-white">{quantity}</span>
          <button 
            onClick={() => handleUpdateQuantity(1)}
            className="text-white hover:bg-[#4338CA] rounded-sm transition h-full flex items-center"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <button 
        onClick={handleAddToCart}
        className="w-full h-6 text-[10px] text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-sm transition flex items-center justify-center"
      >
        Add
      </button>
    </div>
  );
};

export default ProductQuantity; 