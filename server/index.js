// server/index.js
const express = require('express');//express import
const mongoose = require('mongoose');//mongoose improt
const cors = require('cors');//cors import
const recordRouter = require('./routes/Records');//gathered from routes folder.

const app = express();//express.
const port = process.env.PORT || 4000;//port 4000 chosen on express

app.use(cors());//cors will allow me to access the records.js file.
app.use(express.json());
app.use('/Records', recordRouter);

mongoose.connect('mongodb://localhost:27017/guinness_records', {
    useNewUrlParser: true,
    useUnifiedTopology: true,//connects to my app called guiness_records
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);//will display in console if the app is running correctly on my chosen port: (4000)
});
