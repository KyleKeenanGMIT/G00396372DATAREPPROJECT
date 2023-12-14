import React from 'react'; // routes import
import { Routes, Route , Link, Outlet } from 'react-router-dom'; // router import
import Records from './routes/Records'; // records import
import Create from './Create'; // crate.js import
import Home from './routes/home'; // homepage import
import Container from 'react-bootstrap/Container'; // react container import
import Navbar from 'react-bootstrap/Navbar'; // react navbar import
import Nav from 'react-bootstrap/Nav'; // nav import
import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap import
import Login from './Login';

function App() {
  return (
      <div>
        {/* Bootstrap Navbar import */}
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand as={Link} to="/">Guinness World Records</Navbar.Brand> {/* Nav bar title */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link> {/* home title */}
                <Nav.Link as={Link} to="/view-records">View Records</Nav.Link> {/* view existing records */}
                <Nav.Link as={Link} to="/create">Add Record</Nav.Link> {/* create.js title */}
                <Nav.Link as={Link} to="/login">Login/Signup</Nav.Link> {/* home title */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Route links in the navbar */}
        <Routes>
          
        <Route path="/login" element={<Login />} />{/* login.js */}
        <Route path="/" exact element={<Home />} /> {/* homepagee */}
        <Route path="/view-records" element={<Records />} /> {/* viewing records route */}
        <Route path="/create" element={<Create />} /> {/* crwting new records route */}
        
        </Routes>
      </div>
    
  );
}

export default App;
