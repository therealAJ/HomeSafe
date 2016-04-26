var mongoose = require('mongoose'); 

var Schema = mongoose.Schema; 
var bcrypt = require('bcrypt-nodejs');


var UserSchema = new Schema({
    
    first_name: String, 
    last_name: String, 
    email: { type: String, trim: true, required: 'Email address is required', index: { unique: true }, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']},
    username: { type: String, required: 'Username is required', index: { unique: true }},
    password: { type: String, required: 'Password is required', select: false}, 
    phone_number: { type: String, required: 'Phone number is required', index: { unique: true }}, 
    address: { type: String, required: 'Home Address is required', index: { unique: true}}
    
});


UserSchema.pre('save', function(next) {
    
    var user = this; 
    
    if(!user.isModified('password')) return next(); 
    
    bcrypt.hash(user.password, null, null, function(err, hash) {
        
        if(err) {
            return next(err); 
        } else {
            user.password = hash; 
            next(); 
        }
    });
});

UserSchema.methods.comparePassword = function(password) {
    
    var user = this; 
    
    return bcrypt.compareSync(password, user.password); 
    
}

module.exports = mongoose.model('User', UserSchema);