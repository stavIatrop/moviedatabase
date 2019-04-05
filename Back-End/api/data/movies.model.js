var mongoose = require('mongoose');

var votesSchema = new mongoose.Schema( {
    like : Number,
    dislike : Number
})

var reviewSchema = new mongoose.Schema( {
    username : String,
    votes : votesSchema,
    user_id : String,
    text : String,
    movie_id : String,
    stars : {
        type : Number,
        min : 0,
        max : 5,
        default : 0
    },
    date : {
        type : Date,
        default : Date.now
    }
})

var movieSchema = new mongoose.Schema( {
    title : {
        type : String,
        required : true
    },
    year : Number,
    cast : [String],
    genres : [String],
    avg_stars :  {
        type : Number,
        min : 0,
        max : 5,
        default : 0
    },
    review_count : Number,
    reviews : [reviewSchema],
    description : String,
    relevance: Number

})

mongoose.model('Movie', movieSchema, 'movies');