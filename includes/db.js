var mongoose = require('mongoose'),
autoIncrement = require('mongoose-auto-increment');
mongoose.connect('mongodb://localhost/TherapiesEvicence', function(err){
  if(err) console.log(err);
});


module.exports = mongoose;
