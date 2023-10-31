const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/userController');

router.route('/registerUser')
    .post(moviesController.validateBody,moviesController.registerUser)

router.route('/login')
    .post(moviesController.login)

module.exports = router;