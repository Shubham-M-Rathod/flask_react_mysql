import { useNavigate } from "react-router-dom";
import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Signup.css';

const Signup = () => 
{
  let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/signup', {
        method : 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            username: document.getElementById("user").value,
            password: document.getElementById("pass").value,
            email: document.getElementById("email").value
        }) 
      })
        .then(res => {
          if (!res.ok) {
              throw new Error('Bad username or password');
          }
          return res.json();
        })
        .then(data => {localStorage.setItem('token', data.access_token); 
        navigate(`/profile/${data.user}`); })
        .catch(error => alert(error.message))
        } 
      

    return (
        <div>
        <Form className="homeForm" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="user">
        <Form.Label>Username</Form.Label>
        <Form.Control placeholder="Enter username" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="pass">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </div>
    )
}

export default Signup;