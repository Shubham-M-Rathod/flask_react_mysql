import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './EditPage.css';

const EditPage = () =>
{
    let navigate = useNavigate();
    const { user } = useParams();
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/users', {
            method : 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                username: user,
                new_username: document.getElementById("newuser").value,
                new_email: document.getElementById("newmail").value
            })            
        })
        .then(res => {
            if (!res.ok) {
                alert('Invalid Username or new Username'); 
                navigate(`/editProfile/${user}`);
                throw new Error('Invalid username or new username');
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
            navigate(`/profile/${data.user}`)
        })
        .catch(error => {
            console.error('An error occurred:', error);
        });
    }

    return (
        <Form className="editForm" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="newuser">
        <Form.Label>New Username</Form.Label>
        <Form.Control placeholder="New Username" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="newmail">
        <Form.Label>New Email</Form.Label>
        <Form.Control placeholder="New Email" type="email"/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        )
}

export default EditPage;