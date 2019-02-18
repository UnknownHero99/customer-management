const RestAPI = require('./RestAPI.js');
const WebInterface = require('./WebInterface.js');
const APIPort = process.envPort || 3000;
const InterfacePort = process.envPort || 8080;


var APIServer = RestAPI.listen(APIPort, function() {
  console.log('Express APIServer is listening on port ' + APIPort);
})

var InterfaceServer = WebInterface.listen(InterfacePort, function() {
  console.log('web interface is listening on port ' + InterfacePort);
})
