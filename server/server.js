const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcrypt');
const User = require('./components/User');
const cors = require('cors');//cors import
const PORT = process.env.PORT || 5000;//port 5000 is the port the server will run on.

app.use(cors());//cors used to prevent errors when routing.
app.use(express.json());

// Registration Endpoint
app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hashing the password for encryption on mongo db database
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });
    const newUser = await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering new user' });
  }
});

// Login Endpoint
app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      // Authentication successful
      res.json({ message: 'Logged in successfully' });
      
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Mongoose Schema and Model
const recordSchema = new mongoose.Schema({
  title: String,
  description: String,
  
});

const Record = mongoose.model('Record', recordSchema);

// MongoDB Connection
mongoose.connect('mongodb+srv://admin:admin@cluster0.hz2nopg.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// CORS Handling
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Enabling express to parse JSON data
app.use(express.json());

// Route Handlers
app.get('/', (req, res) => {
  res.send('Hello World!');
});
//post method to send records to server
app.post('/records', async (req, res) => {
  try {
    const newRecord = new Record(req.body);
    await newRecord.save();
    res.status(201).send('Record added successfully');
  } catch (error) {
    res.status(500).send('Error saving record');
  }
});
//get method to gather records from local
app.get('/records', async (req, res) => {
  try {
    const records = await Record.find();
    res.json(records);
  } catch (error) {
    res.status(500).send('Error fetching records');
  }
});
//gathering record with its attached id assigned by MONGO DB Database
app.get('/records/:id', async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) res.status(404).send('Record not found');
    else res.json(record);
  } catch (error) {
    res.status(500).send('Error fetching record');
  }
});
//displaying gathered records for editing.
app.put('/records/:id', async (req, res) => {
  try {
    const record = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!record) res.status(404).send('Record not found');
    else res.json(record);
  } catch (error) {
    res.status(500).send('Error updating record');
  }
});
//option to delete gathered records from database
app.delete('/records/:id', async (req, res) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).send('Record not in DB');
    }
    res.status(200).send('Record deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting record');
  }
});


// Start up the Server on port 5000.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
