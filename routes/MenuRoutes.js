const express = require('express');
const router = express.Router();
const MenuControllers = require('../controllers/Menu');
const multer = require('multer');

const storage = multer.diskStorage({
    destination:function(req,res,cb){
        cb(null, './public/images/')
    },
    filename:function(req,file,cb){
        cb(null,new Date().toISOString()+file.originalname);
    }
})

const upload = multer({
    storage:storage
})

router.post('/create',upload.single('imageURL'),MenuControllers.create);
router.get('/show',MenuControllers.getData);

module.exports = router;
