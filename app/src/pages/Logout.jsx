import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Logout = () =>
{
    let navigate = useNavigate();
    useEffect(()=>
    {
        fetch('http://localhost:5000/logout', {
        method : 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },         
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        navigate(`/`)
    })
    .catch(error => {
        console.error('An error occurred:', error);
        });
    }, []);
}

export default Logout;