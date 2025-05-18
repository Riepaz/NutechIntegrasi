const express = require('express');
const router = express.Router();
const InfoController = require('../app/controller/information');

const v = require('../app/middleware/validation');

router.get('/banner', function(req, res, next) {
    const controller = new InfoController(req, res);
    controller.banner();
});

router.get('/services', v.api, function(req, res, next) {
    const controller = new InfoController(req, res);
    controller.services();
});

module.exports = router;