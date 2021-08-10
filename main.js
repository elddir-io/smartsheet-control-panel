const express = require('express');
const client = require('smartsheet');
require('dotenv').config();
const date = require(__dirname + "/date.js");
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

    const project = req.body.project;
    const scope = req.body.scope;
    const type = req.body.type;
    const priority = req.body.priority;
    const team = req.body.team;
    const assigned = req.body.assigned;
    const notes = req.body.notes
    const dueDate = req.body.dueDate;
    // const email = req.body.email;
    const name = req.body.name;

    function due () {
        let d = new Date(dueDate).toISOString();
        return d;
    }
    

        // Get sheet
    smartsheet.sheets
    .getSheet(options)
    .then(function (sheetInfo) {
    const projName = sheetInfo.columns.find((c) => c.title === "Project Name");
    const desScope = sheetInfo.columns.find((c) => c.title === "Project Description / Scope");
    const issueType = sheetInfo.columns.find((c) => c.title === "Issue Type*");
    const priOrity = sheetInfo.columns.find((c) => c.title === "Priority*");
    const teams = sheetInfo.columns.find((c) => c.title === "Team");
    const assign = sheetInfo.columns.find((c) => c.title === "Assigned to*");
    const requested = sheetInfo.columns.find((c) => c.title === "Request Date");
    const eta = sheetInfo.columns.find((c) => c.title === "ETA");
    const note = sheetInfo.columns.find((c) => c.title === "Notes");
    // const eMail = sheetInfo.columns.find((c) => c.title === "Requestor Email");
    const rname = sheetInfo.columns.find((c) => c.title === "Requestor Name");

    const projNameId = projName.id;
    const desScopeId = desScope.id;
    const issueTypeId = issueType.id;
    const priorityId = priOrity.id;
    const teamsId = teams.id;
    const assignId = assign.id;
    const requestedId = requested.id;
    const etaId = eta.id;
    const noteId = note.id;
    // const emailId = eMail.id;
    const nameId = rname.id;

    // Specify rows
    const rows = [
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
            {
            columnId: teamsId,
            value: team,
            },
            {
            columnId: assignId,
            value: assigned,
            },
            {
            columnId: requestedId,
            value: date.getToday(),
            },
            {
            columnId: etaId,
            value: due(),
            },
            {
            columnId: noteId,
            value: notes,
            },
            // {
            // columnId: emailId,
            // value: email,
            // },
            {
            columnId: nameId,
            value: name,
            },
        ],
        },
    ];

    // Set options
    const options = {
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

// console.log(date.getDue());