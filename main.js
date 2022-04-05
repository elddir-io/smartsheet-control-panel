const express = require('express');
require('dotenv').config();
const app = express();



const story = require('./story')
// const controller = require('./controller')



app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.use('/story', story);
// app.use('/epic', epic);




app.listen(3000, (req, res) => {
    console.log('server listening on port 3000 -- http://localhost:3000/')
});   

// console.log(date.getDue());