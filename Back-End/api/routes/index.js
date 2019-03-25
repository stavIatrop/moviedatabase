var express = require('express');
var router = express.Router();

var moviesController = 
    require('../controllers/movies.controllers.js')

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
    
module.exports = router;