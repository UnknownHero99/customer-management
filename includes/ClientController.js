var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt    = require('jsonwebtoken');
var cookieParser = require('cookie-parser')
router.use(cookieParser());

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      //respond with 200
      res.sendStatus(200);
    }
    else {
        try{
            var token = req.cookies["token"];
        }
        catch(e){
            console.log(e);
        }
        if(token){
            jwt.verify(token, "superSecret", function(err, decoded){
                if(err) res.json({success: false, message: "Authentication failed.token invalid."});
                req.decoded = decoded;
                next();
            });
        }
        else res.status(403).sendFile('/webInterface/' + "login.html" , { root : __dirname});
    }
});

var Client = require('../models/Client');
var Therapy = require('../models/Therapy').mongooseModel;

router.post('/', function (req, res) {
    Client.create({
        name: req.body.name,
        surname: req.body.surname,
        birthYear: req.body.birthYear,
        gender: req.body.gender,
        weight: req.body.weight,
        height: req.body.height,
        bloodPressure: req.body.bloodPressure,
        healthStatus: req.body.healthStatus,
        profession: req.body.profession,
        sportActivity: req.body.sportActivity,
        nutrition: req.body.nutrition,
        city: req.body.city,
        telNumber: req.body.telNumber,
        email: req.body.email,
        other: req.body.other
    }, function (err, user){
        if(err) return res.status(500).send("There was a problem adding the information to the database. :" + err);
        res.status(200).send(user);
    })
});

router.post('/:id/therapies', function (req, res) {
  var therapy = {
    date: req.body.date,
    reason: req.body.reason,
    expectations: req.body.expectations,
    changes: req.body.changes,
    therapyType: req.body.therapyType,
    feedback: req.body.feedback,
    advice: req.body.advice,
    notes: req.body.notes
  };

    Client.findOne({_id: req.params.id}, function (err, client) {
      if(err) return res.status(500).send("There was a problem adding the information to the database. :" + err);
      client.therapies.push(therapy);
      client.save();
      res.status(200).send(client);
    });
});


router.get('/', function (req, res) {
  Client.find({}, function (err, clients){
    if(err) return res.status(500).send("There was a problem reading the information from the database. :" + err);
    res.status(200).send(clients);
  })
});

router.get('/:id', function (req, res) {
  Client.findOne({_id: req.params.id}, function (err, client){
    if(err) return res.status(500).send("There was a problem reading the information from the database. :" + err);
    res.status(200).send(client);
  })
});

module.exports = router;
