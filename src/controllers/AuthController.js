/**
* Example controller
*
* @author Daria <lo.pennequin@gmail.com>
*/

'use strict';

const passport  = require('passport');
const jwt       = require('jsonwebtoken');

const generateToken = id =>
    jwt.sign(
        {data: { id }, timestamp : new Date()},
        process.env.TOKEN_SECRET,
        {expiresIn: 3600}
    );

class AuthController{
    static async authenticate(req, res, next){
        await passport.authenticate('local', {session: false}, (err, user) => {
            if (err) {
                throw err;
            }
            if (!user){
                throw new Error('user not found');
            }
            const token = this.generateToken(user);
            res.json({ token, userId : user });
        })(req, res, next);
    }

    static generateToken(user){
        return generateToken(user);
    }

    static refreshToken(req, res, next){
        req.token = generateToken(req.user.id);
        next();
    }

    static ensureAuth(req, res, next){
        passport.authenticate('jwt', {session: false})(req, res, next);
    }
}

module.exports = AuthController;
