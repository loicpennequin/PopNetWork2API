/**
* Routes related to the publications.
*
* @author Daria <lo.pennequin@gmail.com>
*/
'use strict';

const path            = require('path');
const ctrl            = require(path.join(__dirname, '../../controllers'));
const handler         = require(path.join(__dirname, '../../services/controllerHandler.js'));

module.exports.create = (req, res, next) => {
    handler(ctrl.publication.create, req => [req.body])(req, res, next);
};

module.exports.getById = (req, res, next) => {
    handler(ctrl.publication.getById, req => [req.params.id])(req, res, next);
};

module.exports.getPaginated = (req, res, next) => {
    handler(ctrl.publication.getPaginated, req => [req])(req, res, next);
};
