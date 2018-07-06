/*
* User controller
*
* @author Daria <lo.pennequin@gmail.com>
*/

'use strict';

const path      = require('path');
const models    = require(path.join(__dirname, '../models'));

class PublicationController{
    static async create(body){
        await models.publication.Publication
            .forge(body)
            .save();

        return { status: 201 };
    }
}

module.exports = PublicationController;
