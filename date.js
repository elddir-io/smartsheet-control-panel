module.exports = getToday;
function getToday() {
    let today = new Date().toISOString();
    return today;
}

