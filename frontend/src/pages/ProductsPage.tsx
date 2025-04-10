import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  inCart: boolean;
  quantity: number;
}

const ProductsPage = () => {
  const [sortOption, setSortOption] = useState('last-added');
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Apple iPhone 11, 128G",
      price: 499.00,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60",
      inCart: false,
      quantity: 0
    },
    {
      id: 2,
      name: "Apple Watch Series 7",
      price: 399.00,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=60",
      inCart: false,
      quantity: 0
    },
    {
      id: 3,
      name: "AirPods Pro",
      price: 249.00,
      image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=60",
      inCart: false,
      quantity: 0
    },
    {
      id: 4,
      name: "MacBook Air M1",
      price: 999.00,
      image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=60",
      inCart: false,
      quantity: 0
    },
    {
      id: 5,
      name: "iPad Pro 12.9",
      price: 799.00,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=60",
      inCart: false,
      quantity: 0
    },
    {
      id: 6,
      name: "iMac 24-inch",
      price: 1299.00,
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=60",
      inCart: false,
      quantity: 0
    },
    {
      id: 7,
      name: "AirPods Max",
      price: 549.00,
      image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=800&auto=format&fit=crop&q=60",
      inCart: false,
      quantity: 0
    },
    {
      id: 8,
      name: "Mac Pro",
      price: 5999.00,
      image: "https://images.unsplash.com/photo-1624314138470-5a2f24623f10?w=800&auto=format&fit=crop&q=60",
      inCart: false,
      quantity: 0
    }
  ]);

  const handleAddToCart = (productId: number) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, inCart: true, quantity: 1 }
        : product
    ));
  };

  const handleUpdateQuantity = (productId: number, change: number) => {
    setProducts(products.map(product => {
      if (product.id === productId) {
        const newQuantity = Math.max(0, product.quantity + change);
        return {
          ...product,
          quantity: newQuantity,
          inCart: newQuantity > 0
        };
      }
      return product;
    }));
  };

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
      <div className="bg-white rounded-sm px-4 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded border p-2">
              <Link to={`/products/${product.id}`} className="block">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="">
                  <h3 className="text-sm text-gray-900">{product.name}</h3>
                  <p className="text-sm font-medium text-gray-900 mt-1">${product.price.toFixed(2)}</p>
                </div>
              </Link>
              <div className="flex items-center justify-between">
                <div className="flex space-x-1 w-full">
                  {product.inCart ? (
                    <div className="flex-1 flex items-center bg-[#4F46E5] rounded">
                      <button 
                        onClick={() => handleUpdateQuantity(product.id, -1)}
                        className="px-3 py-0.5 text-xs text-white hover:bg-[#4338CA] rounded-l transition"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="flex-1 text-center text-xs text-white">{product.quantity}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(product.id, 1)}
                        className="px-3 py-0.5 text-xs text-white hover:bg-[#4338CA] rounded-r transition"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleAddToCart(product.id)}
                      className="flex-1 text-xs text-white bg-[#4F46E5] hover:bg-[#4338CA] py-0.5 rounded transition"
                    >
                      Add
                    </button>
                    )}
                {/* weize-sun changed: change the button to link*/}
                <Link 
                  to={`/products/edit/${product.id}`} 
                  className="text-xs text-gray-600 hover:text-gray-700 transition"
                >
                  Edit
                </Link>
                </div> 
              </div>
            </div>
          ))}
        </div>
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