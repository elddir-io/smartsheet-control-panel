
const client = require('smartsheet');

const smartsheet = client.createClient({
    accessToken: process.env.ACCESS_TOKEN,
    logLevel: "info",
});


const options = {
    id: process.env.SHEET_ID, // Id of Sheet <testing sheet>
};

// const team = {
//     mickey: {
//         projects: []
//     },
//     donald: {
//         projects: []
//     },
//     goofy: {
//         projects: []
//     }
// }

mickey = []
donald = []
goofy = []


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
        if(analystName === "Mickey") {mickey.push(projectName)}  
        if(analystName === "Donald") {donald.push(projectName)}  
        if(analystName === "Goofy") {goofy.push(projectName)}       
    }); 
})
.catch(function(error) {
    console.log(error)
});
    
module.exports = mickey
module.exports = donald
module.exports = goofy


// const mickey = team.mickey.projects
// const donald = team.donald.projects
// const goofy = team.goofy.projects

 
