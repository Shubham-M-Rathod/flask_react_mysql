import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Home.css';
import { useNavigate } from 'react-router-dom';
const Home = () => 
{
  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/login", {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: document.getElementById("user").value,
          password: document.getElementById("pass").value
        })
    })
    .then(res => {
      if (!res.ok) {
          throw new Error('Bad username or password');
      }
      return res.json();
    })
    .then(data => {localStorage.setItem('token', data.access_token); 
    navigate(`/profile/${data.user}`);})
    .catch(error => alert(error.message));
    }

    return (
        <div>
        <Form className="homeForm" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="user">
        <Form.Label>Username</Form.Label>
        <Form.Control placeholder="Enter username" />
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

export default Home;