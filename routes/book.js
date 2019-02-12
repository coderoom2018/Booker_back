var express = require("express");

var models = require("../models");
var Book = require("../models").Book;
var router = express.Router();

router
  .get("/", async (req, res) => {
    try {
      console.log("**************** ", req.query, " ***************");

      const books = await Book.findAll({
        where: { id: req.query.book_id }
      }).then(books => res.json(books));
    } catch (error) {
      console.error(error);
      next(error);
    }
  })

  .post("/", async (req, res) => {
    try {
      console.log("********** book post ***********");

      const books = await Book.create({
        title: "title06",
        author: "author06",
        isbn: "isbn06",
        publishedAt: "66666666",
        description: "description06",
        image: "image06URL",
        averageScore: 6,
        bookmarkCount: 6
      }).then(books => res.json(books));
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

module.exports = router;
