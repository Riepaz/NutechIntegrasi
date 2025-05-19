'use strict';
const controller = require('./controller.js');
const connection = require('../../helper/connection');
const bcrypt = require("bcryptjs");
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const validator = require('validator');

module.exports = class UserController extends controller {
    constructor(req, res) {
        super(req, res);
    }

    async register() {
        try {
            if(!validator.isEmail(this.req.body.email)){
                return this.res.status(400).send({
                    status: 102,
                    message: 'Paramter email tidak sesuai format',
                    data: null
                });
            }

            const userId = uuid.v4();
            var params = [
                userId,
                this.req.body.email,
                this.req.body.first_name,
                this.req.body.last_name,
                await bcrypt.hash(this.req.body.password, 10),
            ];

            var account = [
                uuid.v4(),
                userId,
                Math.floor(100000 + Math.random() * 900000),
                0
            ];

            const insertStmt = `
                INSERT INTO users (id, email, first_name, last_name, password)
                VALUES (?, ?, ?, ?, ?)
            `;

            const results = await connection.promise().execute(insertStmt, params);
            
            console.log(results);

            if(results[0].affectedRows) {
                const insertAccountStmt = `
                    INSERT INTO accounts (id, user_id, account_number, balance)
                    VALUES (?, ?, ?, ?)
                `;

                await connection.promise().execute(insertAccountStmt, account);        

                return this.res.status(201).send({
                    status: 0,
                    message: "Registrasi berhasil silahkan login",
                    data: null
                });
            } else {
                return this.res.status(200).send({
                    status: 102,
                    message: results.info,
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

    async login() {
        try{
            if(!validator.isEmail(this.req.body.email)){
                return this.res.status(400).send({
                    status: 102,
                    message: 'Paramter email tidak sesuai format',
                    data: null
                });
            }

            const selectStmt = `
                SELECT * FROM users WHERE email = ?
            `;

            const [row, field] = await connection.promise().execute(selectStmt, [this.req.body.email]);
            const user = row[0];
            
            if (!user) {
                return this.res.status(400).send({
                    status: 103,
                    message: 'User tidak ditemukan',
                    data: null
                });
            }

            var status = await bcrypt.compare(this.req.body.password, user.password);
            
            if (status) {
                const token = jwt.sign(user, user.password, {
                    expiresIn: '2h',
                });

                var sessData = this.req.session;
                sessData.user = user;

                this.req.session.save();
                return this.res.status(200).send({
                    status: 0,
                    message: "Login Sukses",
                    data: {
                        token : token
                    }
                });
            } else {
                return this.res.status(400).send({
                    status: 103,
                    message: 'Username atau password salah',
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

    async profile() {
        try{
            const user = this.req.session.user;
            return this.res.status(200).send({
                status: 0,
                message: "Sukses",
                data: {
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    profile_image: user.profile_image
                }
            });

        } catch (error) {
            this.res.status(500).send({
                status: 500,
                message: "Internal Server Error",
                data: null
            });
        }
    }

    async profileUpdate() {
        try {
            var params = [
                this.req.body.first_name,
                this.req.body.last_name,
                this.req.session.user.id
            ];

            const updateStmt = `
                UPDATE users SET first_name = ?, last_name = ? WHERE id = ?
            `;

            connection.query(updateStmt, params,
                (err, results) => {
                    if (err) {
                        return this.res.status(400).send({
                            status: 102,
                            message: err.sqlMessage,
                            data: null
                        });
                    }
                    
                    if(results.affectedRows) {
                        this.req.session.user.first_name = this.req.body.first_name;
                        this.req.session.user.last_name = this.req.body.last_name;
                        
                        const user = this.req.session.user;
                        return this.res.status(200).send({
                            status: 0,
                            message: "Update Pofile berhasil",
                            data: {
                                email: user.email,
                                first_name: user.first_name,
                                last_name: user.last_name,
                                profile_image: user.profile_image
                            }
                        });
                    } else {
                        return this.res.status(200).send({
                            status: 102,
                            message: results.info,
                            data: null
                        });
                    }                    
                }
            );
            
            
        } catch (error) {
            this.res.status(500).send({
                status: 500,
                message: "Internal Server Error",
                data: null
            });
        }
    }

    async profileImage() {
        try {
            if(!this.req.file || !this.req.fileValidator) {
                return this.res.status(400).send({
                    status: 102,
                    message: "Format Image tidak sesuai",
                    data: null
                });
            }

            const updateStmt = `
                UPDATE users SET profile_image = ? WHERE id = ?
            `;

            const imageURL = (await this.getBaseURL(this.req)) + "/profile_image/" + this.req.file.filename;

            connection.query(updateStmt, [imageURL, this.req.session.user.id],
                (err, results) => {
                    if (err) {
                        return this.res.status(400).send({
                            status: 102,
                            message: err.sqlMessage,
                            data: null
                        });
                    }
                    
                    if(results.affectedRows) {
                        this.req.session.user.profile_image = imageURL;
                        
                        const user = this.req.session.user;
                        return this.res.status(200).send({
                            status: 0,
                            message: "Update Pofile berhasil",
                            data: {
                                email: user.email,
                                first_name: user.first_name,
                                last_name: user.last_name,
                                profile_image: user.profile_image
                            }
                        });
                    } else {
                        return this.res.status(200).send({
                            status: 102,
                            message: results.info,
                            data: null
                        });
                    }                    
                }
            );
        } catch (error) {
            this.res.status(500).send({
                status: 500,
                message: "Internal Server Error",
                data: null
            });
        }
    }

    async getBaseURL (req) {
        const protocol = req.protocol;
        const host = req.get('host');
        return `${protocol}://${host}`;
    };
}