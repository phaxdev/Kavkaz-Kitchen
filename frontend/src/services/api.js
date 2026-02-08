import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Таймаут 10 секунд
});

// Перехватчик запросов
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Перехватчик ответов
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('API Error:', {
        status: error.response.status,
        url: error.config.url,
        data: error.response.data
      });
    } else if (error.request) {
      console.error('No response received:', error.config.url);
    } else {
      console.error('Request setup error:', error.message);
    }
    
    // Возвращаем fallback данные для критичных запросов
    if (error.config.url.includes('/banners/')) {
      return Promise.resolve({
        data: {
          results: [
            {
              id: 1,
              title: "Кухня Кавказа",
              subtitle: "Настоящая кавказская кухня во Владикавказе",
              image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070",
              is_active: true
            }
          ]
        }
      });
    }
    
    if (error.config.url.includes('/categories/')) {
      return Promise.resolve({
        data: {
          results: [
            { id: 1, name: "Закуски", description: "Традиционные кавказские закуски" },
            { id: 2, name: "Основные блюда", description: "Горячие блюда" },
            { id: 3, name: "Десерты", description: "Сладкие угощения" }
          ]
        }
      });
    }
    
    return Promise.reject(error);
  }
);

export default api;