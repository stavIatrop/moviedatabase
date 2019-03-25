var express = require('express');
var router = express.Router();

var moviesController = 
    require('../controllers/movies.controllers.js')

router
    .route('/movies')
    .get(moviesController.moviesGetAll)
    .post(moviesController.moviesAddOne);

<<<<<<< HEAD
router
    .route('/moviesCount')
    .get(moviesController.moviesGetCount);

router
    .route('/movies/:movieID')
    .get(moviesController.moviesGetOne);
    
=======
>>>>>>> 70f208448a3b108d6fcacce238506d19430a9093
module.exports = router;