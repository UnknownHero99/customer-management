var RestAPI = require('./RestAPI.js');
var WebInterface = require('./WebInterface.js');
var APIPort = process.envPort || 3000;
var InterfacePort = process.envPort || 8080;

var APIServer = RestAPI.listen(APIPort, function() {
  console.log('Express APIServer is listening on port ' + APIPort);
})

var InterfaceServer = WebInterface.listen(InterfacePort, function() {
  console.log('web interface is listening on port ' + InterfacePort);
})
