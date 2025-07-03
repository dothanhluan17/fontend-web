// CategoryCard.jsx
import React from 'react';
import './CategoryCard.css';

const CategoryCard = ({ category, onClick }) => {
  return (
    <div className="category-card" onClick={onClick}>
      <img src={category.image} alt={category.name} />
      <h4>{category.name}</h4>
      <p>{category.description}</p>
    </div>
  );
};

export default CategoryCard;
