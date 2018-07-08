/*
* User controller
*
* @author Daria <lo.pennequin@gmail.com>
*/

'use strict';

const path      = require('path');
const models    = require(path.join(__dirname, '../models'));
const constants = require(path.join(__dirname, '../../config/constants.js'));

class PublicationController{
    static async create(body){
        let publication = await models.publication.Publication
            .forge(body)
            .save();

        return {
            status: 201,
            data: {
                id : publication.id
            }
        };
    }

    static async getById(id){
        return {
            data : (await models.publication.Publication
                .where('id', id)
                .fetch({ withRelated : [
                    'author',
                    'comments.author'
                ]})).toJSON()
        };
    }

    static async getPaginated(req){
        return {
            data : (await models.publication.Publication
                .where(JSON.parse(req.query.where))
                .orderBy('created_at','DESC')
                .fetchPage({
                    limit: constants.FEEDS.ITEMS_PER_FETCH,
                    offset: req.query.offset,
                    withRelated : [
                        'author',
                        'comments.author'
                    ]
                })).toJSON()
        };
    }
}

module.exports = PublicationController;
