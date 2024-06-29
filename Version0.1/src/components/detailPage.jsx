import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { LoadingOutlined, SmileOutlined, FrownOutlined } from '@ant-design/icons'; 
import '../styles/detail.css'; 

const DetailPage = () => {
    const { id } = useParams();
    const [staffDetail, setStaffDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getStaffDetail = async () => {
            try {
                const response = await axios.get(`https://66792b9e18a459f6394e5fa6.mockapi.io/staffManagement/${id}`);
                setStaffDetail(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getStaffDetail();
    }, [id]);

    if (loading) {
        return (
            <div className="loading">
                <LoadingOutlined style={{ fontSize: 24 }} spin /> Loading...
            </div>
        );
    }

    if (!staffDetail) {
        return (
            <div className="not-found">
                <FrownOutlined style={{ fontSize: 24 }} /> Staff not found
            </div>
        );
    }

    return (
        <div className="detail-container">
            <h1>{staffDetail.name}</h1>
            <p>Address: {staffDetail.address}</p>
            <p>Age: {staffDetail.age}</p>
            <p>Created Date: {new Date(staffDetail.createdAt).toLocaleDateString()}</p>
            <img src={staffDetail.avatar} alt={staffDetail.name} />
            <div>
                <SmileOutlined style={{ fontSize: 24 }} /> Happy Staff
            </div>
        </div>
    );
};

export default DetailPage;
