import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Edit() {
  const [record, setRecord] = useState({
    // initial state
  });
  const { id } = useParams(); // Get the record ID from URL parameters
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the existing record data from the database
    const fetchRecord = async () => {
      const response = await fetch(`http://localhost:5000/records/${id}`);
      const data = await response.json();
      setRecord(data);
    };
    
    fetchRecord();
  }, [id]);

  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update the record in the database
    const response = await fetch(`http://localhost:5000/records/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    });

    if (response.ok) {
      // Navigate back to the records page or display a success message
      navigate('/view-records');
    }
  };

  return (
    <div>
      <h2>Edit Record</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields go here */}
        {/* Example: */}
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={record.name}
            onChange={handleChange}
            required
          />
        </div>
        {/* Add other fields as needed */}
        <button type="submit">Update Record</button>
      </form>
    </div>
  );
}

export default Edit;
