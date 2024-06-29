import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Input, Form, Button, message } from 'antd';
import { UserOutlined, PictureOutlined, NumberOutlined, HomeOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import '../styles/updateform.css';

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    avatar: '',
    age: '',
    address: '',
    CreateAt: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get(`https://66792b9e18a459f6394e5fa6.mockapi.io/staffManagement/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching staff:', error);
        message.error('Failed to fetch staff details');
      }
    };

    fetchStaff();
  }, [id]);

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

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        await axios.put(`https://66792b9e18a459f6394e5fa6.mockapi.io/staffManagement/${id}`, formData);
        message.success('Staff updated successfully');
        navigate("/dashboard");
      } catch (error) {
        console.error('Error updating staff:', error);
        message.error('Failed to update staff');
      }
    }
  };

  const [form] = useForm();
  return (
    <div className="update-staff-form">
      <h2>Update Staff</h2>
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
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Update;
