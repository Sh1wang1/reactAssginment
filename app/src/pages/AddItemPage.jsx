import React, { useState } from 'react';

const AddItemPage = ({ onAddItem }) => {
  const [itemName, setItemName] = useState('');
  const [itemType, setItemType] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [additionalImages, setAdditionalImages] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      name: itemName,
      type: itemType,
      description: itemDescription,
      coverImage: coverImage || 'https://via.placeholder.com/300x300.png?text=New+Item',
      additionalImages: additionalImages
        ? additionalImages.split(',').map((url) => url.trim())
        : [],
    };
    await onAddItem(newItem);
    setSuccessMessage('Item successfully added');
    setItemName('');
    setItemType('');
    setItemDescription('');
    setCoverImage('');
    setAdditionalImages('');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="add-item-section">
      <form onSubmit={handleSubmit} className="add-item-form">
        <h2>Add a New Item</h2>
        {successMessage && <div className="success-message">{successMessage}</div>}
        <label>
          Item Name:
          <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
        </label>
        <label>
          Item Type:
          <input type="text" value={itemType} onChange={(e) => setItemType(e.target.value)} required />
        </label>
        <label>
          Item Description:
          <textarea value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} required />
        </label>
        <label>
          Item Cover Image URL:
          <input type="text" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="Paste image URL here" />
        </label>
        <label>
          Additional Image URLs (comma separated):
          <input type="text" value={additionalImages} onChange={(e) => setAdditionalImages(e.target.value)} placeholder="Paste URLs, separated by commas" />
        </label>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItemPage; 