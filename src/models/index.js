/**
* Registers all models.
*
* @author Daria <lo.pennequin@gmail.com>
*/

'use strict';

const path = require('path');

module.exports = {
    user : require(path.join(__dirname, 'UserModel.js')),
    publication : require(path.join(__dirname, 'PublicationModel.js')),
    publicationComment : require(path.join(__dirname, 'PublicationCommentModel.js')),
    messageComment : require(path.join(__dirname, 'MessageCommentModel.js')),
    friendship : require(path.join(__dirname, 'FriendshipModel.js')),
    privateMessage : require(path.join(__dirname, 'PrivateMessageModel.js')),
};
