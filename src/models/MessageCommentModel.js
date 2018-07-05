/**
* The User model.
* handles CRUD methods with the users table.
*
* @author Daria <lo.pennequin@gmail.com>
*/

'use strict';

const path      = require('path');
const Bookshelf = require(path.join(__dirname, '../services/bookshelf.js'));

require('./UserModel.js');

class MessageComment extends Bookshelf.Model {
    get tableName() { return 'pnw2_comment_comments'; }

    get hasTimestamps() { return true; }

    author(){
        return this.belongsTo('User', 'user_id');
    }

    origin(){
        return this.belongsTo('MessageComment', 'comment_id');
    }

    comments(){
        return this.hasMany('MessageComment', 'comment_id');
    }
}


module.exports = {
    MessageComment : Bookshelf.model('MessageComment', MessageComment)
};
