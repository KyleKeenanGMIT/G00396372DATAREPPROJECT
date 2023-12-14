//server
const express = require('express');
const app = express();//express import
const PORT = process.env.PORT || 5000;//setting port

// Enabling express to parse JSON data
app.use(express.json());

// array to store added records
let records = [];

app.get('/', (req, res) => {
  res.send('Hello World!');//will be displayed when going to localhost:5000 
});

// POST route to add a record
app.post('/records', (req, res) => {
  const newRecord = req.body; // Get new record data from request body
  records.push(newRecord); // Add new record to array
  res.status(201).send('Record has been added to database!');
});

// cors handling
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);//responds with the console.log server is running on port 5000.
});
