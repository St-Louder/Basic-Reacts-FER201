import { useState } from 'react';
import axios from 'axios';
import { Input, Form, Button, message } from 'antd';
import { UserOutlined, PictureOutlined, NumberOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import '../styles/addform.css';

const Add = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    avatar: '',
    age: '',
    address: '',
    CreateAt: new Date().toISOString().split('T')[0],
  });

  const validate = () => {
    const newErrors = {};

    if (formData.name.trim().split(' ').length <= 2) {
      newErrors.name = 'Name must contain more than 2 words';
    }

    if (!formData.avatar) {
      newErrors.avatar = 'Avatar must be a valid URL';
    }
    if (!formData.age) {
      newErrors.age = 'Age is required';
    }
    if (!formData.address) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    console.log(formData);
    if (validate()) {
      await axios
        .post('https://66792b9e18a459f6394e5fa6.mockapi.io/staffManagement', formData)
        .then(() => {
          message.success('Staff added successfully');
          navigate('/dashboard');
        })
        .catch((errors) => console.error(errors));
    }
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [form] = useForm();
  return (
    <div className="add-staff-form">
      <h2>Create Staff</h2>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label={<><UserOutlined /> Name</>}
          validateStatus={errors.name ? 'error' : ''}
          help={errors.name}
        >
          <Input
            name="name"
            value={formData.name}
            onChange={handleOnChange}
            required
          />
        </Form.Item>
        <Form.Item
          label={<><PictureOutlined /> Avatar URL</>}
          validateStatus={errors.avatar ? 'error' : ''}
          help={errors.avatar}
        >
          <Input
            name="avatar"
            type="url"
            value={formData.avatar}
            onChange={handleOnChange}
            required
          />
        </Form.Item>
        <Form.Item
          label={<><NumberOutlined /> Age</>}
        >
          <Input
            name="age"
            type="number"
            value={formData.age}
            onChange={handleOnChange}
            required
          />
        </Form.Item>
        <Form.Item
          label={<><HomeOutlined /> Address</>}
        >
          <Input
            name="address"
            value={formData.address}
            onChange={handleOnChange}
            required
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Add;
