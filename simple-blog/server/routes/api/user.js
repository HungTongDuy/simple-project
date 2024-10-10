const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');
const userController = require('./../../controllers/userController');

/**
 * get all user
 */
router.get('/', userController.getAllUser);

/**
 * get a user
 */
router.get('/:id', userController.getUser);

/**
 * get a user profile
 */
router.get('/profile/:id', userController.getUserProfile);

/**
* adds a user
* body:
* {
*   "followers" : ["5b56d160a96e1f3e90e8f372"],
*   "following" : [ 
*       "5a99e2d7d227df0014b11d84", 
*       "5a9a05cd89b470001448884c"
*   ],
*   "name" : "Hung Tong",
*   "provider" : "google",
*   "email" : "kurtwanger40@gmail.com",
*   "provider_id" : "115802182259504053250",
*   "token" : "ya29.GlxyBXy8vXdkWnPIaTtpPvs-NwSlgbpgJDx9Fd7iLXUA1v5_F85xb2AnY0tANEiezbXbgQ-zh0AjlrDFLncG5xX54eXnOnabHQ9KlqspyOvwUrTVxhVOVPacQDn6Tg",
*   "provider_pic" : "https://lh6.googleusercontent.com/-3cW9IIWyj7k/AAAAAAAAAAI/AAAAAAAAAB8/-n4_jPAkwm4/s96-c/photo.jpg"
* }
 */
router.post('/', userController.addUser);

/**
 * edit a user
 */
router.patch('/', userController.editUser);

/**
 * follow a user
 */
router.post('/follow', userController.followUser);

module.exports = router;