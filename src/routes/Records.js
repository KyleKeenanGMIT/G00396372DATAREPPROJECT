import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Records = () => {
  const [apiRecords, setApiRecords] = useState(null);
  const [serverRecords, setServerRecords] = useState([]);

  useEffect(() => {
    // Fetch records from the Guinness World Records API
    const fetchApiRecords = async () => {
      const config = {
        method: 'get',
        url: 'https://guinness-world-records-api.p.rapidapi.com/guinness/recordDetails',
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
        console.error('Error fetching API Data:', error);
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

  return (
    <div>
      <h1>Guinness World Records Data</h1>
      {/* Displaying API Records */}
      {apiRecords ? (
        <div>
          <h2>{apiRecords.titlesInfo.Who}'s Record</h2>
          <p>{apiRecords.body[0]}</p>
          <p>{apiRecords.body[1]}</p>
        </div>
      ) : (
        <p>Loading API Records...</p>
      )}
      {/* Displaying Server Records */}
      {serverRecords.length > 0 ? (
        <div>
          <h2>Server Records</h2>
          {serverRecords.map((record, index) => (
           <div key={record._id}>
              {/* Displaying server record details here */}
              <p>{record.title} - {record.description}</p>
              <Link to={`/edit/${record._id}`}>Edit Record</Link> {/* goes to edit.js to update existing record */}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading Server Records...</p>
      )}
    </div>
  );
};

export default Records;
