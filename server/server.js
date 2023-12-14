const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const mongoose = require('mongoose');//mongodb import cluster

mongoose.connect('mongodb+srv://admin:<admin>@cluster0.hz2nopg.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })//connection string
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));//error if unable to connect


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
