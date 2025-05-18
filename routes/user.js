const express = require('express');
const router = express.Router();
const UserController = require('../app/controller/user');
const multer = require('multer');
const path = require('path');
    
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/profile_image/'); 
    },
    
    filename: (req, file, cb) => {
        cb(null, req.session.user.id + path.extname(file.originalname)); 
    }
});
    
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    
    if (allowedMimeTypes.includes(file.mimetype)) {
        req.fileValidator = true;
        cb(null, true, req.fileValidator);
    } else {
        req.fileValidator = false;
        cb(null, false, req.fileValidator);
    }
};
    
const upload = multer({ storage: storage, fileFilter: fileFilter });

const v = require('../app/middleware/validation');

router.post('/register', function(req, res, next) {
    const controller = new UserController(req, res);
    controller.register();
});

router.post('/login', function(req, res, next) {
    const controller = new UserController(req, res);
    controller.login();
});

router.get('/profile', v.api,function(req, res, next) {
    const controller = new UserController(req, res);
    controller.profile();
});

router.put('/profile/update', v.api, function(req, res, next) {
    const controller = new UserController(req, res);
    controller.profileUpdate();
});

router.put('/profile/image', v.api, upload.single('file'), function(req, res, next) {
    const controller = new UserController(req, res);
    controller.profileImage();
});

module.exports = router;