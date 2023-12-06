//server
const express = require('express');
const app = express();//express import
const PORT = process.env.PORT || 5000;//setting port

app.get('/', (req, res) => {
  res.send('Hello World!');//will be displayed when going to localhost:5000 
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);//responds with the console.log server is running on port 5000.
});
