import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DishCard from '../components/DishCard';
import api from '../services/api';

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, dishesRes] = await Promise.all([
          api.get('/categories/'),
          api.get('/dishes/')
        ]);
        
        // Обрабатываем данные (учитываем пагинацию)
        const categoriesData = categoriesRes.data.results || 
                               categoriesRes.data || 
                               [];
        
        const dishesData = dishesRes.data.results || 
                           dishesRes.data || 
                           [];
        
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        setDishes(Array.isArray(dishesData) ? dishesData : []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setCategories([]);
        setDishes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredDishes = selectedCategory === 'all'
    ? dishes
    : dishes.filter(dish => dish.category === parseInt(selectedCategory));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-yellow-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-yellow-50">
      {/* Герой секция */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/30 to-yellow-600/30" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070')] bg-cover bg-center" />
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              Наше Меню
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/90 max-w-2xl mx-auto"
            >
              Каждое блюдо — это история, приготовленная с душой
            </motion.p>
          </div>
        </div>
      </div>

      {/* Фильтры категорий */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-3 rounded-full font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-yellow-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-yellow-50 shadow-md'
            }`}
          >
            Все блюда
          </button>
          
          {Array.isArray(categories) && categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-bold transition-all ${
                selectedCategory === category.id.toString()
                  ? 'bg-yellow-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-yellow-50 shadow-md'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Список блюд */}
        {Array.isArray(filteredDishes) && filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDishes.map((dish, index) => (
              <DishCard key={dish.id || index} dish={dish} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">
              Блюда в этой категории пока не добавлены
            </h3>
            <p className="text-gray-600">
              Свяжитесь с нами, чтобы узнать о доступных блюдах
            </p>
            <a 
              href="tel:+79187028221"
              className="inline-block mt-6 bg-yellow-500 text-white px-8 py-3 rounded-full font-bold hover:bg-yellow-600 transition-colors"
            >
              Позвонить: +7 918-702-82-21
            </a>
          </div>
        )}

        {/* CTA секция */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-3xl p-8 text-center shadow-2xl"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Не нашли что искали?
          </h3>
          <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
            Позвоните нам — мы приготовим специально для вас!
          </p>
          <a
            href="tel:+79187028221"
            className="inline-flex items-center gap-3 bg-white text-yellow-600 font-bold text-xl px-8 py-4 rounded-full hover:shadow-2xl transition-all"
          >
            <span>Заказать по телефону</span>
            <span className="animate-pulse">📞</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Menu;