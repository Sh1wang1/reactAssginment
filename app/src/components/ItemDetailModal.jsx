import React, { useState } from 'react';
import Modal from 'react-modal';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import axios from 'axios';

const ItemDetailModal = ({ item, modalIsOpen, closeModal }) => {
  const [enquireStatus, setEnquireStatus] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  if (!item) {
    return null;
  }

  const allImages = [item.coverImage, ...item.additionalImages];

  const handleEnquire = async () => {
    setEnquireStatus('Sending...');
    setPreviewUrl('');
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/enquire`, { item });
      setEnquireStatus('Enquiry sent!');
      if (res.data.previewUrl) setPreviewUrl(res.data.previewUrl);
    } catch (err) {
      setEnquireStatus('Failed to send enquiry.');
    }
    setTimeout(() => setEnquireStatus(''), 4000);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Item Details"
      ariaHideApp={false}
      className="item-modal"
      overlayClassName="item-modal-overlay"
    >
      <h2>{item.name}</h2>
      <div className="carousel-container">
        <Carousel>
          {allImages.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`${item.name} - ${index + 1}`} />
            </div>
          ))}
        </Carousel>
      </div>
      <p><strong>Type:</strong> {item.type}</p>
      <p><strong>Description:</strong> {item.description}</p>
      <button onClick={closeModal}>Close</button>
      <button className="enquire-btn" onClick={handleEnquire}>Enquire</button>
      {enquireStatus && <div style={{marginTop: '1rem'}}>{enquireStatus}</div>}
      {previewUrl && <div style={{marginTop: '0.5rem'}}><a href={previewUrl} target="_blank" rel="noopener noreferrer">View Sent Email</a></div>}
    </Modal>
  );
};

export default ItemDetailModal; 