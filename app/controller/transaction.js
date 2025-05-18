'use strict';
const controller = require('./controller.js');
const connection = require('../../helper/connection.js');
const uuid = require('uuid');

module.exports = class TransactionController extends controller {
    constructor(req, res) {
        super(req, res);
    }

    async balance() {
        try {
            const user = this.req.session.user;
            const selectStmt = `
                SELECT balance FROM accounts WHERE user_id = '${user.id}'
            `;

            const balance = (await connection.promise().execute(selectStmt))[0][0];

            if(balance) {
                return this.res.status(200).send({
                    status: 0,
                    message: "Get Balance Berhasil",
                    data: balance
                });
            } else {
                return this.res.status(200).send({
                    status: 108,
                    message: "Rekening tidak ditemukan",
                    data: null
                });
            }
            
        } catch (error) {
            this.res.status(500).send({
                status: 500,
                message: "Internal Server Error",
                data: null
            });
        }
    }

    async topup() {
        try{
            const amount = this.req.body.top_up_amount;

            if (amount <= 0 || typeof amount != "string" 
                || (isNaN(amount) && isNaN(parseFloat(amount)))) {
                return this.res.status(400).send({
                    status: 102,
                    message: "Nominal tidak valid, Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
                    data: null
                });
            }

            await connection.promise().beginTransaction();
            
            const user = this.req.session.user;
            const account = (await connection.promise().execute(`
                SELECT balance FROM accounts WHERE user_id = '${user.id}'
            `))[0][0];

            await connection.promise().execute(`
                UPDATE accounts SET balance = ${ (parseInt(account.balance) + parseInt(amount)) } WHERE user_id = '${user.id}'
            `);

            await connection.promise().execute(`
                INSERT INTO transactions (id, user_id, invoice_number, service_code, transaction_type, total_amount, description) 
                VALUES(?, ?, ?, ?, ?, ?, ?)
            `, [
                uuid.v4(),
                user.id,
                await this.invoiceGenerator(),
                "",
                "TOPUP",
                amount,
                "Topup Saldo"
            ]);
            
            await connection.promise().commit();

            return this.res.status(200).send({
                status: 0,
                message: "Top Up Balance berhasil",
                data: {
                    balance : (parseInt(account.balance) + parseInt(amount))
                }
            });
            
        } catch (error) {
            await connection.promise().rollback()
            this.res.status(500).send({
                status: 500,
                message: "Internal Server Error",
                data: null
            });
        }
    }

    async transaction() {
        try{
            const serviceCode = this.req.body.service_code;
            const user = this.req.session.user;

            await connection.promise().beginTransaction();
            
            const service = (await connection.promise().execute(`
                SELECT * FROM services WHERE service_code = '${serviceCode}'
            `))[0][0];

             if(!service) {
                return this.res.status(400).send({
                    status: 102,
                    message: "Service ataus Layanan tidak ditemukan",
                    data: null
                });
            }

            const account = (await connection.promise().execute(`
                SELECT * FROM accounts WHERE user_id = '${user.id}' AND balance >= ${service.service_tariff}
            `))[0][0];

            if(!account) {
                return this.res.status(400).send({
                    status: 102,
                    message: "Saldo tidak cukup",
                    data: null
                });
            }

            await connection.promise().execute(`
                UPDATE accounts SET balance = ${ (parseInt(account.balance) - parseInt(service.service_tariff)) } WHERE user_id = '${user.id}'
            `);

            const invoice = await this.invoiceGenerator();
            await connection.promise().execute(`
                INSERT INTO transactions (id, user_id, invoice_number, service_code, transaction_type, total_amount, description) 
                VALUES(?, ?, ?, ?, ?, ?, ?)
            `, [
                uuid.v4(),
                user.id,
                invoice,
                serviceCode,
                "PAYMENT",
                service.service_tariff,
                service.service_name,
            ]);

            const latestTransaction = (await connection.promise().execute(`
                SELECT a.invoice_number, a.service_code, b.service_name, a.transaction_type,
                a.total_amount, a.created_at
                FROM transactions a LEFT JOIN services b ON a.service_code = b.service_code 
                WHERE a.invoice_number = '${invoice}'
            `))[0][0];
            
            await connection.promise().commit();

            return this.res.status(200).send({
                status: 0,
                message: "Transaksi berhasil",
                data: latestTransaction
            });    
            
        } catch (error) {
            await connection.promise().rollback()
            this.res.status(500).send({
                status: 500,
                message: "Internal Server Error",
                data: null
            });
        }
    }

    async transactionHistory() {
        var offset = 0;
            var limit = 3;
            const user = this.req.session.user;

            if(this.req.query.offset){
                offset = this.req.query.offset;
            }

            if(this.req.query.limit){
                limit = this.req.query.limit;
            }

            const selectStmt = `
                SELECT invoice_number, transaction_type, description, total_amount, created_at 
                FROM transactions WHERE user_id = '${user.id}'
                LIMIT ${limit} OFFSET ${offset} 
            `;

            const [row, field] = await connection.promise().execute(selectStmt);
            
            return this.res.status(200).send({
                status: 0,
                message: "Sukses",
                data: {
                    offset: offset,
                    limit: limit,
                    records: row
                }
            });

        try{
            

        } catch (error) {
            this.res.status(500).send({
                status: 500,
                message: "Internal Server Error",
                data: null
            });
        }
    }

    async invoiceGenerator(){
        const today = new Date();
        const yyyymmdd = today.toISOString().split('T')[0];

        const number = Math.floor(Math.random()*(999-100+1)+100);

        return "INV" + yyyymmdd.replaceAll("-", "") + "-" + number;
    }
}