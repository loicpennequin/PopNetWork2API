'use strict';

const path      = require('path');
const router    = require('express').Router();
const handlers  = require(path.join(__dirname, '../routeHandlers'));

router.get('/authenticated', handlers.auth.isAuthenticated);
router.get('/me', handlers.user.getSelf);

module.exports = router;
