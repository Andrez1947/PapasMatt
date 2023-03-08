import React from 'react';

function Categories() {
  const categories = ["Papas a la Francesa", "Papas Criollas", "Otras Delicias", "Bebidas", "Adiciones"];

  return (    
    <div className="overflow-x-scroll whitespace-nowrap">
      {categories.map((category, index) => (
        <a
          key={index}
          href={`#${category}`}
          className="inline-block px-4 py-2 text-gray-600 hover:text-black font-medium"
        >
          {category}
        </a>
      ))}
    </div>
  );
}

export default Categories;