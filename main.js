const express = require('express');


const app = express();
    app.get('/', () => {
        res.send('Server is up and running');
    });