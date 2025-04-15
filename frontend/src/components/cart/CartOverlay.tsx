import { X, Plus, Minus } from "lucide-react";
import { useState, useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { CartService } from "../../services/cart.service";

interface CartOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartOverlay = ({ isOpen, onClose }: CartOverlayProps) => {
  const [discountCode, setDiscountCode] = useState("20 DOLLAR OFF");
  const { cart, setCart } = useContext(CartContext);

  const handleIncreaseQuantity = async (
    productId: string,
    currentQuantity: number
  ) => {
    try {
      await CartService.updateCartItem(productId, currentQuantity + 1);
      const updatedCart = await CartService.getCart();
      setCart(updatedCart);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleDecreaseQuantity = async (
    productId: string,
    currentQuantity: number
  ) => {
    try {
      if (currentQuantity > 1) {
        await CartService.updateCartItem(productId, currentQuantity - 1);
      } else {
        await CartService.removeFromCart(productId);
      }
      const updatedCart = await CartService.getCart();
      setCart(updatedCart);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      await CartService.removeFromCart(productId);
      const updatedCart = await CartService.getCart();
      setCart(updatedCart);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className={`
          md:hidden fixed inset-0 bg-black transition-opacity duration-300
          ${isOpen ? "opacity-50 z-40" : "opacity-0 -z-10"}
        `}
        onClick={onClose}
      />

      {/* Cart Overlay */}
      <div
        className={`
          fixed z-50 bg-white transition-transform duration-300 ease-in-out
          md:w-[400px] md:top-0 md:h-auto md:rounded-bl-lg md:shadow-lg
          w-full top-[54px] bottom-0 right-0
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Cart ({cart?.totalItems || 0})</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-4 space-y-4">
          {cart?.items.map((item) => (
            <div className="flex gap-4" key={item.product._id}>
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.product.name}</h3>
                <div className="flex items-center mt-2 space-x-2">
                  <button
                    className="p-1 hover:bg-gray-100 rounded"
                    onClick={() =>
                      handleDecreaseQuantity(item.product._id, item.quantity)
                    }
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    className="p-1 hover:bg-gray-100 rounded"
                    onClick={() =>
                      handleIncreaseQuantity(item.product._id, item.quantity)
                    }
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${item.price.toFixed(2)}</p>
                <button className="text-sm text-gray-500 hover:text-gray-700 mt-2"
                  onClick={() => handleRemoveItem(item.product._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Discount Code */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Discount Code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="flex-1 px-3 py-2 border rounded text-sm"
            />
            <button className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700">
              Apply
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="p-4 border-t space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${cart?.totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${((cart?.totalPrice ?? 0) * 0.1).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span className="text-green-600">
              {discountCode === "20 DOLLAR OFF" ? `-$20.00` : `-$0.00`}
            </span>
          </div>
          <div className="flex justify-between font-semibold pt-2 border-t">
            <span>Estimated total</span>
            <span>${(cart?.totalPrice  ?? 0 ) .toFixed(2)}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="p-4 border-t">
          <button className="w-full bg-indigo-600 text-white py-3 rounded font-medium hover:bg-indigo-700">
            Continue to checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartOverlay;
