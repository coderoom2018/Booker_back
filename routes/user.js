var express = require("express");

var User = require("../models").User;
var router = express.Router();

/* GET users listing. */
router
  .get("/", async (req, res) => {
    try {
      console.log("**************** ", req.query, " ***************");

      const users = await User.findAll({
        where: { id: req.query.book_id }
      }).then(users => res.json(users));
    } catch (error) {
      console.error(error);
      next(error);
    }
  })

  .post("/", async (req, res) => {
    try {
      console.log("********** user post ***********");

      const users = await User.create({
        id: 2,
        email: "email01email01",
        password: "password01",
        name: "name01",
        review: "review01review01",
        created_at: Date.now(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }).then(users => res.json(users));
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

module.exports = router;
