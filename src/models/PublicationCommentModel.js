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
require('./PublicationModel.js');
require('./MessageCommentModel.js');

class PublicationComment extends Bookshelf.Model {
    get tableName() { return 'pnw2_publication_comments'; }

    get hasTimestamps() { return true; }

    author(){
        return this.belongsTo('User', 'user_id');
    }

    origin(){
        return this.belongsTo('Publication', 'publication_id');
    }

    comments(){
        return this.hasMany('MessageComment', 'comment_id')
    }
}

module.exports = {
    PublicationComment : Bookshelf.model('PublicationComment', PublicationComment)
};
