const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/User");
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const privateKey = "butterflyfadenewfactory";

router.post("/create", UsersController.create);
router.post("/login", [check("email").not().isEmpty().withMessage("Email Cannot Be Empty"),check("password").not().isEmpty().withMessage("Password Cannot be empty")],  function (req, res) {
    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
        jwt.sign(
            {
                id:res._id
            },
            privateKey,{
                expiresIn:60*60
            },
            (err,token) => {
                console.log(token);
                res.json(token)
            })
    }
  },UsersController.authenticated);

router.get("/show", UsersController.getData);

// router.post(
//   "/",
//   [
//     check("name")
//       .not()
//       .isEmpty()
//       .withMessage("Name must have more than 5 characters"),
//     check("classYear", "Class Year should be a number").not().isEmpty(),
//     check("weekday", "Choose a weekday").optional(),
//     check("email", "Your email is not valid").not().isEmpty(),
//     check("password", "Your password must be at least 5 characters")
//       .not()
//       .isEmpty(),
//   ],
//   function (req, res) {
//     const errors = validationResult(req);
//     console.log(req.body);
//     if (!errors.isEmpty()) {
//       return res.status(422).jsonp(errors.array());
//     } else {
//       res.send({});
//     }
//   }
// );
module.exports = router;

module.exports = router;
