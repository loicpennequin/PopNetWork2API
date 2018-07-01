/**
* Define all REST routes.
*
* @author Daria <lo.pennequin@gmail.com>
*/

'use strict';

const path            = require('path');

const logRequest      = require(path.join(__dirname, '../middlewares/logRequest.js'));
const ctrl            = require(path.join(__dirname, '../controllers'));

const publicRouter    = require(path.join(__dirname, 'routers/publicRouter.js'));
const privateRouter   = require(path.join(__dirname, 'routers/privateRouter.js'));

module.exports = app => {
    app.use('/api', logRequest);
    app.use('/api', publicRouter);
    app.use('/api', ctrl.auth.ensureAuth, ctrl.auth.refreshToken, privateRouter);
};
