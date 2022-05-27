
const client = require('smartsheet');
const analysts = require('../models/analyst')

const smartsheet = client.createClient({
    accessToken: process.env.ACCESS_TOKEN,
    logLevel: "info",
});


const options = {
    id: process.env.SHEET_ID, // Id of Sheet <testing sheet>
};


    // Get sheet, push data to array 
exports.getAnalystProjects = smartsheet.sheets.getSheet(options)
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
              
    }); 
})
.catch(function(error) {
    console.log(error)
});
    



// module.exports = team.mickey.projects
// module.exports = team.donald.projects
// module.exports = team.goofy.projects

// module.exports = mickeyPj
// module.exports = donaldPj
// module.exports = goofyPj

 
