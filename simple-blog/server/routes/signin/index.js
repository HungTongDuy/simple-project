const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
var jwt    = require('jsonwebtoken');

//router.use('/signin', require('./signin_social'));

router.use('/signin', (req, res) => {
    // find the user
	User.findOne({
		email: req.body.email
	}, function(err, user) {
		if (err) throw err;
		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		} else if (user) {
            // if user is found and password is right
            // create a token
            var load = {
                email: user.email,
                name: user.name
            }
            var token = jwt.sign(load, 'superSecret', {
                expiresIn: 3600 //expiresIn: 86400 // expires in 24 hours
            });

            res.json({
                success: true,
                message: 'Enjoy your token!',
                user: user,
                token: token
            });
		}
	});
});

router.use('/singin_account', function(req, res) {
	console.log('authenticate');
	// find the user
	User.findOne({
		name: req.body.name
	}, function(err, user) {
		if (err) throw err;
		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		} else if (user) {
			// check if password matches
			if (user.password != req.body.password) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			} else {
				// if user is found and password is right
				// create a token
				var load = {
					admin: 'user.admin',
					name: 'HungTong'
				}
				var token = jwt.sign(load, 'superSecret', {
					expiresIn: 3600 //expiresIn: 86400 // expires in 24 hours
				});

				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}		
		}
	});
});

module.exports = router;