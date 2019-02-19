var express = require("express");

var Review = require("../models").Review;
var Bookmark = require("../models").Bookmark;
var models = require("../models");
var router = express.Router();
var bodyParser = require("body-parser");

var jsonParser = bodyParser.json();

router
  .get("/", async (req, res, next) => {
    try {
      console.log("************ mypage get *************");

      if (Review.find({ where: { user_id: req.query.user_id } })) {
        await Review.findAll({
          where: { user_id: req.query.user_id },
          include: [{ model: models.Book }]
        })
          .then(reviews => res.json(reviews));
      } else {
        res.json("등록된 평가가 없습니다")
      }
    } 
    catch (error) {
      console.error(error);
      next(error);
    }
  })

  .delete("/", jsonParser, async (req, res) => {
    try {
      console.log("************* mypage_reviewCard delete *************");
      
      await Review.destroy({
        where: {
          id: req.body.id,
          user_id: req.body.user_id
        }
      })
        .then(async () => {
          await Review.findAll({
            where: { user_id: req.body.user_id },
            include: [{ model: models.Book }]
          })
            .then(reviews => res.send({ newReviews: reviews }));
      });
    } 
    catch (error) {
      console.error(error);
      next(error);
    }
  })

  .get("/bookmarks", async (req, res) => {
    try {
      console.log("******** mypage_bookmarks get *********");

      await Bookmark.findAll({
        where: { user_id: req.query.user_id }
      })
        .then(bookmakrs => res.json(bookmarks));
    } 
    catch (error) {
      console.error(error);
      next(error);
    }
  })

module.exports = router;
