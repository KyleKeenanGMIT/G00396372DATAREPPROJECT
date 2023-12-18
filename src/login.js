import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap'; // Bootstrap imports

function Login({ onAuthenticate }) {
  const [isLogin, setIsLogin] = useState(true);
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  // Handles changes in the form fields
  const handleChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  // Handles form submission for login or registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'http://localhost:5000/login' : 'http://localhost:5000/register';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials),
      });
      const data = await response.json();
      if (response.ok) {
        onAuthenticate(true);
        navigate('/');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container className="login-0">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center">{isLogin ? 'Login' : 'Register'}</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="login-1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userCredentials.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="login-1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={userCredentials.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="b-001">
              {isLogin ? 'Login' : 'Create Account'}
            </Button>
          </Form>
          <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="b-002">
            {isLogin ? 'Need to create an account?' : 'Already have an account?'}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
