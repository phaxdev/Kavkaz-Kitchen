import React from 'react';
import { motion } from 'framer-motion';

const DishCard = ({ dish, index }) => {
  // Защита от undefined
  if (!dish) {
    return null;
  }

  const getFallbackImage = () => {
    const images = [
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069',
      'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069',
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=2068'
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  const imageUrl = dish.image || dish.image_url || getFallbackImage();
  const name = dish.name || "Блюдо";
  const price = dish.price || "0";
  const description = dish.description || "Вкусное кавказское блюдо";
  const weight = dish.weight || "";
  const isPopular = dish.is_popular || false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index || 0) * 0.1 }}
      whileHover={{ y: -10 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden group"
    >
      {/* Изображение */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = getFallbackImage();
          }}
        />
        {isPopular && (
          <div className="absolute top-4 right-4">
            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              Популярное
            </span>
          </div>
        )}
      </div>

      {/* Контент */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900">{name}</h3>
          <span className="text-2xl font-bold text-yellow-600">
            {price} ₽
          </span>
        </div>
        
        <p className="text-gray-600 mb-4">{description}</p>
        
        {weight && (
          <p className="text-sm text-gray-500 mb-4">Вес: {weight}</p>
        )}
        
        <div className="flex justify-between items-center">
          <button className="text-yellow-600 font-medium hover:text-yellow-700 transition-colors">
            Подробнее
          </button>
          <a 
            href="tel:+79187028221"
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all"
          >
            Заказать
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default DishCard;