const router = require('express').Router();
const passport = require('passport');

router.use('/articles', require('./articles'));
router.use('/user', require('./user'));
router.use('/signin', require('./signin'));

module.exports = router;