const express = require('express');
const client = require('smartsheet');
require('dotenv').config();

const app = express();

const smartsheet = client.createClient({
    accessToken: process.env.ACCESS_TOKEN,
    logLevel: "info",
  });

  var options = {
    id: process.env.SHEET_ID, // Id of Sheet <testing sheet>
  };



app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(3000, (req, res) => {
    console.log('server listening on port 3000')
});    

