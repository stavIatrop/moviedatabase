var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');

module.exports.moviesGetAll = function(req, res) {
    
    var start = 0;
    var number = 5;
    var maxNumber = 10;

    if(req.query && req.query.start) {
        start = parseInt(req.query.start);
    }
    if(req.query && req.query.number) {
        number = parseInt(req.query.number);
    }

    if(isNaN(start) || isNaN(number)) {
        res
            .status(200)
            .json( { "message" :
                    "If supplied in querystring, start " +
                        "and number must be numeric"});
        return;
    }

    if(number > maxNumber) {

        res
            .status(400)
            .json( { "message" :
                        "Max value for number is " + maxNumber});
        return;
    }


    Movie
        .find()
        .skip(start)
        .limit(number)
        .exec(function(err, docs) {
            if(err) {
                console.log("Error finding movies");
                res
                    .status(500)
                    .json(err)
            }else {

                console.log("Retrieved data for " +
                            docs.length + " movies");
                res
                    .status(200)
                    .json(docs);
            }
            
        });  
};

module.exports.moviesGetCount = function(req, res) {

    Movie
        .count({}, function(err, count) {
            if(err) {
                console.log("Error finding number of movies");
                res
                    .status(500)
                    .json(err)
            }else {

                console.log("Number of movies: " + count );
                res
                    .status(200)
                    .json(count);
            }
        });
};

var splitArray = function(input) {
    var output;
    if(input && input.length > 0) {
        output = input.split(";");
    }else {
        output = [];
    }
    return output;
};

module.exports.moviesAddOne = function(req, res) {
    
    Movie
        .create({
            
            title : req.body.title,
            year : parseInt(req.body.year),
            cast : splitArray(req.body.cast),
            genres : splitArray(req.body.genres),
            avg_stars : 0,
            review_count : 0,
            reviews : [],
            description : req.body.description

        }, function(err, newBusiness) {
            if (err) {
                console.log("Error creating business");
                res
                    .status(400)
                    .json(err);
            } else {
                res
                    .status(201)
                    .json(newBusiness);
            }
        });
};

module.exports.moviesDeleteOne = function(req, res) {
    var movieID = req.params.movieID;

    Movie
        .findByIdAndRemove(movieID)
        .exec(function(err, thisMovie) {
            if(err) {
                res
                    .status(404)
                    .json(err);
            } else {
                console.log("Movie " + movieID
                            + " deleted");
                res
                    .status(204)
                    .json();
            }
        })
};

module.exports.moviesGetOne = function(req, res) {

    var movieID = req.params.movieID;
    
    console.log("GET movie " + movieID);

    Movie
        .findById(movieID)
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
                                        "Movie ID not found"};
            }
            res
                .status(response.status)
                .json(response.message);
            
        });
};
