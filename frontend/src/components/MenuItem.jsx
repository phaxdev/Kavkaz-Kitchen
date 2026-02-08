import React from 'react';

const MenuItem = ({ item }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={item.image} 
        alt={item.name}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.src = `https://via.placeholder.com/400x300/FFD700/000000?text=${encodeURIComponent(item.name)}`;
        }}
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
          <span className="text-xl font-bold text-yellow-600">{item.price} руб.</span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
        <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded transition-colors">
          В корзину
        </button>
      </div>
    </div>
  );
};

export default MenuItem;