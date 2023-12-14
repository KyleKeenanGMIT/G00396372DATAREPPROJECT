const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const mongoose = require('mongoose');//mongodb import cluster

mongoose.connect('mongodb+srv://admin:admin@cluster0.hz2nopg.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })//connection string
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

app.post('/records', async (req, res) => {
  try {
    const newRecord = new Record({
      title: req.body.title,
      description: req.body.description,
     
    });

    await newRecord.save();
    res.status(201).send('Record added successfully');
  } catch (error) {
    res.status(500).send('Error saving record');
  }
});


app.get('/records', async (req, res) => {
  try {
    const records = await Record.find();
    res.json(records);
  } catch (error) {
    res.status(500).send('Error fetching records');
  }
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
