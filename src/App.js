import React from 'react';
import Records from './routes/Records';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap import
import Create from './Create'; // Import the Create component

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

      
      <Container>
        <h1>Guinness World Records</h1>
        
        
        <Create />{/* create component added to add new records */}

        
        <Records /> {/* records component added to view existing records */}
      </Container>
    </div>
  );
}

export default App;
