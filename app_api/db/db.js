const mongoose = require('mongoose');
mongoose.Promise = Promise;
const databaseURI = require('../config/config').databaseURI;

mongoose.connect(databaseURI, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = mongoose.connection;
