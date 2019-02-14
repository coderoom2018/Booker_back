var express = require("express");

var models = require("../models");
var Book = require("../models").Book;
var router = express.Router();
var bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

router
  .get("/", async (req, res) => {
    try {
      console.log("**************** ", req.query, " ***************");

      await Book.findAll({
        where: { id: req.query.book_id },
        include: [{
          model: models.Review,
          book_id: req.query.book_id
        }]
      })
        .then(books => res.json(books))
    } 
    catch (error) {
      console.error(error);
      next(error);
    }
  })

  .post("/", jsonParser,async (req, res) => {
    try {
      console.log("********** book post ***********");

      await Book.create({
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        publishedAt: req.body.publishedAt,
        description: req.body.description,
        image: req.body.image,
        averageScore: req.body.averageScore,
        bookmarkCount: req.body.bookmarkCount
      })
        .then(books => res.json(books));
    } 
    catch (error) {
      console.error(error);
      next(error);
    }
  });

module.exports = router;
