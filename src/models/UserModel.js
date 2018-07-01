/**
* The User model.
* handles CRUD methods with the users table.
*
* @author Daria <lo.pennequin@gmail.com>
*/

'use strict';

const path      = require('path');
const Bookshelf = require(path.join(__dirname, '../services/bookshelf.js'));

require('./PublicationModel.js');
require('./FriendshipModel.js');

class User extends Bookshelf.Model {
    get tableName() { return 'pnw2_users'; }

    get hasTimestamps() { return false; }

    publications(){
        return this.hasMany('Publication', 'user_id');
    }

    friends(){
        return this.hasMany('Friendship').query('where', 'friendship_status_id', '2');
    }

}

module.exports = {
    User : Bookshelf.model('User', User)
};
