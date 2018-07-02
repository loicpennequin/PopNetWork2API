/**
* The User model.
* handles CRUD methods with the users table.
*
* @author Daria <lo.pennequin@gmail.com>
*/

'use strict';

const path      = require('path');
const Bookshelf = require(path.join(__dirname, '../services/bookshelf.js'));


class User extends Bookshelf.Model {
    get tableName() { return 'pnw2_users'; }

    get hasTimestamps() { return true; }
}

module.exports = {
    User : Bookshelf.model('User', User)
};
