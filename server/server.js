const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// CORS handling
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Enabling express to parse JSON data
app.use(express.json());

// Array to store added records
let records = [];

// Route to send a greeting (example home route)
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// POST route to add a record
app.post('/records', (req, res) => {
  const newRecord = req.body; // Get new record data from request body
  records.push(newRecord); // Add new record to array
  res.status(201).send('Record has been added to database!');
});

app.get('/records', (req, res) => {
  res.json(records); // server is gathering added records.
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
