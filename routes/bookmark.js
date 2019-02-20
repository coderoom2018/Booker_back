var express = require("express");

var Bookmark = require("../models").Bookmark;
var models = require("../models");
var bodyParser = require("body-parser");

var router = express.Router();
var jsonParser = bodyParser.json();

router
  .get("/", async (req, res) => {
    try {
      console.log("**************** mypage_bookmark get ***************");

      await Bookmark.findAll({
        where: { user_id: req.query.user_id },
        include: [{ model: models.Book }]
      })
      .then(bookmarks => res.json(bookmarks));
    } 
    catch (error) {
      console.error(error);
      next(error);
    }
  })

  .delete("/", jsonParser, async (req, res) => {
    try {
      console.log("************* mypage_bookmark delete *************");

      if (await Bookmark.findOne({
        where: {
          book_id: req.body.book_id,
          user_id: req.body.user_id
        }
      })) {
        await Bookmark.destroy({ 
          where: { 
            book_id: req.body.book_id, 
            user_id: req.body.user_id
          } 
        })
        .then(async () => {
          await Bookmark.findAll({ include: [{ model: models.Book }] })
          .then(bookmarks => res.send({ newBookmarks: bookmarks }))
        });
      } else {
        res.json("추가된 북마크가 없습니다")
      }
        
    } 
    catch (error) {
      console.error(error);
      next(error);
    }
  })

  .post("/", jsonParser, async (req, res) => {
    try {
      console.log("********** mypage_bookmark post ***********");

      if (await Bookmark.findOne({ 
        where: {
          user_id: req.body.user_id,
          book_id: req.body.book_id
        }
      })) {
        res.json("이미 북마크에 추가되어 있습니다!")
      } else {
        await Bookmark.create({
          book_id: req.body.book_id,
          user_id: req.body.user_id
        })
        .then(bookmarks => res.json(bookmarks));
      }
    } 
    catch (error) {
      console.error(error);
      next(error);
    }
  });

module.exports = router;
