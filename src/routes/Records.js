
import React, { useState, useEffect } from 'react';
import axios from 'axios';//axios import - npm install axios.

const Records = () => {//records - takes in record details from the api and sets them on the server.
  const [recordDetails, setRecordDetails] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {//fetching data from the api.
      const config = {
        method: 'get',
        url: 'https://guinness-world-records-api.p.rapidapi.com/guinness/recordDetails',//api details including my auth key.
        params: {
          href: '/world-records/82145-most-consecutive-vertical-push-ups',
        },
        headers: {
          'X-RapidAPI-Key': 'e7527f1016msh1fa96b68c145249p11b6fbjsna76b36e1067d',
          'X-RapidAPI-Host': 'guinness-world-records-api.p.rapidapi.com',
        },
      };//auth key

      try {
        const response = await axios(config);
        setRecordDetails(response.data);
      } catch (error) {
        console.error('Error fetching API Data:', error);
      }//responds with error if data cannot be gathered.
    };

    fetchRecords();
  }, []);

  return (
    <div>
      <h1>Guinness World Records Data</h1>{/*title on home page*/}
      {recordDetails ? (
        <div>
          <h2>{recordDetails.titlesInfo.Who}'s Record</h2>{/*Name of Person + 's Record*/}
          <p>{recordDetails.body[0]}</p>{/*Responds with record details eg most pushups in 1 min.*/}
          <p>{recordDetails.body[1]}</p>
        </div>
      ) : (
        <p>Loading Records...</p> // simple paragraph that dissapears after the records have been displayed.
      )}
    </div>
  );
};

export default Records;
