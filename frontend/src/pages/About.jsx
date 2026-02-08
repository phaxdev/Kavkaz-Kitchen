import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaUsers, FaAward, FaLeaf } from 'react-icons/fa';

const About = () => {
  const values = [
    {
      icon: <FaHeart className="text-4xl" />,
      title: "С любовью к делу",
      description: "Каждое блюдо мы готовим с особым трепетом и заботой"
    },
    {
      icon: <FaUsers className="text-4xl" />,
      title: "Семейные традиции",
      description: "Рецепты передаются в нашей семье из поколения в поколение"
    },
    {
      icon: <FaAward className="text-4xl" />,
      title: "Высшее качество",
      description: "Используем только свежие продукты и лучшие ингредиенты"
    },
    {
      icon: <FaLeaf className="text-4xl" />,
      title: "Натуральность",
      description: "Никаких полуфабрикатов и искусственных добавок"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-yellow-50">
      {/* Герой секция */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/40 to-yellow-600/40" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070')] bg-cover bg-center" />
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              О нашей кухне
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/90 max-w-2xl"
            >
              Традиции, вкус и гостеприимство Кавказа в каждом блюде
            </motion.p>
          </div>
        </div>
      </div>

      {/* История */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Наша история
              </h2>
              <div className="space-y-4 text-gray-600 text-lg">
                <p>
                  "Кухня Кавказа" родилась из любви к традиционной кулинарии 
                  и желания делиться настоящим вкусом с каждым гостем.
                </p>
                <p>
                  Наш путь начался во Владикавказе, где семейные рецепты 
                  передавались из поколения в поколение. Сегодня мы продолжаем 
                  эти традиции, сохраняя аутентичность и добавляя современные 
                  нотки в каждое блюдо.
                </p>
                <p>
                  Мы верим, что еда — это не просто процесс утоления голода, 
                  а целое искусство, которое объединяет людей, создает 
                  теплую атмосферу и оставляет незабываемые впечатления.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200"
                  alt="Наша кухня"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-yellow-500 text-white p-6 rounded-2xl shadow-xl">
                <p className="text-2xl font-bold">С 2025 года</p>
                <p className="text-lg">Радуем гостей</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ценности */}
      <section className="py-16 bg-gradient-to-r from-yellow-50 to-yellow-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Наши ценности
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              То, что делает нас особенными
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="text-yellow-500 mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;