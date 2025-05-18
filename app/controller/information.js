'use strict';
const controller = require('./controller.js');
const connection = require('../../helper/connection.js');

module.exports = class InformationController extends controller {
    constructor(req, res) {
        super(req, res);
    }

    async banner() {
        try {
            var page = 1;
            var limit = 10;

            if(this.req.query.page){
                page = this.req.query.page;
            }

            if(this.req.query.limit){
                limit = this.req.query.limit;
            }

            const selectStmt = `
                SELECT * FROM banners LIMIT ${limit} OFFSET ${page - 1}
            `;

            const [row, field] = await connection.promise().execute(selectStmt);
            
            return this.res.status(200).send({
                status: 0,
                message: "Sukses",
                data: row
            });
        } catch (error) {
            this.res.status(500).send({
                status: 500,
                message: "Internal Server Error",
                data: null
            });
        }
    }

    async services() {
        try{
            var page = 1;
            var limit = 10;

            if(this.req.query.page){
                page = this.req.query.page;
            }

            if(this.req.query.limit){
                limit = this.req.query.limit;
            }

            const selectStmt = `
                SELECT * FROM services LIMIT ${limit} OFFSET ${page - 1}
            `;

            const [row, field] = await connection.promise().execute(selectStmt);
            
            return this.res.status(200).send({
                status: 0,
                message: "Sukses",
                data: row
            });
        } catch (error) {
            this.res.status(500).send({
                status: 500,
                message: "Internal Server Error",
                data: null
            });
        }
    }
}