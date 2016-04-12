var User = require('../models/user.js');
var config = require('../../config.js');
var secretKey = config.secretKey;
var jsonwebtoken = require('jsonwebtoken');

function createToken(user) {
    
   var token = jsonwebtoken.sign({
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
        },  secretKey, {
            expiresInMinute: 1440 
        });
    
    return token; 
}

module.exports = function (app, express) {


    var api = express.Router();
    
    //SIGNUP API

    api.post('/signup', function (req, res) {

        var user = new User({

            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            phone_number: req.body.phone_number

        })

        user.save(function (err) {

            if (err) {
                res.send(err);
                return;
            }
            
            res.json({ message: 'User has benn created!'});

        });
    });
    
    // GET ALL USERS API
    
    api.get('/users', function(req, res) {
     
            User.find({}, function(err, users){
                if(err)  {
                    res.send(err); 
                    return; 
                }
                res.json(users); 
            });
    });
    
    // LOGIN API 
    
    api.post('/login', function(req, res){
        
        User.findOne({
            username: req.body.username 
            
        }).select('password').exec(function (err, user){
            
            if(err) throw err;
            
            if(!user) {
                res.send({ message: "User doesn't exist"});   
            } else if(user) {
                
                var validPassword = user.comparePassword(req.body.password);
                
                if(!validPassword) {
                    res.send({ message: "Invalid Password"});
                } else {
                    
                    //token 
                    var token = createToken(user); 
                    
                    res.json({
                        success: true, 
                        message: "Successful login!",
                        token: token
                    });    
                }
            }
        });
    });
    
    
    
    

    return api; 
}