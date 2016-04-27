var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

var sendEmail = function(email, code){
	// if (email != null){
	// 		console.log(email);
	// 		// create reusable transporter object using the default SMTP transport 
	// 		//var transporter = nodemailer.createTransport('smtps://' + config.gmailUser + ':' + config.gmailPass + '@smtp.gmail.com');
			
	// 		var auth = {
 // 				auth: {
 //    				api_key: config.mailgunAPI,
 //    				domain: config.mailgunDomain
 //  				}
	// 		}

	// 		var transporter = nodemailer.createTransport(mg(auth));
	// 		var htmlBody = '';
			
			
	// 		console.log(htmlBody);
	// 		// setup e-mail data with unicode symbols 
	// 		var mailOptions = {
	// 		    from: '"CourseWatcher Admin 👥" <' + config.gmailUser + ' >', // sender address 
	// 		    to: email, // list of receivers 
	// 		    subject: 'Course Notification for ' + request.department + request.courseNumber + ' ' + request.courseSection, // Subject line 
	// 		    html: '<b>' + htmlBody + '</b>' // html body 
	// 		};
			 
	// 		// send mail with defined transport object 
	// 		transporter.sendMail(mailOptions, function(error, info){
	// 		    if(error){
	// 		        return console.log(error);
	// 		    }
	// 		    console.log('Message sent: ' + info.response);
	// 		    request.isChecked = true;
	            
	// 		});
	// 	}
}

module.exports.run = sendEmail;