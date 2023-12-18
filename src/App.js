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
import Edit from './edit';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg" className="nav-1">
        <Container>
          <Navbar.Brand as={Link} to="/">Guinness World Records</Navbar.Brand>
          <Navbar.Toggle aria-controls="boostrap-navbar-nav" />
          <Navbar.Collapse id="boot-navbar-nav">
            <Nav className="nav-auto">
              {isAuthenticated ? (
                <>
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/view-records">View Records</Nav.Link>
                  <Nav.Link as={Link} to="/create">Add Record</Nav.Link>
                  <Nav.Link as={Link} to="/login" onClick={handleLogout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/login">Login/Signup</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Routes>
          <Route path="/login" element={<Login onAuthenticate={setIsAuthenticated} />} />
          <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated}><Home /></PrivateRoute>} />
          <Route path="/view-records" element={<PrivateRoute isAuthenticated={isAuthenticated}><Records /></PrivateRoute>} />
          <Route path="/create" element={<PrivateRoute isAuthenticated={isAuthenticated}><Create /></PrivateRoute>} />
          <Route path="/edit/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}><Edit /></PrivateRoute>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
