import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Records from './routes/Records';
import Create from './Create';
import Home from './routes/home';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import PrivateRoute from './PrivateRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Guinness World Records
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/login">
                Login/Signup
              </Nav.Link>
              {isAuthenticated && (
                <>
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/view-records">
                    View Records
                  </Nav.Link>
                  <Nav.Link as={Link} to="/create">
                    Add Record
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/login" element={<Login onAuthenticate={setIsAuthenticated} />} />
        <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated}><Home /></PrivateRoute>} />
        <Route path="/view-records" element={<PrivateRoute isAuthenticated={isAuthenticated}><Records /></PrivateRoute>} />
        <Route path="/create" element={<PrivateRoute isAuthenticated={isAuthenticated}><Create /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
