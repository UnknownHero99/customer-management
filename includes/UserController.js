var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var User = require('../models/User');

  router.post('/', function (req, res) {
      res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    }, function (err, user){
      if(err) return res.status(500).send("There was a problem adding the information to the database. :" + err);
      res.status(200).send(user);
    })
  });

  router.get('/', function (req, res) {
    User.find({}, function (err, users){
      if(err) return res.status(500).send("There was a problem getting the information from the database. :" + err);
      res.status(200).send(users);
    })
  });

module.exports = router;
