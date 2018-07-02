'use strict';

const path      = require('path');
const router    = require('express').Router();
const handlers  = require(path.join(__dirname, '../routeHandlers'));

router.get('/authenticated', handlers.auth.isAuthenticated);

module.exports = router;
