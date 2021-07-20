const express = require('express');


const app = express();
    app.get('/', () => {
        res.sendFile(__dirname + "/index.html");
    });

app.listen(3000, (req, res) => {
    console.log('server listening on port 3000')
});    

