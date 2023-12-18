import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap'; // Bootstrap imports

function Login({ onAuthenticate }) {//if the user is able to sign in properly it will allow them to access other pages of the website.
  const [isLogin, setIsLogin] = useState(true);
  const [userCredentials, setUserCredentials] = useState({
    email: '',//email and password needed to login/signup.
    password: '',
  });
  const navigate = useNavigate(); //use navigate here to send them to homepage after login

  // Handles changes in the form fields
  const handleChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  // Handles form submission for login or registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'http://localhost:5000/login' : 'http://localhost:5000/register';//user is given a choice either to login or register new account.
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',//post method to server
        },
        body: JSON.stringify(userCredentials),//sends user details to database
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
    <Container className="mt-4">{/* bootstrap styling */}
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center">{isLogin ? 'Login' : 'Register'}</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userCredentials.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={userCredentials.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              {isLogin ? 'Login' : 'Create Account'}
            </Button>
          </Form>
          <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="mt-3"> {/* login button */}
            {isLogin ? 'Need to create an account?' : 'Already have an account?'}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
//export
export default Login;
