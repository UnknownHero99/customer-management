var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt    = require('jsonwebtoken');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const secret = "secret";
var User = require('../models/User');

router.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, username, password');

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      //respond with 200
      res.sendStatus(200);
    }
    else {
    //move on
      next();
    }
});

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
      User.findOne({ 'username': req.headers.username }, function (err, user){
          if(err) return res.status(500).send("There was a problem adding the information to the database. :" + err);
          if(!user)
            res.json({
                success: false,
                message: 'Authentication failed. User not found'
            });
          else if(user.password != req.headers.password) //wrong password
            res.json({
                success: false,
                message: 'Authentication failed. Wrong password'
            });
          else{
              const payload = {admin: user};
              var token = jwt.sign(payload, 'superSecret', {expiresIn: "1h"});
              res.json({
                  success: true,
                  message: "Authentication successfull",
                  token: token
              });
          }
    })
  });

module.exports = router;
