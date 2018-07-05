/**
 * Server entry point.
 *
 * @author Daria <lo.pennequin@gmail.com>
 */

'use strict';
//Developpement environnement variables
require('dotenv').config({
    path: 'config/.env'
});
//Dependancies
const path          = require('path');
const express       = require('express');
const passport      = require('passport');
const bodyParser    = require('body-parser');

//Express config
const app    = express();
const http   = require('http').Server(app);

//Passport config
require(path.join(__dirname, 'src/middlewares/passport.js'))();

//CORS config
app.use(require(path.join(__dirname, 'src/middlewares/allowCors.js')));

//App config
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

//routes config
require(path.join(__dirname, 'src/routes'))(app);
app.get('/', (req, res) => {
    res.redirect(require('./config/constants.js').WWW_URL);
});

app.use((err, req, res) => {
    if (err.name === 'UnauthorizedError') {
        res.sendStatus(401);
    }
});

module.exports = http;
