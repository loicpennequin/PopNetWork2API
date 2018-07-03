/**
 * Handles controller execution and responds to user.
 * @param promise controller promise. I.e. PostController.fetch
 * @param params a function (req, res, next), all of which are optional
 * that maps our desired controller parameters. I.e. (req) => [req.params.username, ...].
 *
 * @author Daria <lo.pennequin@gmail.com>
 */

'use strict';
const path   = require('path');
const logger =  require(path.join(__dirname, '../middlewares/winston.js'));

module.exports = (promise, params) => async (req, res, next) => {
    const promiseParams = params ? params(req, res, next) : [];
    try {
        const result = await promise(...promiseParams);
        return res.status(result.status || 200)
            .set(result.headers ? result.headers : {})
            .json(Object.assign({}, { token : req.token } , result.data || { message: 'OK' }));
    } catch (err) {
        logger.error(err.message);
        return res.status(err.status || 500).json({ error: err.message });
    }
};
