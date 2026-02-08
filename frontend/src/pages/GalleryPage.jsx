import React from 'react';
import Gallery from '../components/Gallery';
import { motion } from 'framer-motion';

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-yellow-50">
      {/* Герой секция */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/30 to-yellow-600/30" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070')] bg-cover bg-center" />
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              Наша Галерея
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/90 max-w-2xl mx-auto"
            >
              Вкус, который можно увидеть
            </motion.p>
          </div>
        </div>
      </div>

      {/* Компонент галереи */}
      <Gallery />

      {/* CTA секция */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-3xl p-8 md:p-12 text-center shadow-2xl"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Хотите увидеть больше?
            </h3>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Приезжайте к нам в гости и убедитесь во всем сами!
              Атмосфера, ароматы и неповторимый вкус ждут вас.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a
                href="tel:+79187028221"
                className="bg-white text-yellow-600 text-xl font-bold px-8 py-4 rounded-full hover:shadow-2xl transition-all"
              >
                Забронировать столик
              </a>
              <a
                href="/contacts"
                className="bg-transparent border-2 border-white text-white text-xl font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-all"
              >
                Как добраться
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;