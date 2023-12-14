const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcrypt');
const User = require('./components/User');
const cors = require('cors');//cors import
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Registration Endpoint
app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password
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

app.post('/records', async (req, res) => {
  try {
    const newRecord = new Record(req.body);
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

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
