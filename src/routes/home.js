import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'; // Bootstrap import for styling

function Home() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <h1>Welcome to my Data Rep Project - Guinness World Records</h1>
          <p className="mt-4">Made by Kyle Keenan</p>
          <p className="mt-4">My Project works by gathering JSON Data from a Guinness World Record API available on Google!
          <br></br>
          You are able to update the existing data, create new data & delete data. All this data is stored on my Database Mongo DB.</p>
          {/* Displaying title on the homepage */}
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
