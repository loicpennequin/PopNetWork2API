/**
* The Publication model.
* handles CRUD methods with the users table.
*
* @author Daria <lo.pennequin@gmail.com>
*/

'use strict';

const path      = require('path');
const Bookshelf = require(path.join(__dirname, '../services/bookshelf.js'));

class Publication extends Bookshelf.Model {
    get tableName() { return 'pnw2_publications'; }

    get hasTimestamps() { return true; }
}

module.exports = {
    Publication : Bookshelf.model('Publication', Publication)
};
