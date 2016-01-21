var express = require('express');
var router = express.Router();
var session = require('express-session');


router.get('/', function(req, res) {

	if ( req.session.usuario ) {

	res.render('users', { title: 'Mail Login Page' });

	} else {

	res.redirect('http://127.0.0.1:3000/');

	}

});

module.exports = router;
