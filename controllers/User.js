const UsersSchema = require('../models/UserModels')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const privateKey = "butterflyfadenewfactory"


module.exports = {
    create:(req,res,next) => {
        UsersSchema.create({
            fullName:req.body.fullName,
            email:req.body.email,
            address:req.body.address,
            password:req.body.password,
        })
        .then((result) => 
            res.json({
                status:"success",
                data:result
            })
        )
        .catch((err) => res.json(err));
    },
    getData : (req,res) => {
        UsersSchema.find({})
        .then((result) => {
            res.json({
                status:'success',
                data:result
            })
        })
        .catch((err) => res.json(err));
    },
    authenticated : function(req,res,next){
        UsersSchema.findOne({
            email:req.body.email,
        })
        .then((response,err) => {
            console.log(response);
            if (err) next(err)
            else{
                if(response != null && bcrypt.compareSync(req.body.password , response.password)){
                    console.log(response)
                    // jwt.sign(
                    //     {
                    //         id:response._id
                    //     },
                    //     privateKey,{
                    //         expiresIn:60*60
                    //     },
                    //     (err,token) => {
                    //         console.log(token);
                    //         res.json(token)
                    //     })
                }
                else{
                    res.json({status:err})
                }
            }
        })
        .catch((err) => {
            throw err;
        })
    }
}