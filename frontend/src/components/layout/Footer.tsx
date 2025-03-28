const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Product Management System</h3>
            <p className="text-gray-400 mt-2">
              Manage your products efficiently and effectively
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <p>&copy; {currentYear} All rights reserved</p>
            <div className="mt-2 flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
