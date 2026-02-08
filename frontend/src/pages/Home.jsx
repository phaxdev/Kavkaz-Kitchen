import React from 'react';
import Banner from '../components/Banner';
import MenuSection from '../components/MenuSection';
import { motion } from 'framer-motion';
import { FaShippingFast, FaStar, FaHeart } from 'react-icons/fa';

const Home = () => {
  const features = [
    {
      icon: <FaStar className="text-4xl" />,
      title: "Авторские рецепты",
      description: "Секретные рецепты передаются из поколения в поколение"
    },
    {
      icon: <FaShippingFast className="text-4xl" />,
      title: "Быстрая доставка",
      description: "Доставляем по Владикавказу в течение часа"
    },
    {
      icon: <FaHeart className="text-4xl" />,
      title: "Только свежее",
      description: "Готовим из продуктов, купленных в день приготовления"
    }
  ];

  return (
    <div>
      <Banner />
      
      {/* Особенности */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-yellow-50 p-8 rounded-2xl text-center hover:shadow-xl transition-shadow"
              >
                <div className="text-yellow-500 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <MenuSection />

      {/* Призыв к действию */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-yellow-600">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Приезжайте к нам!
          </motion.h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Ждем вас в нашей уютной кухне во Владикавказе. 
            Вкус, который вы запомните навсегда!
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <a
              href="tel:+79187028221"
              className="bg-white text-yellow-600 text-xl font-bold px-8 py-4 rounded-full hover:shadow-2xl transition-all"
            >
              Позвонить для заказа
            </a>
            <a
              href="contacts"
              className="bg-transparent border-2 border-white text-white text-xl font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-all"
            >
              Как добраться
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;