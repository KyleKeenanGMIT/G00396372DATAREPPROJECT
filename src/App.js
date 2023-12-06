// App.js
import React from 'react';
import Records from './routes/Records';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap import




function App() {
  return (
    <div>
      {/* Bootstrap Navbar */}
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#">Guinness World Records</Navbar.Brand>
          {/* You can add more navbar items here */}
        </Container>
      </Navbar>

      {/* Main content */}
      <Container>
        <h1>Your App</h1>
        <Records />
      </Container>
    </div>
  );
}

export default App;