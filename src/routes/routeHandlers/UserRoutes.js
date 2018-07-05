/**
* Example file.
*
* @author Daria <lo.pennequin@gmail.com>
*/
'use strict';

const path            = require('path');
const ctrl            = require(path.join(__dirname, '../../controllers'));
const handler         = require(path.join(__dirname, '../../services/controllerHandler.js'));



module.exports.register = (req, res, next) => {
    handler(ctrl.user.register, req => [req])(req, res, next);
};

module.exports.getSelf = (req, res, next) => {
    handler(ctrl.user.getSelf, req => [req.user.id])(req, res, next);
}

module.exports.getProfile = (req, res, next) => {
    handler(ctrl.user.getProfile, req => [req.params.id])(req, res, next);
}
