const client = require('smartsheet');
const express = require('express');
const ejs = require('ejs')
require('dotenv').config();
const app = express();

// const { sheet } = require('smartsheet/lib/utils/constants');

// const getAnalystProjects = require('./routes/analystProjects');
const story = require('./routes/story');
// const epic = require('./routes/epic')

app.set("view engine", "ejs");


app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


// get analyst projects
// app.use(getAnalystProjects)

/************************************************************************ */

const smartsheet = client.createClient({
    accessToken: process.env.ACCESS_TOKEN,
    logLevel: "info",
});


const options = {
    id: process.env.SHEET_ID, // Id of Sheet <testing sheet>
};

const team = {
    mickey: {
        projects: []
    },
    donald: {
        projects: []
    },
    goofy: {
        projects: []
    }
};


function getAnalystProjects() {
    // Get sheet, push data to array 
    smartsheet.sheets.getSheet(options)
    .then(function(sheetInfo) {
        const sheetRows = sheetInfo.rows        
        const projectColumnID = sheetInfo.columns.find((co) => co.title === "Project Name").id
        const assignedToID = sheetInfo.columns.find((co) => co.title === "Assigned to").id
               
        // get projects for a given analyst
        sheetRows.forEach(function(value) {            
            const cellData = value.cells
            const projectName = cellData.find((ce) => ce.columnId === projectColumnID).displayValue
            const analystName = cellData.find((ce) => ce.columnId === assignedToID).displayValue
            if(analystName === "Mickey") {team.mickey.projects.push(projectName)}  
            if(analystName === "Donald") {team.donald.projects.push(projectName)}  
            if(analystName === "Goofy") {team.goofy.projects.push(projectName)}       
        }); 
    })
    .catch(function(error) {
        console.log(error)
    }); // close get sheet
};
getAnalystProjects()

const mickey = team.mickey.projects
const donald = team.donald.projects
const goofy = team.goofy.projects

/************************************************************************ */
   
// app.use((req, res) => {})

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

