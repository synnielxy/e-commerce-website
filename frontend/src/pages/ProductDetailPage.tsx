import { useState } from 'react';
import { Minus, Plus, Heart } from 'lucide-react';

const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(1);
  
  // 静态产品数据
  const product = {
    id: 1,
    name: "Classic Comfort Desk Chair",
    price: 199.99,
    originalPrice: 249.99,
    description: "Experience ultimate comfort with our ergonomic desk chair. Perfect for long working hours, featuring adjustable height, lumbar support, and premium cushioning.",
    rating: 4.5,
    reviews: 128,
    stock: 10,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60",
    ],
    features: [
      "Ergonomic Design",
      "Adjustable Height",
      "360° Swivel",
      "Breathable Mesh Back",
      "Premium Cushioning"
    ]
  };

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase' && quantity < product.stock) {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-[64px] py-8 max-w-[1440px]">
      <div className="flex flex-col md:flex-row gap-8">
        {/* 左侧图片区域 */}
        <div className="md:w-1/2">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {product.images.map((image, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-75 transition"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 右侧产品信息区域 */}
        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          
          {/* 价格信息 */}
          <div className="mt-4 flex items-center">
            <p className="text-2xl font-semibold text-gray-900">${product.price}</p>
            <p className="ml-3 text-lg text-gray-500 line-through">${product.originalPrice}</p>
            <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800">
              Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          </div>

          {/* 评分和评论 */}
          <div className="mt-4">
            <div className="flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-5 h-5 ${
                      index < Math.floor(product.rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="ml-2 text-sm text-gray-500">
                {product.rating} ({product.reviews} reviews)
              </p>
            </div>
          </div>

          {/* 描述 */}
          <div className="mt-4">
            <p className="text-base text-gray-700">{product.description}</p>
          </div>

          {/* 特点列表 */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Features</h3>
            <ul className="mt-2 space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-2 text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 数量选择器和添加到购物车 */}
          <div className="mt-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => handleQuantityChange('decrease')}
                  className="p-2 hover:bg-gray-100 transition"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 text-center min-w-[40px]">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange('increase')}
                  className="p-2 hover:bg-gray-100 transition"
                  disabled={quantity >= product.stock}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button className="flex-1 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition">
                Add to Cart
              </button>
              <button className="p-2 border rounded-md hover:bg-gray-100 transition">
                <Heart className="w-6 h-6" />
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {product.stock} items left in stock
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage; 