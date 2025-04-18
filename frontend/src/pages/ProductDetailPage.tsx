import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import ProductService from "@/services/product.service";
import CartService from "@/services/cart.service";
import { Minus, Plus, Heart } from "lucide-react";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";
import Alert from "../components/common/Alert";
import { message } from "@/lib/utils";

interface Product {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
}

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{
    message: string;
    availableStock?: number;
  } | null>(null);
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";

  // Get current quantity from cart
  const currentQuantity =
    cart?.items.find((item) => item.product._id === product?.id)?.quantity || 0;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await ProductService.getProductById(id!);
        setProduct({
          id: data.id,
          category: data.category,
          name: data.name,
          description: data.description,
          price: Number(data.price),
          imageUrl: data.imageUrl ?? "/no-image.png",
          stock: data.stock,
        });
        setError(null);
      } catch (err) {
        setError({ message: "Failed to fetch product" });
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = async () => {
    try {
      if (!product) return;
      setError(null);
      await CartService.addToCart(product.id, 1);
      const updatedCart = await CartService.getCart();
      setCart(updatedCart);
    } catch (error: any) {
      if (
        error.response?.status === 400 &&
        error.response?.data?.message === "Insufficient stock"
      ) {
        setError({
          message: "Insufficient stock",
          availableStock: error.response.data.availableStock,
        });
      } else {
        console.error("Error adding to cart:", error);
        message.error("Failed to add to cart");
      }
    }
  };

  const handleQuantityChange = async (type: "increase" | "decrease") => {
    try {
      if (!product) return;
      setError(null);

      const newQuantity =
        type === "increase" ? currentQuantity + 1 : currentQuantity - 1;

      if (type === "increase") {
        if (newQuantity > product.stock) {
          setError({
            message: "Insufficient stock",
            availableStock: product.stock,
          });
          return;
        }
        await CartService.updateCartItem(product.id, newQuantity);
      } else if (type === "decrease" && newQuantity >= 0) {
        if (newQuantity === 0) {
          await CartService.removeFromCart(product.id);
        } else {
          await CartService.updateCartItem(product.id, newQuantity);
        }
      }
      const updatedCart = await CartService.getCart();
      setCart(updatedCart);
      message.success("Successfully updated cart");
    } catch (error: any) {
      if (
        error.response?.status === 400 &&
        error.response?.data?.message === "Insufficient stock"
      ) {
        setError({
          message: "Insufficient stock",
          availableStock: error.response.data.availableStock,
        });
      } else {
        console.error("Error updating cart:", error);
        message.error("Failed to update cart");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  if (error && !error.availableStock) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        {error.message}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-64">
        Product not found
      </div>
    );
  }

  return (
    <>
      {error && (
        <Alert
          message={error.message}
          availableStock={error.availableStock}
          onClose={() => setError(null)}
        />
      )}
      <div className="container mx-auto px-4 md:px-[64px] pt-16 md:pt-10 pb-16 max-w-[1440px]">
        <div className="mb-4 md:mb-8">
          <h1 className="text-2xl font-semibold text-center md:text-left">
            Product Detail
          </h1>
        </div>
        <div className="bg-white px-5 md:px-10 py-6 md:py-9">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Section */}
            <div className="md:w-1/2">
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="md:w-1/2 md:py-5 md:px-10">
              <span className="text-sm text-[#6B7280]">{product.category}</span>
              <h1 className="text-xl md:text-2xl font-bold text-[#535353] pt-1 md:pt-2">
                {product.name}
              </h1>

              {/* Price info */}
              <div className="mt-1 md:mt-4 flex items-center">
                <p className="text-xl md:text-2xl font-bold text-[#111827]">
                  ${product.price.toFixed(2)}
                </p>
                {product.stock === 0 && (
                  <span className="text-[10px] text-red-600 bg-red-100 mx-3 p-2 rounded">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="mt-4">
                <p className="text-sm text-[#6B7280]">{product.description}</p>
              </div>

              {/* Add to cart */}
              <div className="mt-8 flex items-center justify-evenly gap-2">
                {currentQuantity > 0 ? (
                  <div className="w-[120px]">
                    <div className="flex items-center justify-between bg-[#4F46E5] h-9 rounded-sm px-2">
                      <button
                        onClick={() => handleQuantityChange("decrease")}
                        className="text-white hover:bg-[#4338CA] rounded-sm transition h-full flex items-center"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-center text-xs text-white">
                        {currentQuantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange("increase")}
                        className="text-white hover:bg-[#4338CA] rounded-sm transition h-full flex items-center"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className="w-[120px] h-9 text-xs text-white font-semibold bg-[#4F46E5] hover:bg-[#4338CA] rounded-sm transition flex items-center justify-center"
                    disabled={!product?.stock}
                  >
                    Add To Cart
                  </button>
                )}
                {isAdmin && (
                  <div className="w-[120px]">
                    <Link
                      to={`/products/edit/${product.id}`}
                      className="block w-full"
                    >
                      <button className="w-full h-9 text-sm text-gray-600 hover:text-gray-900 transition border border-gray-300 rounded flex items-center justify-center">
                        Edit
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
