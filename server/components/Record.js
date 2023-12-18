const mongoose = require('mongoose');

// Defining the schmea
const recordSchema = new mongoose.Schema({
  title: String,
  description: String,
});//schema

// Creatuing a record model
const Record = mongoose.model('Record', recordSchema);

module.exports = Record; // Exporting record.js