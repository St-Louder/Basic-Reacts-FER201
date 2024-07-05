import { useState, useEffect } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import { Card, Col, Row, Button, Input, Form, message, Table, Typography } from 'antd';
import { PlusOutlined, UnorderedListOutlined, DeleteOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';
import './productlist.css';
// cd D:\Dev\VScode\REACT\assignment-final\src\components\data
// npx json-server --watch Products.json --port 5000
const { Meta } = Card;
const { Title } = Typography;

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', currentPrice: '' });
  const [error, setError] = useState('');


  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(response => setProducts(response.data))
      .catch(error => setError('Error fetching data from API'));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({ ...prevState, [name]: value }));
  };

  const handleViewDetails = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddProduct = () => {
    axios.post('http://localhost:5000/products', newProduct)
      .then(response => {
        setProducts(prevProducts => [...prevProducts, response.data]);
        setNewProduct({ name: '', description: '', price: '', currentPrice: '' });
        message.success('Product added successfully');
      })
      .catch(error => {
        console.error('Error adding product:', error);
        message.error('Error adding product');
      });
  };

  const handleDeleteProduct = (id) => {
    axios.delete(`http://localhost:5000/products/${id}`)
      .then(() => {
        setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
        message.success('Product deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting product:', error);
        message.error('Error deleting product');
      });
  };
  const handleEditProduct = (id) => {
    navigate(`/edits/${id}`);
  };

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Current Price',
      dataIndex: 'currentPrice',
      key: 'currentPrice',
    },
    {
      title: 'Actions',
      key: 'actions', 
      render: (text, record) => (
        <div className="action-buttons">
          <Button type="default" onClick={() => handleEditProduct(record.id)}><EditOutlined /> Edit</Button>
          <Button type="danger" onClick={() => handleDeleteProduct(record.id)}><DeleteOutlined /> Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="product-list-container">
      <Title level={1}><UnorderedListOutlined /> Product List</Title>
      {error && <p className="error-message">{error}</p>}
      <Row gutter={[16, 16]}>
        {products.map(product => (
          <Col key={product.id} xs={24} sm={12} md={12} lg={4}>
            <Card
              className='product-card'
              hoverable
              cover={<img alt={product.name} src={product.image} />}
              actions={[
                <Button type="primary" onClick={() => handleViewDetails(product.id)}><EyeOutlined /> View Details</Button>,
              ]}
            >
              <Meta title={product.name} description={product.description} />
              <div className="product-pricing">
                <p className="original-price">{product.price} đ</p>
                <p className="current-price">{product.currentPrice} đ</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Title level={2}>Products Table</Title>
      <Table columns={columns} dataSource={products} rowKey="id" pagination={false} />

      <Title level={2}><PlusOutlined /> Add New Product</Title>
      <Form className="add-product-form" layout="vertical" onFinish={handleAddProduct}>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the product name!' }]} className="form-item">
          <Input name="name" value={newProduct.name} onChange={handleInputChange} />
        </Form.Item>
        <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input the product description!' }]} className="form-item">
          <Input name="description" value={newProduct.description} onChange={handleInputChange} />
        </Form.Item>
        <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input the product price!' }]} className="form-item">
          <Input name="price" value={newProduct.price} onChange={handleInputChange} />
        </Form.Item>
        <Form.Item label="Current Price" name="currentPrice" rules={[{ required: true, message: 'Please input the current price!' }]} className="form-item">
          <Input name="currentPrice" value={newProduct.currentPrice} onChange={handleInputChange} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit"><PlusOutlined /> Add Product</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductList;
