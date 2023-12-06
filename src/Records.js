import React, { useState, useEffect } from 'react';//usestate and use effect import
import axios from 'axios';//axios import

const MyComponent = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('https://zylalabs.com/api/1507/records+guinness+api/1241/get+guinness+record');//link to api for axios to gather.
        setRecords(response.data);//setRecords variable used to house all the data in the api.
      } catch (error) {
        console.error('Error fetching api:', error);
      }//error displayed if api cannot be gathered.
    };

    fetchRecords();//fetching records from api.
  }, []);

  return (
    <div>
      <h1>Guinness Records</h1>
      <ul>
        {records.map(record => (
          <li key={record.id}>{record.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;
