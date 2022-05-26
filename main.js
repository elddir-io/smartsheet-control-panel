const client = require('smartsheet');
const express = require('express');
const ejs = require('ejs')
require('dotenv').config();
const app = express();



const getAnalystProjects = require('./routes/analystProjects');
const story = require('./routes/story');
// const epic = require('./routes/epic')


app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


  

app.get('/', (req, res) => {
    res.render("index", 
    {
        mickeysProjects: mickey, 
        donaldsProjects: donald,
        goofysProjcts: goofy
    });
});

// create new story in Smartsheet
app.post('/story', story);
// app.post('/epic', epic);




app.listen(3000, (req, res) => {
    console.log('server listening on port 3000 -- http://localhost:3000/')
});   


// app.use((req, res) => {})