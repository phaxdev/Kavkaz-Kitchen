import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import api from '../services/api';

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await api.get('/banners/');
        console.log('Banners response:', response.data); // Для отладки
        
        if (response.data && Array.isArray(response.data)) {
          // Фильтруем активные баннеры и добавляем fallback изображения
          const activeBanners = response.data
            .filter(banner => banner.is_active !== false)
            .map(banner => ({
              ...banner,
              image_url: banner.image || banner.image_url || getFallbackImage()
            }));
          
          setBanners(activeBanners.length > 0 ? activeBanners : [getDefaultBanner()]);
        } else {
          setBanners([getDefaultBanner()]);
        }
      } catch (error) {
        console.error('Error fetching banners:', error);
        setError(error.message);
        setBanners([getDefaultBanner()]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === banners.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [banners]);

  // Функция для получения fallback изображения
  const getFallbackImage = () => {
    const images = [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080',
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069'
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  // Функция для дефолтного баннера
  const getDefaultBanner = () => ({
    id: 1,
    title: "Свяжитесь с нами",
    subtitle: "Для оформления заказа.Телефон: +7 918-702-82-21",
    image_url: getFallbackImage(),
    is_active: true,
    order: 1
  });

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  if (isLoading) {
    return (
      <div className="relative h-[500px] bg-gradient-to-r from-yellow-50 to-yellow-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка баннеров...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative h-[500px] bg-gradient-to-r from-yellow-50 to-yellow-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white/80 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Кухня Кавказа</h2>
          <p className="text-xl text-gray-600 mb-4">Владикавказ</p>
          <p className="text-gray-700">Телефон: +7 918-702-82-21</p>
          <p className="text-sm text-gray-500 mt-2">Ошибка загрузки данных</p>
        </div>
      </div>
    );
  }

  // Проверяем, есть ли текущий баннер
  const currentBanner = banners[currentIndex] || banners[0] || getDefaultBanner();

  return (
    <div className="relative h-[500px] overflow-hidden">
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentBanner.id || currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          {/* Фоновое изображение */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${currentBanner.image_url || currentBanner.image || getFallbackImage()})`,
              filter: 'brightness(0.7)'
            }}
          />
          
          {/* Градиентный оверлей */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-transparent to-yellow-500/10" />
          
          {/* Контент баннера */}
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="max-w-2xl bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-2xl"
              >
                <h2 className="text-5xl font-bold text-gray-900 mb-4">
                  {currentBanner.title || "Кухня Кавказа"}
                </h2>
                <p className="text-xl text-gray-700 mb-8">
                  {currentBanner.subtitle || "Добро пожаловать!"}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                >
                  <a href="tel:+79187028221">Заказать сейчас</a>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Кнопки навигации - только если больше 1 баннера */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all"
          >
            <FaArrowLeft className="text-yellow-600 text-xl" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all"
          >
            <FaArrowRight className="text-yellow-600 text-xl" />
          </button>
        </>
      )}

      {/* Индикаторы - только если больше 1 баннера */}
      {banners.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((banner, index) => (
            <button
              key={banner.id || index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-yellow-500 scale-125' 
                  : 'bg-white/70 hover:bg-white'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Banner;