/**
* The Publication model.
* handles CRUD methods with the users table.
*
* @author Daria <lo.pennequin@gmail.com>
*/

'use strict';

const path      = require('path');
const Bookshelf = require(path.join(__dirname, '../services/bookshelf.js'));


class Friendship extends Bookshelf.Model {
    get tableName() { return 'pnw2_friendships_statuses'; }

    get hasTimestamps() { return true; }

    sender(){
        return this.belongsTo('User', 'sender_id');
    }

    sendee(){
        return this.belongsTo('User', 'sendee_id');
    }

    status(){
        return this.belongsTo('FriendshipStatus', 'friendship_status_id');
    }
}

class FriendshipStatus extends Bookshelf.Model {
    get tableName() { return 'pnw2_friendships_statuses'; }

    get hasTimestamps() { return false; }
}



module.exports = {
    Friendship : Bookshelf.model('Friendship', Friendship)
};
