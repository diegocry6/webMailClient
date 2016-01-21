var express = require('express');
var router = express.Router();
var session = require('express-session');
var bodyParser = require("body-parser");
var cors = require('cors');

router.use(cors());

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.post('/', function(req, res, next){

		if ( req.session.usuario ) {
	
	var Client = require('node-poplib-gowhich').Client;
	var client = new Client({
		  hostname: 'mail.diego.com',
		  port:  110,
		  tls: false,
		  mailparser: true,
		  username: req.session.usuario,
		  password: req.session.password
});
client.connect(function() {
  client.retrieveAll(function(err, messages) {
	var emails = [];
	messages.forEach(function(message) {
		emails.push({
		'Remitente': message.headers.from,
		'Asunto': message.subject,
		'Cuerpo': message.text,
		'Fecha': message.date	
	});
	});
    res.send(emails);
    client.quit();
  });
});
} else {

	res.redirect('http://127.0.0.1:3000/');
}
});

router.get('/cerrar', function(req, res, next){

		    req.session.usuario = null;
		    req.session.password = null;
		    res.redirect('http://127.0.0.1:3000/');

});

router.get('/escribir', function(req, res, next){

	if ( req.session.usuario ) {

		    res.render('escribir', { title: 'Escribir Email' });

	} else res.redirect('http://127.0.0.1:3000/');

});

router.post('/escribir', function(req, res) {

		if ( req.session.usuario ) {

var email   = require('emailjs');
var server  = email.server.connect({
   host:    "mail.diego.com", 
   ssl:     false
});

server.send({
   text:    req.body.mensaje, 
   from:    req.session.usuario + "@mail.diego.com", 
   to:      req.body.emaildestino,
   subject: req.body.asunto
}, 

function(err, message) { 

if (err) {

console.log(err); 

} else {

res.redirect('/users');

}

});

} else {

	res.redirect('http://127.0.0.1:3000/');
}

});

module.exports = router;
