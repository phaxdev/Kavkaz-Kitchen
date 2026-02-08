export const getFallbackBanners = () => ({
  results: [
    {
      id: 1,
      title: "Кухня Кавказа",
      subtitle: "Настоящая кавказская кухня во Владикавказе",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070",
      is_active: true,
      order: 1
    }
  ]
});

export const getFallbackCategories = () => ({
  results: [
    { id: 1, name: "Закуски", description: "Традиционные кавказские закуски" },
    { id: 2, name: "Основные блюда", description: "Горячие блюда" },
    { id: 3, name: "Десерты", description: "Сладкие угощения" },
    { id: 4, name: "Напитки", description: "Национальные напитки" }
  ]
});

export const getFallbackDishes = () => ({
  results: [
    {
      id: 1,
      name: "Хачапури по-аджарски",
      description: "Традиционный грузинский пирог с сыром и яйцом",
      price: 450,
      weight: "400г",
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069",
      is_popular: true,
      category: 1
    },
    {
      id: 2,
      name: "Шашлык из баранины",
      description: "Нежнейший шашлык на углях с традиционными специями",
      price: 890,
      weight: "350г",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069",
      is_popular: true,
      category: 2
    }
  ]
});

// Добавьте эту экспорт
export const fallbackContactInfo = {
  phone: '+7 918-702-82-21',
  address: 'Владикавказ, ул. Кухонная, 1',
  email: 'info@kuhnya-kavkaza.ru',
  working_hours: 'Ежедневно с 9:00 до 21:00',
  instagram: 'https://instagram.com/kuhnya_kavkaza',
  whatsapp: '+79187028221',
  telegram: '@kuhnya_kavkaza'
};