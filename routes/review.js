var express = require("express");

var Review = require("../models").Review;
var Book = require("../models").Book;
var router = express.Router();
var models = require("../models");
var bodyParser = require("body-parser");

var jsonParser = bodyParser.json();

router
  .get("/", async (req, res) => {
    try {
      console.log("**************** reviews get ***************");
      await Review.findAll({
        where: {
          user_id: req.query.user_id,
          book_id: req.query.book_id
        },
        include: [{ model: models.Book }]
      })
      .then(reviews => res.json(reviews));
    } 
    catch (error) {
      console.error(error);
      next(error);
    }
  })

  .post("/", jsonParser, async (req, res) => {
    try {
      console.log("*********** review post *********");
      
      if (await Review.find({
        where: {
          user_id: req.body.user_id,
          book_id: req.body.book_id
        }
      })) {
        res.json("이미 작성하신 리뷰가 있습니다!")
      } else {
        await Review.create({
          text: req.body.text,
          user_id: req.body.user_id,
          book_id: req.body.book_id,
        })
        .then(async () => {
          await Book.findAll({
            where: { id: req.body.book_id },
            include: [{
              model: models.Review,
              book_id: req.body.book_id,
              include: [{
                model: models.User,
                id: req.body.user_id,
                attributes: ["email"]
              }]
            }]
          })
          .then(books => res.json(books))
        })
      }
    }
    catch (error) {
      console.error(error);
      next(error);
    }
  })

  .delete("/", jsonParser, async (req, res) => {
    try {
      console.log("*********** review delete **********")

      if (await Review.find({
        where: {
          user_id: req.body.user_id,
          book_id: req.body.book_id
        }
      })) {
        await Review.destroy({
          where: {
            user_id: req.body.user_id,
            book_id: req.body.book_id
          }
        })
        .then(async () => {
          await Book.findAll({
            where: { id: req.body.book_id },
            include: [{
              model: models.Review,
              book_id: req.body.book_id,
              include: [{
                model: models.User,
                id: req.body.user_id,
                attributes: ["email"]
              }]
            }]
          })
          .then(books => res.json(books))
        })
      } else {
        res.json("회원분이 작성한 리뷰가 아닙니다.")
      }
    }
    catch (error) {
      console.error(error);
      next(error);
    }
  })

  .put("/", jsonParser, async (req, res) => {
    try {
      console.log("********** review edit **********");
      
      await Review.update(
        { text: req.body.text },
        { where: {
            user_id: req.query.user_id,
            book_id: req.query.book_id
          }
        }
      )
      .then(async () => {
        await Review.findAll({
          where: { user_id: req.query.user_id },
          include: { model: models.Book }
        })
        .then(reviews => res.send({ newReviews: reviews }));
      });
    } 
    catch (error) {
      console.error(error);
      next(error);
    }
  })

module.exports = router;
