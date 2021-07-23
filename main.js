const express = require('express');
const client = require('smartsheet');
require('dotenv').config();
const app = express();

app.use(express.urlencoded({extended: true}));

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

app.post('/', (req, res) => {

    let project = req.body.project;
    let scope = req.body.scope;
    let type = req.body.type;
    let priority = req.body.priority;

        // Get sheet
    smartsheet.sheets
    .getSheet(options)
    .then(function (sheetInfo) {
    let projName = sheetInfo.columns.find((c) => c.title === "Project Name");
    let desScope = sheetInfo.columns.find((c) => c.title === "Project Description / Scope");
    let issueType = sheetInfo.columns.find((c) => c.title === "Issue Type*");
    let priOrity = sheetInfo.columns.find((c) => c.title === "Priority*");

    let projNameId = projName.id;
    let desScopeId = desScope.id;
    let issueTypeId = issueType.id;
    let priorityId = priOrity.id;

    // Specify rows
    var rows = [
        {
        toTop: true,
        cells: [
            {
            columnId: projNameId,
            value: project,
            },
            {
            columnId: desScopeId,
            value: scope,
            },
            {
            columnId: issueTypeId,
            value: type,
            },
            {
            columnId: priorityId,
            value: priority,
            },
        ],
        },
    ];

    // Set options
    var options = {
        sheetId: sheetInfo.id,
        body: rows,
    };
    smartsheet.sheets
        .addRows(options)
        .then(function (newRows) {
        console.log(newRows);
        })
        .catch(function (error) {
        console.log(error);
        });
    })

    .catch(function (error) {
    console.log(error);
    });

    res.redirect('/');
});





app.listen(3000, (req, res) => {
    console.log('server listening on port 3000')
});   

