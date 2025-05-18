var express = require('express');
var router = express.Router();
const v = require('../app/middleware/validation');

const user = require('./user');
const information = require('./information');
const transaction = require('./transaction');

router.use('/user', user);
router.use('/information', information);
router.use('/transaction', v.api, transaction);

module.exports = router;