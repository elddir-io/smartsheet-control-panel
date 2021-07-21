const express = require('express');
const client = require('smartsheet');
require('dotenv').config();
const app = express();

app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(3000, (req, res) => {
    console.log('server listening on port 3000')
});

// const smartsheet = client.createClient({
//     accessToken: process.env.ACCESS_TOKEN,
//     logLevel: "info",
//   });

//   var options = {
//     id: process.env.SHEET_ID, // Id of Sheet <testing sheet>
//   };

// // Get sheet
// smartsheet.sheets
//   .getSheet(options)
//   .then(function (sheetInfo) {
//     let myColumn = sheetInfo.columns.find((c) => c.title === "Project Name");
//     let myColumnId = myColumn.id;
//     // Specify rows
//     var rows = [
//       {
//         toTop: true,
//         cells: [
//           {
//             columnId: myColumnId,
//             value: "Table Project",
//           },
//         ],
//       },
//     ];

//     // Set options
//     var options = {
//       sheetId: sheetInfo.id,
//       body: rows,
//     };
//     smartsheet.sheets
//       .addRows(options)
//       .then(function (newRows) {
//         console.log(newRows);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   })
  
//   .catch(function (error) {
//     console.log(error);
//   });

    

