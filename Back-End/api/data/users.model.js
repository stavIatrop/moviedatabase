var mongoose = require('mongoose');


var userSchema = new mongoose.Schema( {

    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    review_count: Number

})

mongoose.model('User', userSchema, 'users');