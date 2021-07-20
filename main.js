const express = require('express');


const app = express();
    app.get('/', () => {
        res.send('Server is up and running');
    });

app.listen(3000, (req, res) => {
    console.log('server listening on port 3000')
});    