var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');

module.exports.search = function(req, res) {

    var searchString = "";
    if(req.query.searchString) {
        searchString = req.query.searchString;
    }
    
    var start = 0;
    if(req.query.start) {
        start = req.query.start;
    }

    var perPage = 5;
    if(req.query.perPage) {
        
        perPage = req.query.perPage;
    }

    var sort = "";
    if(req.query.sort) {
        sort = req.query.sort;
    }

    
    var searchWords = searchString.trim().split(/\s+/).filter(Boolean);
    // console.log(searchWords);
    // console.log(start);
    // console.log(perPage);
    // console.log(sort);

    
    
    Movie
        .find()
        .sort(sort)
        .exec(function(err, docs) {
            if(err) {
                console.log("Error finding movies");
                res
                    .status(500)
                    .json(err)
            }else {

                console.log("Retrieved data for " +
                            docs.length + " movies");

                docs2 = [];
                // relevance = [];
                var docs2Length = 0;

                for(var i = 0; i < docs.length; i++ ) {
                    
                    var relevance = 0;
                    var titleWords = docs[i].title.trim().split(/[ ,]+/).filter(Boolean);
                    var genres = docs[i].genres; 

                    for(var j = 0; j < searchWords.length; j++) {

                        
                        //console.log(titleWords);
                        

                        for( var k = 0; k < titleWords.length; k++) {

                            // console.log(titleWords[k].toUpperCase());
                            // console.log(searchWords[j].toUpperCase());
                            // console.log(titleWords[k].toUpperCase() === searchWords[j].toUpperCase());
                            if(titleWords[k].toUpperCase() === searchWords[j].toUpperCase()) {      //if search word matches the title
                                
                                
                                //docs2.push(docs[i]);
                                relevance++;

                            } 
                        }

                        
                        //console.log(genres);

                        for( var k = 0; k < genres.length; k++) {

                            if(genres[k].toUpperCase() === searchWords[j].toUpperCase()) {      //if search word matches one of genres
                            
                                //docs2.push(docs[i]);
                                relevance++;
                            } 
                        }
                        // console.log(parseInt(searchWords[j]));
                        // console.log(docs[i].year);
                        // console.log(!isNaN( parseInt(searchWords[j])));

                        if(!isNaN( parseInt(searchWords[j]) )  ) {              //if search word is a number

                            if(docs[i].year == parseInt(searchWords[j])) {      //if search word matches year
                                relevance++;
                            }
                        } 
                        
                    }

                    if(relevance > 0 ) {

                        docs2.push(docs[i]);
                        docs2[docs2Length].relevance = relevance;
                                                
                        docs2Length++;
                    }
                    
                }
                if(sort == "relevance") {

                    docs2.sort(function(a, b) {
            
                        return b.relevance - a.relevance;
                    })

                }
                var numberOfResults = docs2.length;
                
                docs2 = docs2.slice(parseInt(start), parseInt(start) + parseInt(perPage));
                
                var results = [{ numberOfResults : numberOfResults , docs2 : docs2}];
                
                res
                    .status(200)
                    .json(results);
            }
            
    });  

}


module.exports.moviesGetAll = function(req, res) {
    
    var start = 0;
    var number = 5;
    var maxNumber = 10;
    var sort = "";

    if(req.query && req.query.start) {
        start = parseInt(req.query.start);
    }
    if(req.query && req.query.number) {
        number = parseInt(req.query.number);
    }

    if(req.query && req.query.sort) {
        sort = req.query.sort;
    } 

    if(isNaN(start) || isNaN(number)) {
        res
            .status(200)
            .json( { "message" :
                    "If supplied in querystring, start " +
                        "and number must be numeric"});
        return;
    }

    // if(number > maxNumber) {

    //     res
    //         .status(400)
    //         .json( { "message" :
    //                     "Max value for number is " + maxNumber});
    //     return;
    // }
    
    console.log(sort);

    Movie
        .find()
        .sort(sort)
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

module.exports.moviesUpdateOne = function(req, res) {

    var movieID = req.params.movieID;
    
    console.log("GET movie " + movieID);

    Movie
        .findById(movieID)
        .select("-reviews")
        .exec(function(err, doc) {
            var response = {
                status : 200,
                message : doc
            }
            if(err) {
                console.log("Error finding movie");
                response.status = 500;
                response.message = err;
            }else if (!doc){
                response.status = 404;
                response.message = { "message" : 
                                        "Movie ID not found"};
            }
            console.log("Found movie " + movieID);
            if(response.status != 200) {

                res
                .status(response.status)
                .json(response.message);
            } else {
                doc.title = req.body.title;
                doc.stars = parseInt(req.body.stars);
                doc.year = parseInt(req.body.year);
                doc.cast =
                    splitArray(req.body.cast);
                doc.genres =
                    splitArray(req.body.genres);
                doc.review_count = parseInt(req.body.review_count);
                doc.description = req.body.description;

                doc.save(function(err, updatedMovie) {
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
            
            
        });    
};
