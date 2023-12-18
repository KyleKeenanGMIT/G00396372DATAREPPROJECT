import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap'; // Import Bootstrap components

function Edit() {
  const [record, setRecord] = useState({
    title: '',
    description: '',
  });
  const { id } = useParams(); // Getting the record ID from URL parameters
  const navigate = useNavigate();

  // Fetching the existing record data from the database
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await fetch(`http://localhost:5000/records/${id}`);
        if (!response.ok) {
          throw new Error('Record not found');
        }
        const data = await response.json();
        setRecord(data); // setting new record data
      } catch (error) {
        console.error('Error fetching record:', error);
        navigate('/view-records'); // Redirects to view records if the fetch fails
      }
    };
    
    fetchRecord();
  }, [id, navigate]);

  // Handles changes in the form fields
  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  // Handles form submission to update a record
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Updating records in the database
    try {
      const response = await fetch(`http://localhost:5000/records/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: record.title,
          description: record.description,
        }),
      });

      if (!response.ok) {
        throw new Error('Error updating record');
      }
      navigate('/view-records'); // Navigates to the record page to view after updating a record
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Edit Record</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={record.title || ''}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={record.description || ''}
            onChange={handleChange}
            required
          ></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">Update Record</Button>
      </Form>
    </Container>
  );
}

export default Edit;
