'use strict';

const path      = require('path');
const router    = require('express').Router();
const handlers  = require(path.join(__dirname, '../routeHandlers'));

router.get('/authenticated', handlers.auth.isAuthenticated);
router.get('/me', handlers.user.getSelf);
router.get('/users', handlers.user.getPaginated);
router.get('/users/profile/:id', handlers.user.getProfile);
router.post('/publications', handlers.publication.create);
router.get('/publications/:id', handlers.publication.getById);
router.get('/publications', handlers.publication.getPaginated);

module.exports = router;
