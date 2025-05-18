'use strict';
require('dotenv').config();

module.exports = class Controller {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.headers = this.req.headers;
    }
}