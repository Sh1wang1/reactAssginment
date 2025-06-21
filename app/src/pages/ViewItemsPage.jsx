import React, { useState } from 'react';
import ItemCard from '../components/ItemCard';
import ItemDetailModal from '../components/ItemDetailModal';

const ViewItemsPage = ({ items }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedItem(null);
  };

  return (
    <div>
      <h2>View Items</h2>
      <div className="item-list">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} onCardClick={openModal} />
        ))}
      </div>
      <ItemDetailModal
        item={selectedItem}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
      />
    </div>
  );
};

export default ViewItemsPage; 