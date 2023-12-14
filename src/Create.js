import React, { useState } from 'react'; //usestate import

function Create() {
  // Initial state to clear form after use.
  const initialState = {
    title: '',
    description: '',
  };

  const [record, setRecord] = useState(initialState); // setting record

  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };//changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/records', {//sends to server
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
      });

      if (!response.ok) {
        throw new Error('error');
      }

      // clearing the form
      setRecord(initialState);

    } catch (error) {
      console.error('Failed to add record to database:', error);
      // error to show record could not be added to database
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

export default Create;//exporting create .js
