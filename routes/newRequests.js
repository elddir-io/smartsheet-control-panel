const client = require('smartsheet');

const smartsheet = client.createClient({
    accessToken: process.env.ACCESS_TOKEN,
    logLevel: "info",
});


const options = {
    id: process.env.SHEET_ID, // Id of Sheet <testing sheet>
};


// Get sheet
smartsheet.sheets.getSheet(options)
    .then(function(sheetInfo) {
        // const projName = sheetInfo.columns.find((c) => c.title === "Project Name");
        console.log(sheetInfo);
    })
    .catch(function(error) {
        console.log(error);
    });