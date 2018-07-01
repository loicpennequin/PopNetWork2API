'use strict';

const path      = require('path');
const router    = require('express').Router();
const handlers  = require(path.join(__dirname, '../routeHandlers'));

router.get('/testprivate', handlers.user.test);

module.exports = router;
