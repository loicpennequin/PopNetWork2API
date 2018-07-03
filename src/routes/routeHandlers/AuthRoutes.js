/**
* Example file.
*
* @author Daria <lo.pennequin@gmail.com>
*/
'use strict';

const path            = require('path');
const ctrl            = require(path.join(__dirname, '../../controllers'));
const handler         = require(path.join(__dirname, '../../services/controllerHandler.js'));

module.exports.authenticate = (req, res, next) => {
    ctrl.auth.authenticate(req,res,next);
};

module.exports.isAuthenticated = (req, res, next) => {
    handler(() => ({
        data: { error : false }
    }))(req, res, next);
};
