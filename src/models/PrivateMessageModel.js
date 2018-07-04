/**
* The User model.
* handles CRUD methods with the users table.
*
* @author Daria <lo.pennequin@gmail.com>
*/

'use strict';

const path      = require('path');
const Bookshelf = require(path.join(__dirname, '../services/bookshelf.js'));


class PrivateMessage extends Bookshelf.Model {
    get tableName() { return 'pnw2_private_messages'; }

    get hasTimestamps() { return true; }

    sender(){
        return this.belongsTo('User', 'sender_id');
    }

    target(){
        return this.belongsTo('User', 'target_id');
    }
}

module.exports = {
    Message : Bookshelf.model('PrivateMessage', PrivateMessage)
};
