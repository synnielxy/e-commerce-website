import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';

const ProductsPage = () => {
  const [sortOption, setSortOption] = useState('last-added');

  // 静态产品数据
  const products = [
    {
      id: 1,
      name: "Apple iPhone 11, 128G",
      price: 499.00,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      name: "Apple Watch Series 7",
      price: 499.00,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      name: "AirPods Pro",
      price: 499.00,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60"
    },
    // ... 更多产品
  ];

  return (
    <div className="container mx-auto px-4 md:px-[64px] py-8 max-w-[1440px]">
      {/* 标题和操作栏 */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none bg-white border rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="last-added">Last added</option>
              <option value="price-low-high">Price: low to high</option>
              <option value="price-high-low">Price: high to low</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <Link
            to="/products/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add Product
          </Link>
        </div>
      </div>

      {/* 产品网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg border">
            <Link to={`/products/${product.id}`} className="block">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm text-gray-900">{product.name}</h3>
                <p className="text-sm font-medium text-gray-900 mt-1">${product.price.toFixed(2)}</p>
              </div>
            </Link>
            <div className="px-3 pb-3 flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <button className="p-1 hover:bg-gray-100 rounded transition">
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-xs w-4 text-center">2</span>
                <button className="p-1 hover:bg-gray-100 rounded transition">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <div className="flex space-x-2">
                <button className="text-xs text-blue-600 hover:text-blue-700 transition">
                  Add
                </button>
                <button className="text-xs text-gray-600 hover:text-gray-700 transition">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 分页 */}
      <div className="mt-8 flex justify-center items-center space-x-4">
        <button className="p-2 rounded-md hover:bg-gray-100 transition">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex space-x-1">
          <button className="px-3 py-1 rounded-md bg-blue-600 text-white">1</button>
          <button className="px-3 py-1 rounded-md hover:bg-gray-100">2</button>
          <button className="px-3 py-1 rounded-md hover:bg-gray-100">3</button>
          <button className="px-3 py-1 rounded-md hover:bg-gray-100">4</button>
          <button className="px-3 py-1 rounded-md hover:bg-gray-100">5</button>
        </div>
        <button className="p-2 rounded-md hover:bg-gray-100 transition">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ProductsPage; 