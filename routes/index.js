var express = require("express");
var router = express.Router();

var Book = require("../models").Book;

/* GET home page. */
router.get("/", async (req, res) => {
  try {
    console.log("**************** Index Books ***************");

    await Book.findAll()
    .then(books => res.json(books));
  } 
  catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
