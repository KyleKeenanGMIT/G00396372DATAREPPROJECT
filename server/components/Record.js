const mongoose = require('mongoose');

// Define a schema
const recordSchema = new mongoose.Schema({
  title: String,
  description: String,
});

// Create a model
const Record = mongoose.model('Record', recordSchema);

module.exports = Record; // Exporting record.js