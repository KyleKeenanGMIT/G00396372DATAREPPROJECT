//improting usestate and useeffect from react
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Records = () => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        // Fetching records.js from express server
        fetch('http://localhost:4000/records')
            .then((response) => response.json())
            .then((data) => setRecords(data));
    }, []);

    return (
        <div>{/*title and main div*/}
            <h2>Guinness World Records</h2>
            <ul>
                {records.map((record) => (//map added with title, category and id of record.
                    <li key={record._id}>
                        {record.title} - {record.category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Records;//export.
