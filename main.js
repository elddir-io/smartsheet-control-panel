const client = require('smartsheet');
const express = require('express');
require('dotenv').config();
const app = express();

const story = require('./routes/story');
const { sheet } = require('smartsheet/lib/utils/constants');
// const epic = require('./epic')

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


const smartsheet = client.createClient({
    accessToken: process.env.ACCESS_TOKEN,
    logLevel: "info",
});


const options = {
    id: process.env.SHEET_ID, // Id of Sheet <testing sheet>    
};



//columnId: 2556196883326852 // project name
// {columnId: 2556196883326852}
// var array = [1, 2, 3, 4, 5];
 
// array.forEach(function (value, index) {
//     console.log(`Element ${value} is found at index ${index}`);
// });


// Get sheet
const projectList = {}
smartsheet.sheets.getSheet(options)
    .then(function(sheetInfo) {
        const projectName = sheetInfo.columns.find((c) => c.title === "Project Name")
        const projectColumnID = projectName.id
        const sheetRows = sheetInfo.rows
        
        sheetRows.forEach(function(value) {
            let rowData = value.cells
            
            console.log(rowData)
        });

    //    console.log(projectList)
        
        
    })
    .catch(function(error) {
        console.log(error);
    }); // close get sheet


    
    

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// create new rows in Smartsheet
app.post('/story', story);
// app.post('/epic', epic);


// get projects
// app.get('/', (req, res) => {});




app.listen(3000, (req, res) => {
    console.log('server listening on port 3000 -- http://localhost:3000/')
});   

// console.log(date.getDue());