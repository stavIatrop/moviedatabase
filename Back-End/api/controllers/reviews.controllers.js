var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');

module.exports.reviewsGetAll = function(req, res) {

    var movieID = req.params.movieID;
    console.log("GET reviews for movie " + movieID);

    var start = 0;
    var number = 5;
    var sort = "";

    if(req.query && req.query.start) {
        start = parseInt(req.query.start);
    }
    if(req.query && req.query.number) {
        number = parseInt(req.query.number);
    }

    if(req.query && req.query.sort) {

        sort = req.query.sort
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

                if(sort == '-date') {

                    doc.reviews.sort(function(a, b) {
                        return b.date - a.date;
                    })

                }else if( sort == 'date') {

                    doc.reviews.sort(function(a, b) {
                        return a.date - b.date;
                    })
                }else if( sort == 'avg_stars') {

                    doc.reviews.sort(function(a, b) {
                        return a.stars - b.stars;
                    })
                }else if( sort == '-avg_stars') {

                    doc.reviews.sort(function(a, b) {
                        return b.stars - a.stars;
                    })
                }else if(sort == "default" || sort == "0") {     //default

                    doc.reviews.sort(function(a, b) {
                        return b.date - a.date;
                    })
                }
                
                doc.reviews = doc.reviews.slice(start, start + number);
                response.message = doc.reviews ?
                                    doc.reviews : []

            }
            console.log(response.message);
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
        stars : parseInt(req.body.stars),
        movie_id : req.params.movieID

    });
    
    var sum = parseInt(thisMovie.review_count) * parseFloat(thisMovie.avg_stars);
    thisMovie.review_count = parseInt(thisMovie.review_count) + 1;
    thisMovie.avg_stars = (sum + parseInt(req.body.stars) ) / parseInt(thisMovie.review_count );
    thisMovie.avg_stars = thisMovie.avg_stars.toFixed(1);
    console.log(thisMovie);

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
        .select("reviews review_count avg_stars")
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

module.exports.reviewsDeleteOne = function(req, res) {

    var movieID = req.params.movieID;
    var reviewID = req.params.reviewID;
    console.log("Delete reviewID " + reviewID + 
                    " from movieID " + movieID);

    Movie
        .findById(movieID)
        .select("reviews review_count avg_stars")
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
                    
                    console.log(thisMovie)
                    thisMovie.reviews.id(reviewID).remove();
                    var sum = parseInt(thisMovie.review_count) * parseFloat(thisMovie.avg_stars);
                    console.log(sum);
                    thisMovie.review_count = parseInt(thisMovie.review_count) - 1;
                    console.log(thisMovie.review_count);
                    if(thisMovie.review_count != 0) {

                        thisMovie.avg_stars = (sum - parseInt(req.query.stars) ) / parseInt(thisMovie.review_count);
                        console.log(thisMovie.avg_stars);
                        thisMovie.avg_stars = thisMovie.avg_stars.toFixed(1);

                    }else {
                        thisMovie.avg_stars = 0;
                    }

                    console.log(thisMovie.avg_stars);
                    console.log(thisMovie);
                    
                    thisMovie.save(function(err, updatedMovie) {
                        if(err) {
                            res
                                .status(500)
                                .json(err);
                        } else {
                            console.log(updatedMovie);
                            res
                                .status(204)
                                .json();
                        }
                    });
                }
            }
        });
}


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
                console.log(thisMovie);
                
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
                    
                    thisReview.votes = JSON.parse(req.body.votes);
                    thisReview.movieID = req.params.movieID;
                    thisReview.date = req.body.date;

                    console.log(thisReview);
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