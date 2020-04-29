const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');
const saltRounds = 12;

const UserSchema = new Schema({
    fullName : {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

UserSchema.pre('save',function(next){
    this.password = bcrypt.hashSync(this.password,saltRounds)
    next()
  })

module.exports = mongoose.model('users',UserSchema);