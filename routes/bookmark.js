var express = require("express");

var Bookmark = require("../models").Bookmark;
var router = express.Router();

router
  .get("/", async (req, res) => {
    try {
      console.log("**************** ", req.query, " ***************");
      const bookmarks = await Bookmark.findAll({
        where: {
          user_id: req.query.user_id,
          book_id: req.query.book_id
        }
      }).then(bookmarks => res.json(bookmarks));
    } catch (error) {
      console.error(error);
      next(error);
    }
  })

  .post("/", async (req, res) => {
    try {
      console.log("********** bookmark post ***********");

      const bookmarks = await Bookmark.create({
        id: 0,
        book_id: 3,
        user_id: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }).then(bookmarks => res.json(bookmarks));
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

module.exports = router;
