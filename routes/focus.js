var express = require("express");

var Review = require("../models").Review;
var models = require("../models");
var bodyParser = require("body-parser");

var jsonParser = bodyParser.json();

var router = express.Router();

router
  .get("/", async (req, res) => {
    try {
      console.log("********* Focus ********");

      await Review.findAll({
        where: {
          user_id: req.query.user_id,
          book_id: req.query.book_id
        },
        include: {
          model: models.Book,
          id: req.query.book_id
        }
      })
        .then(reviews => res.json(reviews));
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
        {
          where: {
            user_id: req.query.user_id,
            book_id: req.query.book_id
          }
        }
      )
        .then(async () => {
          await Review.findAll({
            where: {
              user_id: req.query.user_id,
              book_id: req.query.book_id
            },
            include: {
              model: models.Book,
              id: req.query.book_id
            }
          })
            .then(review => res.send({ review }));
      });
    } 
    catch (error) {
      console.error(error);
      next(error);
    }
  })

  .put("/myscore", jsonParser, async (req, res) => {
    try {
      console.log("********** Myscore edit **********");

      await Review.update(
        { score: req.body.score },
        { where: {
            user_id: req.body.user_id,
            book_id: req.body.book_id
          }
        }
      )
        .then(
          Review.findAll({
            where: { user_id: req.body.user_id },
            include: [{ model: models.Book }]
          })
            .then(reviews => res.json(reviews))
      )
    } 
    catch (error) {
      console.error(error);
      next(error);
    }
  });

module.exports = router;
