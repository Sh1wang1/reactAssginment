import React from 'react';

const ItemCard = ({ item, onCardClick }) => {
  return (
    <div className="item-card" onClick={() => onCardClick(item)}>
      <img src={item.coverImage} alt={item.name} />
      <h3>{item.name}</h3>
    </div>
  );
};

export default ItemCard; 