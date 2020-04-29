const MenuSchema = require("../models/MenuModels");
const CategorySchema = require('../models/CategoryModels');

module.exports = {
  create: (req, res) => {
    MenuSchema.create({
      name: req.body.name,
      detail: req.body.detail,
      price: req.body.price,
      category:req.body.category,
      imageURL: req.file && req.file.path
    })
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
  getData: (req, res) => {
    MenuSchema.find({}).populate('category')
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
};
