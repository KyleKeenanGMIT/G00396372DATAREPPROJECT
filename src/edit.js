import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Edit() {
  const [record, setRecord] = useState({
    title: '',
    description: '',
  });
  const { id } = useParams(); // Getting the record ID from URL parameters
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching the existing record data from the database
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

  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

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
    <div>
      <h2>Edit Record</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={record.title || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={record.description || ''}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Update Record</button>
      </form>
    </div>
  );
}

export default Edit;
