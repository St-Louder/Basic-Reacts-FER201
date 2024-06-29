import  { useEffect, useState } from "react";
import "../styles/homepage.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HomePage(){
    const navigate = useNavigate();
    const handldetail =(id) =>{
        navigate(`/detail/${id}`);
    }

    const [staff,setStaff]= useState([]);
    const getStaff = async () =>{
        try {
            const respond = await axios.get("https://66792b9e18a459f6394e5fa6.mockapi.io/staffManagement")
            console.log(respond.data)
            const sortedStaff = respond.data.sort((a, b) => a.age - b.age);
            setStaff(sortedStaff);
            
            
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(()=>{
        getStaff() 


    },[])


    return(
        <>

        <div className="Object-form">
                {staff.map((staff)=>(
                 <ul key={staff.id}>
                    <li className="staff-li">
                        {staff.name} 
                    </li>
                    <li className="staff-li">
                        {staff.address}
                    </li>
                    <li className="staff-li">
                        {staff.age}
                    </li>
                    <li className="staff-li">
                        <img src={staff.avatar} alt={staff.name} />
                    </li>
                    <button onClick ={() =>handldetail(staff.id)} >Detail</button>
                 </ul>   
                ))}


        </div>

        </>
    )
}
export default HomePage;