import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaMapMarkerAlt, FaClock, FaInstagram, FaWhatsapp, FaTelegram } from 'react-icons/fa';
import { GiChickenOven } from 'react-icons/gi';
import api from '../services/api';

const Footer = () => {
  const [contactInfo, setContactInfo] = useState({
    phone: '+7 918-702-82-21',
    address: 'Владикавказ, ул. Кухонная, 1',
    email: 'info@kuhnya-kavkaza.ru',
    working_hours: 'Ежедневно с 9:00 до 21:00',
    instagram: 'https://instagram.com/kuhnya_kavkaza',
    whatsapp: '+79187028221',
    telegram: '@kuhnya_kavkaza'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await api.get('/contact/');
        console.log('Contact response:', response.data); // Для отладки
        
        // Проверяем разные форматы ответа
        let contactData = response.data;
        
        if (contactData && contactData.results && Array.isArray(contactData.results)) {
          // Если ответ с пагинацией
          contactData = contactData.results[0];
        } else if (Array.isArray(contactData)) {
          // Если ответ - массив
          contactData = contactData[0];
        }
        
        if (contactData && typeof contactData === 'object') {
          setContactInfo(prev => ({
            ...prev,
            ...contactData
          }));
        }
      } catch (error) {
        console.log('Using default contact info');
        // Используем дефолтные данные
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  if (isLoading) {
    return (
      <footer className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Лого и описание */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <GiChickenOven className="text-4xl" />
              <div>
                <h3 className="text-2xl font-bold">Кухня Кавказа</h3>
                <p className="text-yellow-100">Владикавказ</p>
              </div>
            </div>
            <p className="text-yellow-100 mb-4">
              Настоящая кавказская кухня с любовью и традициями. 
              Готовим так, как готовили наши бабушки.
            </p>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="text-xl font-bold mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <FaPhone className="text-yellow-300" />
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="hover:text-yellow-300 transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-yellow-300" />
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaClock className="text-yellow-300" />
                <span>{contactInfo.working_hours}</span>
              </li>
              {contactInfo.email && (
                <li className="flex items-center space-x-3">
                  <FaPhone className="text-yellow-300" />
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="hover:text-yellow-300 transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Соцсети */}
          <div>
            <h4 className="text-xl font-bold mb-4">Мы в соцсетях</h4>
            <div className="flex space-x-4">
              {contactInfo.instagram && (
                <motion.a
                  whileHover={{ scale: 1.1, y: -5 }}
                  href={contactInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-yellow-600 p-3 rounded-full hover:bg-yellow-100 transition-colors"
                >
                  <FaInstagram className="text-2xl" />
                </motion.a>
              )}
              {contactInfo.whatsapp && (
                <motion.a
                  whileHover={{ scale: 1.1, y: -5 }}
                  href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-yellow-600 p-3 rounded-full hover:bg-yellow-100 transition-colors"
                >
                  <FaWhatsapp className="text-2xl" />
                </motion.a>
              )}
              {contactInfo.telegram && (
                <motion.a
                  whileHover={{ scale: 1.1, y: -5 }}
                  href={`https://t.me/${contactInfo.telegram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-yellow-600 p-3 rounded-full hover:bg-yellow-100 transition-colors"
                >
                  <FaTelegram className="text-2xl" />
                </motion.a>
              )}
            </div>
            <div className="mt-6">
              <a
                href="tel:+79187028221"
                className="inline-flex items-center gap-2 bg-white text-yellow-600 font-bold px-6 py-3 rounded-full hover:shadow-xl transition-all"
              >
                <span>Заказать по телефону</span>
                <span className="animate-pulse">📞</span>
              </a>
            </div>
          </div>
        </div>

        {/* Копирайт */}
        <div className="border-t border-yellow-500 mt-8 pt-8 text-center">
          <p className="text-yellow-100">
            © {new Date().getFullYear()} Кухня Кавказа. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;