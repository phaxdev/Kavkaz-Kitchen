import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPhone, 
  FaMapMarkerAlt, 
  FaClock, 
  FaInstagram, 
  FaWhatsapp, 
  FaTelegram,
  FaEnvelope,
  FaPaperPlane
} from 'react-icons/fa';
import api from '../services/api';

const Contacts = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await api.get('/contact/');
        setContactInfo(response.data);
      } catch (error) {
        console.error('Error fetching contact info:', error);
        setContactInfo({
          phone: '+7 918-702-82-21',
          address: 'Владикавказ, ул. Кухонная, 1',
          email: 'info@kuhnya-kavkaza.ru',
          working_hours: 'Ежедневно с 9:00 до 21:00',
          instagram: 'https://instagram.com/kuhnya_kavkaza',
          whatsapp: '+79187028221',
          telegram: '@kuhnya_kavkaza'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Имитация отправки формы
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitMessage('Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.');
      setFormData({ name: '', phone: '', email: '', message: '' });
      setIsSubmitting(false);
      
      // Очищаем сообщение через 5 секунд
      setTimeout(() => setSubmitMessage(''), 5000);
    }, 1500);
  };

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
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070')] bg-cover bg-center" />
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              Свяжитесь с нами
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/90 max-w-2xl mx-auto"
            >
              Мы всегда рады новым гостям и готовы ответить на все вопросы
            </motion.p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Контактная информация */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Наши контакты
            </h2>
            
            <div className="space-y-6">
              {/* Телефон */}
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <FaPhone className="text-yellow-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Телефон</h3>
                  <a 
                    href={`tel:${contactInfo.phone}`}
                    className="text-gray-600 hover:text-yellow-600 transition-colors text-lg"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              {/* Адрес */}
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <FaMapMarkerAlt className="text-yellow-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Адрес</h3>
                  <p className="text-gray-600">{contactInfo.address}</p>
                </div>
              </div>

              {/* Часы работы */}
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <FaClock className="text-yellow-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Часы работы</h3>
                  <p className="text-gray-600">{contactInfo.working_hours}</p>
                </div>
              </div>

              {/* Email */}
              {contactInfo.email && (
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <FaEnvelope className="text-yellow-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Email</h3>
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      className="text-gray-600 hover:text-yellow-600 transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
              )}

              {/* Соцсети */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Мы в соцсетях</h3>
                <div className="flex space-x-4">
                  {contactInfo.instagram && (
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      href={contactInfo.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-yellow-100 text-yellow-600 p-3 rounded-full hover:bg-yellow-200 transition-colors"
                    >
                      <FaInstagram className="text-xl" />
                    </motion.a>
                  )}
                  {contactInfo.whatsapp && (
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-yellow-100 text-yellow-600 p-3 rounded-full hover:bg-yellow-200 transition-colors"
                    >
                      <FaWhatsapp className="text-xl" />
                    </motion.a>
                  )}
                  {contactInfo.telegram && (
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      href={`https://t.me/${contactInfo.telegram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-yellow-100 text-yellow-600 p-3 rounded-full hover:bg-yellow-200 transition-colors"
                    >
                      <FaTelegram className="text-xl" />
                    </motion.a>
                  )}
                </div>
              </div>
            </div>

            {/* Карта */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Мы на карте</h3>
              <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.7768346545596!2d44.68173931548399!3d43.23177037913803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4051d5e8a5d5d5d5%3A0x5d5d5d5d5d5d5d5d!2z0JLQu9Cw0LnQvdC-0LLRgdC60LDRjyDRg9C7Liwg0JzQvtGB0LrQvtCy0YHQutCw0Y8!5e0!3m2!1sru!2sru!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Наше местоположение"
                />
              </div>
            </div>
          </motion.div>

          {/* Форма обратной связи */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-2xl p-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Напишите нам
            </h2>
            
            {submitMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200"
              >
                {submitMessage}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Иван Иванов"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Телефон *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="+7 999 999-99-99"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="ivan@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Сообщение *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Расскажите, что вас интересует..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold py-4 px-6 rounded-lg hover:shadow-xl transition-all flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Отправка...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    <span>Отправить сообщение</span>
                  </>
                )}
              </motion.button>
            </form>

            <p className="text-gray-500 text-sm mt-6">
              * — обязательные поля для заполнения
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;