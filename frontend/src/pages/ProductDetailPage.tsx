import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductService from '@/services/product.service';
import { Minus, Plus, Heart } from 'lucide-react';

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
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await ProductService.getProductById(id!);
        console.log(data);
        setProduct({
          id: data.id,
          category: data.category,
          name: data.name,
          description: data.description,
          price: Number(data.price),
          imageUrl: data.imageUrl ?? "/no-image.png",
          stock: data.stock
        });
        setError(null);
      } catch (err) {
        setError('Failed to fetch product');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-64 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="flex justify-center items-center h-64">Product not found</div>;
  }

  const handleAddToCart = () => {
    setInCart(true);
    setQuantity(1);
  };

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase' && quantity < (product?.stock || 0)) {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 0) {
      setQuantity(prev => {
        const newQuantity = prev - 1;
        if (newQuantity === 0) {
          setInCart(false);
        }
        return newQuantity;
      });
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-[64px] py-10 max-w-[1440px]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Product Detail</h1>
      </div>
      <div className="bg-white px-4 py-5">

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
          <div className="md:w-1/2">
            <span className="text-sm text-gray-500">{product.category}</span>
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            
            {/* 价格信息 */}
            <div className="mt-4 flex items-center">
              <p className="text-2xl font-semibold text-gray-900">${product.price.toFixed(2)}</p>
              {product.stock === 0 && (
                <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">
                  Out of Stock
                </span>
              )}
            </div>

            {/* 描述 */}
            <div className="mt-4">
              <p className="text-base text-gray-700">{product.description}</p>
            </div>

            {/* 数量选择器和添加到购物车 */}
            <div className="mt-8 flex items-center space-x-4">
              {inCart ? (
                <div className="flex-1">
                  <div className="flex items-center justify-between bg-[#4F46E5] h-6 rounded-sm px-2">
                    <button 
                      onClick={() => handleQuantityChange('decrease')}
                      className="text-white hover:bg-[#4338CA] rounded-sm transition h-full flex items-center"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-center text-[10px] text-white">{quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange('increase')}
                      className="text-white hover:bg-[#4338CA] rounded-sm transition h-full flex items-center"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 h-6 text-[10px] text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-sm transition flex items-center justify-center"
                  disabled={!product?.stock}
                >
                  Add To Cart
                </button>
              )}
              <Link 
                to={`/products/edit/${product?.id}`} 
                className="flex-1"
              >
                <button className="w-full h-6 text-[10px] text-gray-600 hover:text-gray-900 transition border border-gray-300 rounded-sm flex items-center justify-center">
                  Edit
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage; 