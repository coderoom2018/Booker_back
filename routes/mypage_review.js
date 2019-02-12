var express = require('express');

var Review = require('../models').Review;
var router = express.Router();

router.get('/', async(req, res, next) => {
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch(error) {
    console.error(error);
    next(error);
  }
})

module.exports = router;
