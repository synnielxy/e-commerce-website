import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import ProductService from "@/services/product.service";
import { CartContext } from "../contexts/CartContext";
import ProductQuantity from "@/components/products/ProductQuantity";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const ProductsPage = () => {
  const [sortOption, setSortOption] = useState('last-added');
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await ProductService.getProducts({
          sort: sortOption,
          page: currentPage
        });

        setProducts(
          data.products.map((p) => ({
            id: p.id,
            name: p.name,
            price: Number(p.price),
            imageUrl: p.imageUrl ?? "/no-image.png",
          }))
        );
        setPages(data.pagination.pages);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, sortOption]); // Remove cart dependency since we don't need it anymore

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-64 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 md:px-[64px] pt-16 md:pt-10 pb-16 max-w-[1440px]">
      {/* Title and Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-8">
        <h1 className="text-[24px] md:text-[30px] font-semibold text-center md:text-left">Products</h1>
        
        {/* Desktop Filter and Add */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative w-[200px]">
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="w-full appearance-none bg-white border border-gray-200 rounded px-4 h-[42px] text-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
            >
              <option value="last-added">Last added</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <Link
            to="/products/create"
            className="bg-[#4F46E5] text-white font-medium text-sm px-6 h-[42px] rounded hover:bg-[#4338CA] transition flex items-center justify-center"
          >
            Add Product
          </Link>
        </div>
      </div>
      
      {/* Mobile Filter and Add */}
      <div className="flex justify-center gap-3 md:hidden mb-4">
        <div className="w-[160px]">
          <div className="relative w-full">
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="w-full appearance-none bg-white border border-gray-200 shadow-sm rounded px-3 h-[36px] text-gray-600 text-sm focus:outline-none"
            >
              <option value="last-added">Last added</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-[120px]">
          <Link
            to="/products/create"
            className="w-full bg-[#4F46E5] text-white font-medium text-sm h-[36px] rounded hover:bg-[#4338CA] transition flex items-center justify-center shadow-sm"
          >
            Add Product
          </Link>
        </div>
      </div>

      {/* Products Grid */}
      <div className="bg-white rounded-sm px-4 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded border p-4 md:p-2">
              <Link to={`/products/${product.id}`} className="block">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.imageUrl || '/no-image.svg'}
                    alt={product.name || "No image"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pt-1 md:pt-2 pb-2">
                  <h3 className="text-sm text-gray-500 font-light min-h-[20px] md:min-h-[40px] line-clamp-1 md:line-clamp-2">{product.name}</h3>
                  <p className="text-base font-medium text-gray-900">${product.price.toFixed(2)}</p>
                </div>
              </Link>
              <div className="flex items-center justify-between gap-6 md:gap-1 w-full">
                <div className="flex-1">
                  <ProductQuantity productId={product.id} />
                </div>
                <div className="flex-1">
                  <Link 
                    to={`/products/edit/${product.id}`} 
                    className="block w-full"
                  >
                    <button className="w-full h-6 text-[10px] text-gray-600 hover:text-gray-900 transition border border-gray-300 rounded-sm flex items-center justify-center">
                      Edit
                    </button>
                  </Link>
                </div>
              </div> 
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-end items-center font-light">
        <button className="w-9 h-9 flex items-center justify-center border hover:bg-gray-100 transition rounded-l">
          <ChevronsLeft className="w-3 h-3" />
        </button>

        <div>
          {Array.from({ length: pages }, (_, i) => i + 1).map((page, index) => {
            if (page === currentPage) {
              return (
                <button key={index} className="-ml-px w-9 h-9 border bg-[#4F46E5] text-white">
                  {page}
                </button>
              )
            } else {
              return (
                <button key={index}  onClick={() => setCurrentPage(page)} className="-ml-px w-9 h-9 border hover:bg-gray-100 text-[#4F46E5]">
                  {page}
                </button>
              )
            }
          })}
        </div>

        <button className="-ml-px w-9 h-9 flex items-center justify-center border hover:bg-gray-100 transition rounded-r">
          <ChevronsRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default ProductsPage; 