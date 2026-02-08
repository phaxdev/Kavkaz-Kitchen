import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DishCard from './DishCard';
import api from '../services/api';

const MenuSection = () => {
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, dishesRes] = await Promise.all([
          api.get('/categories/'),
          api.get('/dishes/')
        ]);
        
        console.log('Categories response:', categoriesRes.data); // Для отладки
        console.log('Dishes response:', dishesRes.data); // Для отладки
        
        // Обрабатываем категории (может быть объект с results)
        const categoriesData = categoriesRes.data.results || 
                               categoriesRes.data || 
                               [];
        
        // Обрабатываем блюда
        const dishesData = dishesRes.data.results || 
                           dishesRes.data || 
                           [];
        
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        setDishes(Array.isArray(dishesData) ? dishesData : []);
        
        if (categoriesData.length > 0) {
          setSelectedCategory(categoriesData[0].id);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback данные
        setCategories([
          { id: 1, name: "Закуски", description: "Традиционные кавказские закуски" },
          { id: 2, name: "Основные блюда", description: "Горячие блюда" },
          { id: 3, name: "Десерты", description: "Сладкие угощения" }
        ]);
        setDishes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredDishes = selectedCategory
    ? dishes.filter(dish => dish.category === selectedCategory)
    : dishes;

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-b from-white to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Наше Меню
            </h2>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-yellow-50">
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Наше Меню
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Погрузитесь в мир настоящей кавказской кухни
          </p>
        </motion.div>

        {/* Категории - только если есть категории */}
        {categories && categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === null
                  ? 'bg-yellow-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-yellow-50'
              }`}
            >
              Все блюда
            </button>
            
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-yellow-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-yellow-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}

        {/* Блюда */}
        {filteredDishes.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredDishes.map((dish, index) => (
              <DishCard key={dish.id || index} dish={dish} index={index} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-xl mb-4">
              {dishes.length === 0 
                ? "Блюда еще не добавлены" 
                : "В этой категории пока нет блюд"}
            </p>
            <p className="text-gray-500">
              Свяжитесь с нами для уточнения меню
            </p>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-4">
              Хотите попробовать?
            </h3>
            <p className="text-white/90 text-lg mb-6">
              Звоните прямо сейчас и заказывайте доставку!
            </p>
            <a
              href="tel:+79187028221"
              className="inline-flex items-center gap-3 bg-white text-yellow-600 font-bold text-xl px-8 py-4 rounded-full hover:shadow-2xl transition-all"
            >
              <span>+7 918-702-82-21</span>
              <span className="animate-pulse">📞</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MenuSection;