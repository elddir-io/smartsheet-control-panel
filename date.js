exports.getToday = function() {
    let today = new Date().toISOString();
    return today;
};

// exports.getDueDate = function() {
//     document.getElementById('dueDate').addEventListener('change', function() {
//         let input = this.value;
//         let due = input.toISOString();
//         return due;
//     })
    
    
// };

// console.log(getDue())
