var express = require('express');
var router = express.Router();

var moviesController = 
    require('../controllers/movies.controllers.js')

var usersController = 
    require('../controllers/users.controllers.js')

var reviewsController =
    require('../controllers/reviews.controllers.js');

router
    .route('/movies/:movieID/reviews')
    .get(reviewsController.reviewsGetAll)
    .post(reviewsController.reviewsAddOne);
  
router
    .route('/movies/:movieID/reviews/:reviewID')
    .get(reviewsController.reviewsGetOne)
    .put(reviewsController.reviewsUpdateOne)
    .delete(reviewsController.reviewsDeleteOne);

router
    .route('/movies')
    .get(moviesController.moviesGetAll)
    .post(moviesController.moviesAddOne);

router
    .route('/moviesCount')
    .get(moviesController.moviesGetCount);

router
    .route('/movies/:movieID')
    .get(moviesController.moviesGetOne)
    .put(moviesController.moviesUpdateOne)
    .delete(moviesController.moviesDeleteOne);

router
    .route('/search')
    .get(moviesController.search);

router
    .route('/profile/:username')
    .get(reviewsController.reviewsByUsername);
    
router
    .route('/users')
    .post(usersController.usersAddOne);

router
    .route('/users/:userID')
    .get(usersController.usersGetOne);
    
router
    .route('/login')
    .post(usersController.UserAuth);
    
module.exports = router;