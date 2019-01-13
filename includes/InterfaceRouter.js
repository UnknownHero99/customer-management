var express = require('express');
var router = express.Router();
var Client = require('../models/Client');


router.get('/', function (req, res) {
  console.log(req.query);
  if(typeof req.query.name !== 'undefined' && req.query.name !== null){
    Client.create({
      name: req.query.name,
      surname: req.query.surname,
      birthYear: req.query.birthYear,
      gender: req.query.gender,
      weight: req.query.weight,
      height: req.query.height,
      bloodPressure: req.query.bloodPressure,
      healthStatus: req.query.healthStatus,
      profession: req.query.profession,
      sportActivity: req.query.sportActivity,
      nutrition: req.query.nutrition,
      city: req.query.city,
      telNumber: req.query.telNumber,
      email: req.query.email,
      other: req.query.other
    }, function (err, user){
      if(err) return res.status(500).send("There was a problem adding the information to the database. :" + err);
      res.redirect('/');
    })
}
else res.sendFile('/webInterface/' + "index.html" , { root : __dirname});
});

router.get('/client/:id', function (req, res) {
      res.sendFile('/webInterface/' + "client.html" , { root : __dirname});
});

router.get('/js/:filename', function (req, res) {
      res.sendFile('/webInterface/js/' + req.params.filename , { root : __dirname});
});
router.get('/css/:filename', function (req, res) {
      res.sendFile('/webInterface/css/' + req.params.filename , { root : __dirname});
});
router.get('/img/:filename', function (req, res) {
      res.sendFile('/webInterface/img/' + req.params.filename , { root : __dirname});
});

module.exports = router;
