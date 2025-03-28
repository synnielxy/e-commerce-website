import { Link } from "react-router-dom";
import { Product } from "../../types/product.types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="h-48 overflow-hidden bg-gray-200">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
            No Image
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 truncate">{product.name}</h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-bold">
            ${product.price.toFixed(2)}
          </span>

          <Link
            to={`/products/${product.id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            View Details
          </Link>
        </div>

        <div className="mt-3 flex justify-between text-xs text-gray-500">
          <span>Category: {product.category}</span>
          <span>Stock: {product.stock}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
