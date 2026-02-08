import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaPhoneAlt } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Главная' },
    { path: '/menu', label: 'Меню' },
    { path: '/gallery', label: 'Галерея' },
    { path: '/about', label: 'О нас' },
    { path: '/contacts', label: 'Контакты' },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-lg sticky top-0 z-50"
      style={{ fontFamily: "'MakanHati', sans-serif" }}
    >
      <div className="container mx-auto px-4 py-6"> {/* Увеличили padding-y с py-4 до py-6 */}
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-4 group"> {/* Увеличили space-x с space-x-3 до space-x-4 */}
            <div className="w-12 h-12 relative group-hover:scale-105 transition-transform"> {/* Увеличили логотип */}
              <img 
                src="/logo1.png" 
                alt="Кухня Кавказа"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              {/* Увеличено с text-2xl до text-4xl */}
              <h1 className="text-4xl font-bold text-gray-800">Кухня Кавказа</h1>
              {/* Увеличено с text-sm до text-lg */}
              <p className="text-lg text-gray-600">Владикавказ</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-10"> {/* Увеличили space-x */}
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-xl font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'text-yellow-500 border-b-2 border-yellow-500'
                    : 'text-gray-700 hover:text-yellow-500'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            <FaPhoneAlt className="text-yellow-500 text-2xl" /> {/* Увеличили иконку */}
            <a 
              href="tel:+79187028221" 
              className="text-2xl font-bold text-gray-800 hover:text-yellow-500 transition-colors" /* Увеличили текст */
            >
              +7 918-702-82-21
            </a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-4xl text-gray-800" /* Увеличили кнопку меню */
          >
            <GiHamburgerMenu />
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden mt-6" /* Увеличили margin-top */
          >
            <div className="flex flex-col space-y-6 pb-6"> {/* Увеличили spacing */}
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-2xl font-medium ${
                    location.pathname === item.path
                      ? 'text-yellow-500'
                      : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <a 
                href="tel:+79187028221"
                className="flex items-center space-x-3 text-2xl font-bold text-gray-800"
              >
                <FaPhoneAlt className="text-yellow-500 text-2xl" />
                <span>+7 918-702-82-21</span>
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;