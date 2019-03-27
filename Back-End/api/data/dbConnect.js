var mongoose = require('mongoose');
var dbURL = 'mongodb://localhost:27017/moviesDB';

mongoose.connect(dbURL, {useCreateIndex : true,
    useNewUrlParser : true
    });

mongoose.connection.on('connected', function() {
    console.log("Mongoose connected to " + dbURL);
});

mongoose.connection.on('disconnected', function() {
    console.log("Mongoose disconnected"); 
});

mongoose.connection.on('error', function(err) {
    console.log("Mongoose connection error " + err);
});

require('./movies.model.js');
require('./users.model.js');