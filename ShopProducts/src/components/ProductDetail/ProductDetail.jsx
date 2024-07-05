import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { EditOutlined } from '@ant-design/icons'; // Import EditOutlined icon from Ant Design
import './productdetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  const handleEditProduct = (id) => {
    navigate(`/edits/${id}`);
  };
  useEffect(() => {
    axios.get(`http://localhost:5000/products/${id}`)
      .then(response => {
        const productData = response.data;
        console.log(productData); // Kiểm tra dữ liệu sản phẩm trả về
        setProduct(productData);
        setFormData({
          name: productData.name,
          description: productData.description,
          price: productData.price,
          currentPrice: productData.currentPrice,
          imageUrl: productData.image // Assuming imageUrl is part of product data

        });
      })
      .catch(error => console.error('Error fetching product data:', error));
  }, [id]);
  


  if (!product) return <div>Loading...</div>;

  console.log(product.image); // Kiểm tra URL hình ảnh

  return (
    <div className="product-detail-container">


        <div>
          <div className="product-header">
            <h1>{product.name}</h1>
          </div>
          <img className="product-image" src={product.image} alt={product.name} />
          <p className="product-description">Description:{product.description}</p>
          <p className="product-price">Price: {product.price}</p>
          <p className="product-current-price">Current Price: {product.currentPrice}</p>
        </div>

        <button className="edit-button" onClick={() => handleEditProduct(product.id)}>
          <EditOutlined /> Edit
        </button>
      <button className="back-button" onClick={() => navigate(-1)}>Back to Product List</button>
    </div>
  );
};

export default ProductDetail;
