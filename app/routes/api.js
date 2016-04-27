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
            phone_number: req.body.phone_number,
            address: req.body.address,
            age: req.body.age

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
    
    
    api.use(function(req,res, next){
        
        console.log("Somebody just came to our app!"); 
        
        var token = req.body.token || req.param('token') || req.headers['x-access-token'];
        
        // check if token exists
        if(token) {
            
            jsonwebtoken.verify(token, secretKey, function(err, decoded){
                
                if(err) {
                    res.status(403).send({ success: false, message: "Failed to authenticate user"});
                    
                } else {
                    
                    req.decoded = decoded; 
                 
                    next(); 
                }
            });
        } else {
            res.status(403).send({ sucess: false, message: "No Token Provided"});
        }
    });
    
    
    // to pass the middleware you must provide a legitimate token ... DESTINATION B
    
    api.get('/', function(req, res){
        
        res.json("Hello from the other side!");
         
    });
    
    
    return api; 
    
}