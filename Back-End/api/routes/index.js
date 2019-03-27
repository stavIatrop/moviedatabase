var express = require('express');
var router = express.Router();

var moviesController = 
    require('../controllers/movies.controllers.js')

var usersController = 
    require('../controllers/users.controllers.js')

router
    .route('/movies')
    .get(moviesController.moviesGetAll)
    .post(moviesController.moviesAddOne);

router
    .route('/moviesCount')
    .get(moviesController.moviesGetCount);

router
    .route('/movies/:movieID')
    .get(moviesController.moviesGetOne);

router
    .route('/users')
    .post(usersController.usersAddOne);

router
    .route('/users/:userID')
    .get(usersController.usersGetOne);
    
    
module.exports = router;