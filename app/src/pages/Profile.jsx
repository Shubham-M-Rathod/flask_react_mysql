import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
import Table from 'react-bootstrap/Table';

const Profile = () => {
    let navigate = useNavigate();
    const { user } = useParams();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [users, setUsers] = useState([]);

    const [showA, setShowA] = useState(false);
    const toggleShowA = (event) => 
    {
        fetch(`http://localhost:5000/users`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => setUsers(data))
        setShowA(!showA);
    }

    const clickEdit = (event) =>
    {
        event.preventDefault();
        navigate(`/editProfile/${user}`);
    }

    useEffect(() => {
        console.log(user);
        fetch(`http://localhost:5000/userprofile?username=${user}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            if (!res.ok) {
                alert('Bad username or password'); navigate(`/`);
            }
            return res.json();
        })
        .then(data => {
            setUsername(data.user);
            setEmail(data.email);
        })
    }, [user]);

    return (
        <div className='profile'>
            Profile of <u>{username}</u>
            <br/>
            Email: <u>{email}</u>

            <Col>
            <Button onClick={toggleShowA} className="mb-2">
            Show Resgistered Users
            </Button>
            <Toast show={showA} onClose={toggleShowA} className='userDatas'>
            <Toast.Body>
            <Table striped bordered hover variant="dark">
      <thead>
        <tr>
        <th>#</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
      {users.map((user, idx) => 
      <tr key={idx}>
        <td>{idx+1}</td>
        <td>{user.user}</td>
        <td>{user.email}</td>
        </tr>
        )}
      </tbody>
    </Table>
            </Toast.Body>
            </Toast>
            </Col>
            <Button onClick={clickEdit} className="mb-2">
            Edit Profile
            </Button>
        </div>
    )
}

export default Profile;
