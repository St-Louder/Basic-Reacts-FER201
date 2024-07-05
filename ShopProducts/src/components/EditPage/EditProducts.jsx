import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { EditOutlined, FileTextOutlined, DollarOutlined, TagOutlined, PictureOutlined } from '@ant-design/icons';
import { message } from 'antd';
import './editsproduct.css';

const EditProduct = ({ onSave, onCancel }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    currentPrice: '',
    image: ''
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/products/${id}`)
        .then(response => {
          const productData = response.data;
          setFormData({
            name: productData.name,
            description: productData.description,
            price: productData.price,
            currentPrice: productData.currentPrice,
            image: productData.image
          });
        })
        .catch(error => console.error('Error fetching product data:', error));
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSaveChanges = () => {
    axios.put(`http://localhost:5000/products/${id}`, formData)
      .then(response => {
        if (onSave) {
          onSave(response.data);
        }
        message.success('Product updated successfully');
        navigate(-1);
      })
      .catch(error => {
        console.error('Error updating product:', error);
        message.error('Failed to update product');
      });
  };

  return (
    <div className="edit-product-container">
      <h1>Edit Product</h1>
      <div className="form-group">
        <label>Name:</label>
        <div className="input-container">
          <TagOutlined className="input-icon" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-group">
        <label>Description:</label>
        <div className="input-container">
          <FileTextOutlined className="input-icon" />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-group">
        <label>Price:</label>
        <div className="input-container">
          <DollarOutlined className="input-icon" />
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-group">
        <label>Current Price:</label>
        <div className="input-container">
          <DollarOutlined className="input-icon" />
          <input
            type="text"
            name="currentPrice"
            value={formData.currentPrice}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-group">
        <label>Image URL:</label>
        <div className="input-container">
          <PictureOutlined className="input-icon" />
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="button-group">
        <button className="save-button" onClick={handleSaveChanges}>
          <EditOutlined /> Save
        </button>
        <button className="cancel-button" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditProduct;
