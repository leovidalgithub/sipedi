const mongoose = require('mongoose');
mongoose.Promise = Promise;
const config = require('../config/config');

if (process.env.NODE_ENV === 'production') {
	dbURI =  process.env.MONGO_URI;
} else {
	dbURI = config.pass.database;
}

mongoose.connect('mongodb+srv://sipedi_user:b8mjs7F8jpuymL5j@sipedi.dpvlm.mongodb.net/sipedi?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
module.exports = mongoose.connection;
// module.exports = mongoose.connect(dbURI);

// mongoose.connection.on('error' , function(err) {
// 	console.log('Mongoose connection error: ' + err);
// });

// mongoose.connection.on( 'disconnected', function() {
// 	console.log('Mongoose disconnected');
// });

//heroku config:set MONGO_URI=mongodb://<DBUSER>:<PASSWORD>@ds013486.mlab.com:13486/sipedi
//heroku config:set NODE_ENV=production
//heroku config:set EMAIL_PASS=*********
