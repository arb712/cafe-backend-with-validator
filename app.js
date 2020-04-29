var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
// const validator = require('validator');
const privateKey = "butterflyfadenewfactory";
require('dotenv').config()
var indexRouter = require('./routes/index');
const MenuRouter = require('./routes/MenuRoutes');
const CategoriesRouter = require('./routes/CategoryRoutes');
const UsersRouter = require('./routes/UserRoutes');

var app = express();
mongoodConnect = process.env.DB_CONNECTION;
mongoose.connect('mongodb://localhost/cafe', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static('public'))
app.use('/public/images/',express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/menu',validateUser,MenuRouter);
app.use('/category',validateUser,CategoriesRouter);
app.use('/users',UsersRouter);

function validateUser(req,res,next){
    jwt.verify(req.headers['x-access-token'],privateKey),(err,decoded) => {
        if(err){
            res.json(err);
        }
        else{
            req.body.userID = decoded.id;
            next();
        }
    }
}

module.exports = app;
