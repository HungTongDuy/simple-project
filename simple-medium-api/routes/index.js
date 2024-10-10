const express = require('express');
const router = express.Router();
var jwt    = require('jsonwebtoken');

// router.use('/api', function(req, res, next) {
// 	console.log('x-access-token');
// 	// check header or url parameters or post parameters for token
// 	var token = req.body.token || req.param('token') || req.headers['x-access-token'];
// 	var authen = req.headers['authenticate'];
// 	console.log('authen: ', authen);
// 	if(authen === true) {
// 		return;
// 	} else {
// 		// decode token
// 		if (token) {

// 			// verifies secret and checks exp
// 			jwt.verify(token, 'Long', function(err, decoded) {			
// 				if (err) {
//                     console.log(err);
// 					return res.json({ success: false, message: 'Failed to authenticate token.' });		
// 				} else {
// 					// if everything is good, save to request for use in other routes
// 					req.decoded = decoded;	
// 					next();
// 					//require('./api');
// 				}
// 			});

// 		} else {

// 			// if there is no token
// 			// return an error
// 			return res.status(403).send({ 
// 				success: false, 
// 				message: 'No token provided.'
// 			});
// 		}
// 	}
// });

router.use('/api', require('./api'));

router.use('/m', require('./signin'));

module.exports = router;