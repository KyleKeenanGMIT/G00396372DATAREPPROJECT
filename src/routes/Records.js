import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Card, ListGroup, Button, Row, Col } from 'react-bootstrap'; // Import bootstrap for styling


const Records = () => {//setting server and api data to local variables
  const [apiRecords, setApiRecords] = useState(null);
  const [serverRecords, setServerRecords] = useState([]);

  useEffect(() => {
    // Fetching records from the Guinness World Records API
    const fetchApiRecords = async () => {
      const config = {
        method: 'get',
        url: 'https://guinness-world-records-api.p.rapidapi.com/guinness/recordDetails',//gathering api with my key and relevant details
        params: { href: '/world-records/82145-most-consecutive-vertical-push-ups' },
        headers: {
          'X-RapidAPI-Key': 'e7527f1016msh1fa96b68c145249p11b6fbjsna76b36e1067d',
          'X-RapidAPI-Host': 'guinness-world-records-api.p.rapidapi.com',
        },
      };

      try {
        const response = await axios(config);
        setApiRecords(response.data);
      } catch (error) {
        console.error('Error fetching API Data:', error);//api cannot be gathered usually down to exceeded limits.
      }
    };

    // adding fetched records to my server
    const fetchServerRecords = async () => {
      try {
        const response = await axios.get('http://localhost:5000/records'); // server end point
        setServerRecords(response.data);
      } catch (error) {
        console.error('Error fetching  records:', error);
      }
    };

    fetchApiRecords();
    fetchServerRecords();
  }, []);

  const handleDelete = async (recordId) => {
    try {
      const response = await fetch(`http://localhost:5000/records/${recordId}`, {//delete option displayed beside the record
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error deleting record');
      }
      // Removes records from db
      setServerRecords(prevRecords => prevRecords.filter(record => record._id !== recordId));
    } catch (error) {
      console.error('Failed to delete the record:', error);
    }
  };
  

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Guinness World Records API Data</h1>

      {/* Displaying API Records */}
      {apiRecords ? (
        apiRecords.body.map((record, index) => (
          <Row key={index} className="mb-3">
            <Col>
              <Card>
                <Card.Body>
                  <Card.Text>{record}</Card.Text>
                  <div>
                <Link to={`/edit/${record._id}`} className="btn btn-primary me-2">Edit</Link>
                <Button variant="danger" onClick={() => handleDelete(record._id)}>Delete</Button>
              </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))
      ) : (
       <p></p> 
      )}

      {/* Displaying Server Records */}
      <h2 className="text-center mb-3">Server Records</h2>
      {serverRecords.length > 0 ? (
        <ListGroup>
          {serverRecords.map((record) => (
            <ListGroup.Item key={record._id} className="d-flex justify-content-between align-items-center">
              <div className="flex-grow-1 me-3">
                <div><strong>Title:</strong> {record.title}</div>
                <div><strong>Description:</strong> {record.description}</div>
              </div>
              <div>
                <Link to={`/edit/${record._id}`} className="btn btn-primary me-2">Edit</Link>
                <Button variant="danger" onClick={() => handleDelete(record._id)}>Delete</Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>Loading Server Records...</p>
      )}
    </Container>
  );
};

export default Records;
