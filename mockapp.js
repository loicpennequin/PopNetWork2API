'use strict';

//Dependancies
const express       = require('express');

//Express config
const app    = express();
const http   = require('http').Server(app);

app.get('/test', (req, res) => {
    res.sendStatus(200);
});

module.exports = http;
