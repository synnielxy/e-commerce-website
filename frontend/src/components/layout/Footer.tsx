import React from 'react';
import { Youtube, Twitter, Facebook } from 'lucide-react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={`w-full bg-[#111827] text-white py-4 md:h-[64px] md:py-0 flex items-center ${className}`}>
      <div className="container mx-auto px-4 md:px-[64px] max-w-[1440px]">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
          {/* Social Media Icons - First on mobile */}
          <div className="flex space-x-4 md:space-x-6 order-1 md:order-2">
            <a href="#" className="hover:text-gray-300 transition">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
          
          {/* Links - Second on mobile */}
          <div className="flex space-x-5 order-2 md:order-3">
            <a href="#" className="text-xs hover:text-gray-300 transition">
              Contact us
            </a>
            <a href="#" className="text-xs hover:text-gray-300 transition">
              Privacy Policies
            </a>
            <a href="#" className="text-xs hover:text-gray-300 transition">
              Help
            </a>
          </div>

          {/* Copyright - Last on mobile */}
          <div className="order-3 md:order-1">
            <p className="text-xs">©2025 All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
