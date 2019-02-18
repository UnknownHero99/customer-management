var express = require('express');
var cookieParser = require('cookie-parser')
var router = express.Router();
var Client = require('../models/Client');
var jwt    = require('jsonwebtoken');
router.use(cookieParser());

router.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080/');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      //respond with 200
      res.sendStatus(200);
    }

    else if (req.url == "/css/style.css" || req.url == "/js/ajax.js") next();
    else {
        try{
            var token = req.cookies["token"];
        }
        catch(e){
            console.log(e);
        }
        if(token){
            jwt.verify(token, "superSecret", function(err, decoded){
                if(err) res.status(403).sendFile('/webInterface/' + "login.html" , { root : __dirname});
                req.decoded = decoded;
                next();
            });
        }
        else res.status(403).sendFile('/webInterface/' + "login.html" , { root : __dirname});
    }
});

router.get('/', function (req, res) {
    res.sendFile('/webInterface/' + "index.html" , { root : __dirname});
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
