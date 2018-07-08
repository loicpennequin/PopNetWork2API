/*
* User controller
*
* @author Daria <lo.pennequin@gmail.com>
*/

'use strict';

const path                  = require('path');
const bcrypt                = require('bcrypt');
const models                = require(path.join(__dirname, '../models'));
const { validationResult }  = require('express-validator/check');
const constants             = require(path.join(__dirname, '../../config/constants.js'));

class UserController{
    static async getFriends(id){
        return (await models.friendship.Friendship
            .query(qb => {
                qb.where('sendee_id', id)
                    .orWhere('sender_id', id)
                    .andWhere('friendship_status_id', 2);
            })
            .fetchAll({withRelated: ['sender', 'sendee']}))
            .toJSON()
            .map(friend => {
                return friend.sender_id === id
                    ? friend.sendee
                    : friend.sender;
            });
    }

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
        let friends = await UserController.getFriends(id);

        user = (await user).toJSON();
        friendshipRequests = (await friendshipRequests).toJSON();

        let data = Object.assign(user, { friendshipRequests, friends });
        return { data };
    }

    static async getPaginated(req){
        let users = (await models.user.User
            .query(qb => qb.where('username', 'LIKE', `%${req.query.like}%`))
            .fetchPage({
                limit: req.query.limit ? req.query.limit : constants.USERS.ITEMS_PER_SEARCH,
                offset: req.query.offset ? req.query.offset : 0
            })).toJSON();
        return {
            data : {
                users,
                allFetched : users.length <= 0
            }
        };
    }

    static async getProfile(id){
        let user = (
            await models.user.User.where('id', id)
                .fetch({
                    withRelated: [
                        'publications.author', 'publications.comments.author',
                        {'publications' : qb =>
                            qb.orderBy('created_at', 'desc')
                                .limit(constants.FEEDS.INITIAL_AMOUNT)
                        }
                    ]
                })
        ).toJSON();
        user.friends = await UserController.getFriends(id);


        return { data: user };
    }
}

module.exports = UserController;
