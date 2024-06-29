import axios from 'axios';
import { useEffect, useState } from 'react';
import '../styles/dashboard.css';
import { useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const Dashboard = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const getStaff = async () => {
      try {
        const response = await axios.get("https://66792b9e18a459f6394e5fa6.mockapi.io/staffManagement");
        setStaff(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getStaff();
  }, []);

  const handleViewDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://66792b9e18a459f6394e5fa6.mockapi.io/staffManagement/${id}`);
      setStaff(staff.filter((member) => member.id !== id));
      message.success('Staff deleted successfully');
    } catch (error) {
      console.error('Error deleting staff:', error);
      message.error('Error deleting staff');
    }
  };

  const handleAddNewStaff = () => {
    navigate("/addStaff");
  };

  return (
    <div className='dashboard-form'>
      <div>
      <Button type="primary" onClick={handleAddNewStaff} className="add-button"><PlusOutlined className="add-icon" />
        </Button>
        {staff.map((member) => (
          <ul key={member.id}>
            <li>{member.name}</li>
            <Button type="primary" onClick={() => handleViewDetail(member.id)} icon={<EyeOutlined />}>
              View Detail
            </Button>
            <Button type="primary" onClick={() => handleUpdate(member.id)} icon={<EditOutlined />}>
              Update
            </Button>
            <Button type="primary" onClick={() => handleDelete(member.id)} icon={<DeleteOutlined />}>
              Delete
            </Button>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
