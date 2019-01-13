var express = require('express');
var RestAPI = express();
var db = require('./includes/db');

var UserController = require('./includes/UserController');
var ClientController = require('./includes/ClientController');
RestAPI.use('/users', UserController);
RestAPI.use('/clients', ClientController);

module.exports = RestAPI;
