var express = require('express');
var WebInterface = express();

var db = require('./includes/db')


var InterfaceRouter = require('./includes/InterfaceRouter');
WebInterface.use('/', InterfaceRouter);
module.exports = WebInterface;
