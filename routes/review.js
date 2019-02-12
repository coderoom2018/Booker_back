var express = require("express");

var Review = require("../models").Review;
var router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("**************** ", req.query, " ***************");
    const reviews = await Review.findAll({
      where: { 
        user_id: req.query.user_id,
        book_id: req.query.book_id
      }
    }).then(reviews => res.json(reviews));
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
