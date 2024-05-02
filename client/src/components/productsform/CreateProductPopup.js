// CreateProductPopup.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateProductPopup = ({ handleClose, handleCreateProduct }) => {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [warranty, setWarranty] = useState('');
  const [rating, setRating] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('cost', cost);
      formData.append('warranty', warranty);
      formData.append('rating', rating);
      formData.append('image', image);
      
      await handleCreateProduct(formData);
      handleClose();
    } catch (err) {
      console.error('Error creating product:', err);
      setErrorMessage('Unexpected error creating product. Please try again.');
    }
  };

  return (
<div>
<div  style={{marginLeft:"48%",cursor:"pointer"}}      onClick={handleClose}>
           <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
         <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
    </svg>
        </div>
    <div className="popup" >
           
      <div className="popup-inner"  >

       
        <h2>Create Product</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          <label>Cost:</label>
          <input type="text" value={cost} onChange={(e) => setCost(e.target.value)} required />
          <label>Warranty:</label>
          <input type="text" value={warranty} onChange={(e) => setWarranty(e.target.value)} required />
          <label>Rating:</label>
          <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} min="0" max="5" />
          <label>Upload Image:</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" required />
          <button type="submit">Create</button>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
      </div>
    </div>
    </div>
  );
};

export default CreateProductPopup;
