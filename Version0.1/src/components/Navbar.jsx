import '../styles/navbar.css';
import { DashboardOutlined, PhoneOutlined, HomeFilled } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

function NavbarPage() {
    const navigate = useNavigate();
    const handleHome = () =>{
        navigate("/");
        window.location.reload
    }
    const handleDashBoard = () =>{
        navigate("/dashboard")
    }
    const handleContact = () =>{
        navigate("/contact")
    }
    return (
        <div className="navbar">
            <ul>
                <li onClick ={handleHome}>
                    <HomeFilled /> Home
                </li>
                <li onClick={handleDashBoard}>
                    <DashboardOutlined /> DashBoard
                </li>
                <li onClick={handleContact}>
                    <PhoneOutlined /> Contact
                </li>
            </ul>
        </div>
    );
}

export default NavbarPage;
