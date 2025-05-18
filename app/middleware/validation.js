const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.api = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token || !req.session.user) {
        return res.status(401).send({
            status: 108,
            message: !req.session.user ? "Token tidak valid" : "Memerlukan Token",
            data: null
        });
    }

    jwt.verify(token, req.session.user.password, (err, user) => {
        if (err) {
            return res.status(403).send({
                status: 108,
                message: "Token tidak tidak valid atau kadaluwarsa",
                data: null
            });
        } 

        req.session.user = user;

        next();
    });
}