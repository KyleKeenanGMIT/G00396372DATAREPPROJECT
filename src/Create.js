
import React, { useState } from 'react';

function Create() {
  const [record, setRecord] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
      });

      if (!response.ok) {
        throw new Error('error');
      }

    } catch (error) {
      console.error('Failed to add record to data base:', error);
      // error to show record could not be added/
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input type="text" name="title" value={record.title} onChange={handleChange} />
      </div>
      <div>
        <label>Description</label>
        <textarea name="description" value={record.description} onChange={handleChange}></textarea>
      </div>
      <button type="submit">Add Record</button>
      {/* input fields to add a record */}
    </form>
  );
}

export default Create;
