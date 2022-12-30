const express = require('express');
const cors = require('cors');


// Creating express app
const app = express();

// Allow cross origin reqests
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(express.json());

// Creating a GET route
app.get('/message', (req, res) => { //Endpoint message
    res.json({  message: "Hello from the server!" });
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });