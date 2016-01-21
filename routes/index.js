var express = require('express');
var router  = express.Router();
var LdapClient = require('node-ldap');
var session = require('express-session');

router.get('/', function(req, res) {
    res.render('login', { title: 'Mail Login Page' });
});

router.post('/', function(req, res) {

		var client = new LdapClient({
		    ldapUrl: 'ldap://192.168.1.2:389',
		    userDn: 'cn=' + req.body.usuario + ',ou=mailUsers,dc=diego,dc=com',
		    password: req.body.password
		});
		 
		client.auth('cn=' + req.body.usuario + ',ou=mailUsers,dc=diego,dc=com', req.body.password).then(function() {
		    req.session.usuario = req.body.usuario;
		    req.session.password = req.body.password;
		    res.redirect('/users');
		}).catch(function(err) {
		    console.error(err);
		    res.redirect('/');	    
		});

});



module.exports = router;
