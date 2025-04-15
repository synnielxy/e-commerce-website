import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Search, ShoppingCart, User, Star } from "lucide-react";
import CartOverlay from "../cart/CartOverlay";
import { CartContext } from "../../contexts/CartContext";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = "" }) => {
  const { isAuthenticated, isAdmin, user, logout } = useContext(AuthContext);
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setCart(null);
    navigate("/login");
  };

  const toggleCart = async () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <header
        className={`w-full bg-[#111827] text-white py-2 px-4 md:px-[64px] md:py-[6px] md:h-[54px] ${className}`}
      >
        {/* Desktop Layout */}
        <div className="hidden md:flex md:items-center md:justify-between w-full h-full">
          <div className="flex items-center flex-1 min-w-0">
            {/* Logo */}
            <div className="flex space-x-2 shrink-0">
              <Link to="/products" className="flex space-x-2 shrink-0">
                <h1 className="text-2xl font-bold">Management</h1>
                <span className="text-[9px] pt-4">Chuwa</span>
              </Link>
            </div>

            {/* Search Bar - Desktop */}
            <div className="flex-1 ml-4 lg:ml-14 min-w-0 max-w-[500px]">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full p-2.5 pl-4 pr-8 rounded text-black text-sm h-10"
                />
                <Search className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Right Element - Desktop */}
          <div className="flex items-center space-x-4 lg:space-x-6 shrink-0 ml-4">
            <div className="flex items-center space-x-3 cursor-pointer transition relative">
              <div className="relative">
                <User className="w-6 h-6" />
                {isAdmin && (
                  <Star className="w-3 h-3 text-yellow-400 absolute -bottom-1 -right-1 fill-yellow-400" />
                )}
              </div>
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <span className="hidden lg:inline text-sm">
                    {user?.username}
                  </span>
                  <span
                    className="hidden lg:inline text-sm cursor-pointer hover:text-gray-300"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </span>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden lg:inline text-sm hover:text-gray-300"
                >
                  Sign In
                </Link>
              )}
            </div>

            {isAuthenticated && (
              <div
                className="relative flex items-center cursor-pointer hover:text-gray-300 transition"
                onClick={toggleCart}
              >
                <div className="relative">
                  <ShoppingCart className="w-6 h-6" />
                  <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] rounded-full h-3.5 w-3.5 flex items-center justify-center">
                    {cart?.totalItems}
                  </span>
                </div>
                <span className="ml-3 text-sm">
                  ${cart?.totalPrice?.toFixed(2) || "0.00"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex flex-col md:hidden space-y-2 py-1">
          {/* Logo and Icons Row */}
          <div className="flex items-center justify-between">
            {/* Logo for Mobile */}
            <div className="flex items-center">
              <span className="text-xl font-bold">M</span>
              <span className="text-[8px] ml-0.5 pt-2">Chuwa</span>
            </div>

            {/* Right Icons for Mobile */}
            <div className="flex items-center space-x-7">
              <div className="relative">
                <User className="w-5 h-5" />
                {isAdmin && (
                  <Star className="w-2.5 h-2.5 text-yellow-400 absolute -bottom-1 -right-1 fill-yellow-400" />
                )}
              </div>
              {isAuthenticated && (
                <div
                  className="flex items-center space-x-2"
                  onClick={toggleCart}
                >
                  <div className="relative">
                    <ShoppingCart className="w-5 h-5" />
                    <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] rounded-full h-3.5 w-3.5 flex items-center justify-center">
                      2
                    </span>
                  </div>
                  <span className="text-xs">$0.00</span>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar - Mobile (Full Width) */}
          <div className="w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-2 rounded bg-white text-black text-sm h-9"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>
      </header>

      {/* Cart Overlay */}
      <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
