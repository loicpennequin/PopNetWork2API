/**
* Registers all models.
*
* @author Daria <lo.pennequin@gmail.com>
*/

'use strict';

const path = require('path');

module.exports = {
    user : require(path.join(__dirname, 'UserModel.js'))
};
