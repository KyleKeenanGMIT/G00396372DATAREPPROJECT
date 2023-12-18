import React, { useState } from 'react'; // useState import
import { Container, Form, Button } from 'react-bootstrap'; // Import Bootstrapp styling

function Create() {
  // Initial state to clear form after record is typed in
  const initialState = {
    title: '',
    description: '',
  };

  const [record, setRecord] = useState(initialState); // setting record

  // Handles changes in the form fields
  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  }; // changes

  // Handles form submission to add a new record
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/records', { // sends to server
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
      });

      if (!response.ok) {
        throw new Error('error');
      }

      // Clearing the form after successful submission
      setRecord(initialState);

    } catch (error) {
      console.error('Failed to add record to database:', error);
      // Error to show record could not be added to database
    }
  };

  return (
    <Container className="mt-4">{/*boostrap syling */}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control 
            type="text" 
            name="title" 
            value={record.title} 
            onChange={handleChange} 
            required 
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control 
            as="textarea" 
            name="description" 
            value={record.description} 
            onChange={handleChange} 
            required 
          />
        </Form.Group>
        <Button variant="primary" type="submit">Add Record</Button>
        {/* Input fields to add a record */}
      </Form>
    </Container>
  );
}

export default Create; // Exporting Create.js
