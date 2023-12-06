//record file setup. mongoose imported.
const mongoose = require('mongoose');

//records - adding a new one with title category and description of the record.
const recordSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
});
//records are stored in the recordSchema variable.
const Record = mongoose.model('Record', recordSchema);
//export record.js
module.exports = Record;
