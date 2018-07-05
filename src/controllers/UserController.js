/*
* User controller
*
* @author Daria <lo.pennequin@gmail.com>
*/

'use strict';

const path      = require('path');
const bcrypt    = require('bcrypt');
const models    = require(path.join(__dirname, '../models'));
const { validationResult } = require('express-validator/check');


class UserController{
    static async register(req){
        const errors = validationResult(req);

        if ( !errors.isEmpty() ) {
            return { status: 422, data : { errors : errors.array()} };
        }

        const post = Object.assign(req.body, { password : await bcrypt.hash(req.body.password, 10) });
        await models.user.User.forge(post).save();
        return{
            status: 201
        };
    }

    static async getSelf(id){
        let user = await models.user.User
            .where('id', id)
            .fetch({withRelated: ['sentMessages.target', 'recievedMessages.sender']});
        let friendshipRequests = models.friendship.Friendship
            .where({'sendee_id' : id, 'friendship_status_id' : 1})
            .fetchAll({withRelated: ['sender', 'sendee']});

        user = (await user).toJSON();
        friendshipRequests = (await friendshipRequests).toJSON();

        let data = Object.assign(user, { friendshipRequests });
        return { data };
    }

    static async getProfile(id){
        let user = (
            await models.user.User.where('id', id)
                .fetch({withRelated: ['publications.comments.author']})
        ).toJSON();

        return { data: user };
    }
}

module.exports = UserController;
