'use strict';

const path          = require('path');
const router        = require('express').Router();
const handlers      = require(path.join(__dirname, '../routeHandlers'));
const validators    = require(path.join(__dirname, '../../services/validators.js'));

router.post('/register', validators.register, handlers.user.register);
router.post('/login', handlers.auth.authenticate);
router.get('/test', (req, res) => {
    res.json({message:'Soon...'});
});

module.exports = router;
