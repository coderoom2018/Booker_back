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

  .delete("/", async (req, res) => {
    try {
      console.log("************* mypage_bookmark delete *************");

      await Bookmark.destroy({ where: { id: req.query.id } })
        .then(async () => {
          await Bookmark.findAll({ include: [{ model: models.Book }] })
            .then(bookmarks => res.send({ newBookmarks: bookmarks }));
      });
    } 
    catch (error) {
      console.error(error);
      next(error);
    }
  })

  .post("/", jsonParser, async (req, res) => {
    try {
      console.log("********** mypage_bookmark post ***********");

      await Bookmark.create({
        book_id: req.body.book_id,
        user_id: req.body.user_id
      })
        .then(bookmarks => res.json(bookmarks));
    } 
    catch (error) {
      console.error(error);
      next(error);
    }
  });

module.exports = router;
