const express = require('express');
const router = express.Router();
const CategoryControllers = require('../controllers/Category');

router.post('/create',CategoryControllers.create)
router.get('./show',CategoryControllers.getAllCategory)

module.exports = router;