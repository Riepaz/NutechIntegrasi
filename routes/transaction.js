const express = require('express');
const router = express.Router();
const TransactionController = require('../app/controller/transaction');

router.get('/balance', function(req, res, next) {
    const controller = new TransactionController(req, res);
    controller.balance();
});

router.post('/topup', function(req, res, next) {
    const controller = new TransactionController(req, res);
    controller.topup();
});

router.post('/transaction', function(req, res, next) {
    const controller = new TransactionController(req, res);
    controller.transaction();
});

router.get('/history', function(req, res, next) {
    const controller = new TransactionController(req, res);
    controller.transactionHistory();
});

module.exports = router;