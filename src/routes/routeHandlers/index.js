/**
* Registers all route handlers.
*
* @author Daria <lo.pennequin@gmail.com>
*/

'use strict';

const path = require('path');

module.exports = {
    auth : require(path.join(__dirname, 'AuthRoutes.js')),
    user : require(path.join(__dirname, 'UserRoutes.js')),
    publication : require(path.join(__dirname, 'PublicationRoutes.js'))
};
