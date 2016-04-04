var mongoose = require('mongoose'); 

var Schema = mongoose.Schema; 



var UserSchema = new Schema({
    
    first_name: String, 
    last_name: String, 
    email: { type: String, trim: true, required: 'Email address is required', index: { unique: true }, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']},
    username: { type: String, required: 'Username is required', index: { unique: true }},
    password: { type: String, required: 'Password is required', select: false}, 
    phone_number: { type: String, required: 'Phone number is required', index: { unique: true }}
    
});

module.exports = mongoose.model('User', UserSchema);