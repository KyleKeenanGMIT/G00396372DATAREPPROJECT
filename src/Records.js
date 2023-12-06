import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Records = () => {
    const [recordDetails, setRecordDetails] = useState(null);

    useEffect(() => {
        const fetchRecords = async () => {
            const options = {
                method: 'GET',
                url: 'https://guinness-world-records-api.p.rapidapi.com/guinness/recordDetails',
                params: {
                    href: '/world-records/82145-most-consecutive-vertical-push-ups',
                },
                headers: {
                    'X-RapidAPI-Key': 'e7527f1016msh1fa96b68c145249p11b6fbjsna76b36e1067d',
                    'X-RapidAPI-Host': 'guinness-world-records-api.p.rapidapi.com',
                },
            };

            try {
                const response = await axios.request(options);
                console.log('API Response:', response);
                setRecordDetails(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchRecords();
    }, []);

    return (
        <div>
            <h1>Guinness World Records Data</h1>
            {recordDetails ? (
                <div>
                    <h2>{recordDetails.titlesInfo.Who}</h2>
                    <p>{recordDetails.titlesInfo.What}</p>
                    <p>{recordDetails.titlesInfo.Where}</p>
                    <p>{recordDetails.titlesInfo.When}</p>
                    <p>{recordDetails.body.join('\n')}</p>
                    {/* displays the title and description of the records */}
                </div>
            ) : (
                <p>Loading Records:</p>
            )}
        </div>
    );
};

export default Records;
