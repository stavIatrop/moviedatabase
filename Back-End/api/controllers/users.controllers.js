var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.usersAddOne = function(req, res) {
    
    User
        .create({
            
            username : req.body.username,
            password : req.body.password,
            review_count : 0

        }, function(err, newUser) {
            if (err) {
                console.log("Error creating new user");
                res
                    .status(400)
                    .json(err);
            } else {
                res
                    .status(201)
                    .json(newUser);
            }
        });
};

module.exports.usersGetOne = function(req, res) {

    var userID = req.params.userID;
    
    console.log("GET user " + userID);

    User
        .findById(userID)
        .exec(function(err, doc) {
            var response = {
                status : 200,
                message : doc
            }
            if(err) {
                response.status = 500;
                response.message = err;
            }else if (!doc){
                response.status = 404;
                response.message = { "message" : 
                                        "User ID not found"};
            }
            res
                .status(response.status)
                .json(response.message);
            
        });
};
