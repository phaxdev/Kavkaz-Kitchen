import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await api.get('/gallery/');
        console.log('Gallery response:', response.data); // Для отладки
        
        // Обрабатываем данные (учитываем пагинацию)
        let imagesData = response.data;
        
        if (imagesData && imagesData.results && Array.isArray(imagesData.results)) {
          // Если ответ с пагинацией
          imagesData = imagesData.results;
        } else if (Array.isArray(imagesData)) {
          // Если ответ - массив
          imagesData = imagesData;
        } else {
          // Если другой формат
          imagesData = [];
        }
        
        setImages(imagesData);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
        setError(error.message);
        // Fallback изображения
        setImages([
          {
            id: 1,
            title: "Наша кухня",
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070",
            description: "Интерьер нашей кухни"
          },
          {
            id: 2,
            title: "Традиционные блюда",
            image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069",
            description: "Приготовление по старинным рецептам"
          },
          {
            id: 3,
            title: "Свежие ингредиенты",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080",
            description: "Только свежие и натуральные продукты"
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-b from-yellow-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Наша Галерея
            </h2>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-b from-yellow-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Наша Галерея
          </h2>
          <p className="text-gray-600 mb-8">Не удалось загрузить изображения</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Показываем fallback изображения при ошибке */}
            {images.length > 0 ? (
              images.map((image, index) => (
                <div
                  key={image.id || index}
                  className="relative overflow-hidden rounded-2xl shadow-xl"
                >
                  <img
                    src={image.image_url || image.image}
                    alt={image.title || "Изображение"}
                    className="w-full h-64 object-cover"
                  />
                  {image.title && (
                    <div className="p-4 bg-white">
                      <h3 className="font-bold text-gray-900">{image.title}</h3>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500">Изображения скоро будут добавлены</p>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-yellow-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Наша Галерея
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Увидеть — значит поверить. Наши блюда, наш интерьер, наша атмосфера.
          </p>
        </motion.div>

        {Array.isArray(images) && images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <motion.div
                key={image.id || index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedImage(image)}
                className="relative overflow-hidden rounded-2xl shadow-xl cursor-pointer group"
              >
                <img
                  src={image.image_url || image.image}
                  alt={image.title || "Изображение галереи"}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <h3 className="text-white text-xl font-bold">{image.title || "Фото"}</h3>
                    {image.description && (
                      <p className="text-white/90 mt-2">{image.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-xl mb-4">
              Галерея пока пуста
            </p>
            <p className="text-gray-500">
              Скоро здесь появятся фотографии нашей кухни и блюд
            </p>
          </div>
        )}
      </div>

      {/* Модальное окно для просмотра изображения */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white text-3xl z-10 hover:text-yellow-400"
            >
              ✕
            </button>
            <img
              src={selectedImage.image_url || selectedImage.image}
              alt={selectedImage.title || "Изображение"}
              className="w-full h-auto rounded-lg"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070';
              }}
            />
            <div className="bg-white p-6 rounded-b-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedImage.title || "Фото"}
              </h3>
              {selectedImage.description && (
                <p className="text-gray-600">{selectedImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;