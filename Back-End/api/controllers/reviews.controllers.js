var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');

module.exports.reviewsGetAll = function(req, res) {

    var movieID = req.params.movieID;
    console.log("GET reviews for movie " + movieID);

    var start = 0;
    var number = 1;
    var maxNumber = 10;

    if(req.query && req.query.start) {
        start = parseInt(req.query.start);
    }
    if(req.query && req.query.number) {
        number = parseInt(req.query.number);
    }

    Movie
        .findById(movieID)
        .select("reviews")
        .exec(function(err, doc) {
            
            // console.log(doc);
            // res
            //     .status(200)
            //     .json(doc.reviews);
            var response = {
                status : 200,
                message : []
            };
            if(err) {
                console.log("Error finding movie");
                response.status = 500;
                response.message = err;
            }else if (!doc){
                response.status = 404;
                response.message = { "message" : 
                                        "Movie ID not found" + movieID};
            }else {

                
                doc.reviews.sort(function(a, b) {
                    return b.date - a.date;
                })
                
                response.message = doc.reviews ?
                                    doc.reviews : []
            };
            res
                .status(response.status)
                .json(response.message);
        })
};

module.exports.reviewsGetOne = function(req, res) {

    var movieID = req.params.movieID;
    var reviewID = req.params.reviewID;
    console.log("GET reviewID " + reviewID);

    Movie
        .findById(movieID)
        .select("reviews")
        .exec(function(err, doc) {
            var review = doc.reviews.id(reviewID);
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
            res
                .status(200)
                .json(review);
        });
};

var addReview = function(req, res, thisMovie) {
    
    thisMovie.reviews.push( {
        username : req.body.username,
        votes : { "like" : 0, "dislike" : 0},
        text : req.body.text,
        stars : parseInt(req.body.stars)

    });
    console.log(thisMovie);
    thisMovie.review_count = parseInt(thisMovie.review_count) + 1;
    thisMovie.save(function(err, updatedMovie) {
        if(err) {
            res
                .status(500)
                .json(err);
        }
        else {
            console.log(updatedMovie);
            var newReviewPosition =
                updatedMovie.reviews.length - 1;
            var newReview =
                updatedMovie.reviews[newReviewPosition];
            res
                .status(201)
                .json(newReview);
        };
    });

}

module.exports.reviewsAddOne = function(req, res) {

    var movieID = req.params.movieID;
    console.log("GET reviews for movie " + movieID);

    Movie
        .findById(movieID)
        .select("reviews review_count")
        .exec(function(err, doc) {
            
            // console.log(doc);
            // res
            //     .status(200)
            //     .json(doc.reviews);
            var response = {
                status : 200,
                message : []
            };
            if(err) {
                console.log("Error finding movie");
                response.status = 500;
                response.message = err;
            }else if (!doc){
                response.status = 404;
                response.message = { "message" : 
                                        "Movie ID not found" + movieID};
            }
            if(doc) {
                addReview(req, res, doc);
            } else {
                res
                    .status(response.status)
                    .json(response.message);
            }
            
        })
};

module.exports.reviewsUpdateOne = function(req, res) {

    var movieID = req.params.movieID;
    var reviewID = req.params.reviewID;
    console.log("PUT reviewID " + reviewID + 
                    " for movieID " + movieID);

    Movie
        .findById(movieID)
        .select("reviews")
        .exec(function(err, thisMovie) {
            var thisReview;
            var response = {
                status : 200,
                message : {}
            };
            if(err) {
                console.log("Error finding movie");
                response.status = 500;
                response.message = err;
            }else if (!thisMovie){
                console.log("Movie ID not found", movieID)
                response.status = 404;
                response.message = { "message" : 
                                        "Movie ID not found " + movieID
                };
            } else {
                //get review and edit
               
                thisReview = thisMovie.reviews.id(reviewID);
                console.log(thisReview);
                if(!thisReview) {
                    response.status = 404;
                    response.message = {
                            "message" : " Review ID not found " + reviewID
                    };
                }

                //check for error
                console.log(response.status);
                if(response.status !== 200) {

                    res
                        .status(response.status)
                        .json(response.message);
                } else {
                    thisReview.username = req.body.username;
                    thisReview.text = req.body.text;
                    thisReview.stars = parseInt(req.body.stars);
                    console.log(thisMovie);
                    thisMovie.save(function(err, updatedMovie) {
                        console.log(updatedMovie);
                        if(err) {
                            res
                                .status(500)
                                .json(err);
                        } else {
                            res
                                .status(204)
                                .json(updatedMovie);
                        }
                    });
                }
            }
        });
};

module.exports.reviewsDeleteOne = function(req, res) {

    var movieID = req.params.movieID;
    var reviewID = req.params.reviewID;
    console.log("PUT reviewID " + reviewID + 
                    " for movieID " + movieID);

    Movie
        .findById(movieID)
        .select("reviews review_count")
        .exec(function(err, thisMovie) {
            var thisReview;
            var response = {
                status : 200,
                message : {}
            };
            if(err) {
                console.log("Error finding movie");
                response.status = 500;
                response.message = err;
            }else if (!thisMovie){
                console.log("Movie ID not found", movieID)
                response.status = 404;
                response.message = { "message" : 
                                        "Movie ID not found " + movieID
                };
            } else {
                //get review and edit
                thisReview = thisMovie.reviews.id(reviewID);
                if(!thisReview) {
                    response.status = 404;
                    response.message = {
                            "message" : " Review ID not found " + reviewID
                    };
                }

                //check for error

                if(response.status !== 200) {
                    res
                        .status(response.status)
                        .json(response.message);
                } else {
                    
                    thisMovie.reviews.id(reviewID).remove();
                    thisMovie.review_count = parseInt(thisMovie.review_count) - 1;
                    thisMovie.save(function(err, updatedMovie) {
                        if(err) {
                            res
                                .status(500)
                                .json(err);
                        } else {
                            res
                                .status(204)
                                .json();
                        }
                    });
                }
            }
        });
}