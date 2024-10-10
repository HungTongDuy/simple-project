const router = require('express').Router();
const passport = require('passport');
var jwt    = require('jsonwebtoken');

router.post('/', passport.authenticate('local.signin'), (req, res) => {
    console.log('signin success', req.user);

    // var load = {
	// 	email: req.user.email,
	// 	name: req.user.name
	// }
	// var token = jwt.sign(load, 'superSecret', {
	// 	expiresIn: 3600 //expiresIn: 86400 // expires in 24 hours
	// });

	// res.json({
	// 	success: true,
	// 	message: 'Enjoy your token!',
	// 	token: token
    // });
    
    res.send(req.user)
});

module.exports = router;