const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Category = require('../models/CategoryModels');

const Menu = new Schema({
    name:{
        type:String,
        required:true
    },
    detail:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:Category   
    },
    imageURL:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('menu',Menu)