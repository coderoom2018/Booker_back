var express = require("express");

var User = require("../models").User;
var models = require("../models");
var bodyParser = require("body-parser");

var jsonParser = bodyParser.json();

var router = express.Router();


/* GET users listing. */
router
  .post("/signin", jsonParser, async (req, res) => {
    try {
      console.log("**************** SIGN IN ***************");

      if (await User.findOne({ 
        where: { 
          email: req.body.email,
          password: req.body.password 
        } 
      })) {
        await User.findOne({ 
          where: { 
            email: req.body.email,
            password: req.body.password 
          },
          attributes: ['id', 'email']
        })
        .then(users => res.json(users))
      } else {
        res.json("이메일과 비밀번화를 확인해 주세요")
      }
    } 
    catch (error) {
      console.error(error);
      next(error);
    }
  })

  .post("/signup", jsonParser, async (req, res) => {
    try {
      console.log("********** SIGN UP ***********");
      
      if (req.body.username.length > 10 || req.body.username.length < 2) {
        res.json("이름의 글자수가 많습니다")
      } else if (req.body.email_back.length < 5 || req.body.email_front.length > 20)
      {
        res.json("유효한 이메일 주소가 아닙니다")
      } else if (req.body.password.length > 20 || req.body.password.length < 3) {
        res.json("유효한 비밀번호가 아닙니다")
      } else if (req.body.password !== req.body.confirm_password) {
        res.json("비밀번호를 확인 해주세요")
      } 
      
      if (await User.find({ where: { email: `${req.body.email_front}@${req.body.email_back}` } })) {
        res.json("이미 가입한 이메일 입니다")
      } else {
        await User.create({
          name: req.body.username,
          email: `${req.body.email_front}@${req.body.email_back}`,
          password: req.body.password,
          created_at: Date.now(),
          createdAt: Date.now(),
        })
        .then(res.json("가입성공"));
      }
    } 
    catch (error) {
      console.error(error);
      next(error);
    }
  });

module.exports = router;
