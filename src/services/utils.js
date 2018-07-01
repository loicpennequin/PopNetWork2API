'use strict';

const slugify = require('slugify');

module.exports.slugifyObj = (obj, prop) => Object.assign(obj, { slug : slugify(obj[prop], '_') });
