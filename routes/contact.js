var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET contact page. */
router.get('/', function(req, res, next) {
	console.log("getting contact route");
  res.render('contact', { title: 'Contact' });
  console.log("getting contact route");
});

/* GET contact page. */
router.post('/send', function(req, res, next) {
  console.log("Sending message",req);
  var transporter = nodemailer.createTransport({
  	service:'Gmail',
  	auth: {
  		user:'benjaminbb@gmail.com',
  		pass:'YOURPASSWORD'
  	}
  });
  var mailoptions = {
  	from: req.body.name +" - "+req.body.email,
  	to: "Ben <benjaminbb@gmail.com>",
  	subject : "Website submission",
  	text: "This is an email from "+ req.body.name +" - "+req.body.email+ " Message: "+ req.body.message,
  	html:"<h1>This is a new email</h1><br>"+req.body.name +" - "+req.body.email+ "<br/> Message: "+ req.body.message
  }

  transporter.sendMail(mailoptions, function(error, info){
  	if(error){
  		console.log(error);
  		res.redirect('/');
  	}
  	else{
  		console.log("message sent:", info.response);
  		res.redirect('/');
  	}
  })

});

module.exports = router;
