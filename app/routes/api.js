var User = require('../models/user.js');
var config = require('../../config.js');
var secretKey = config.secretKey;


module.exports = function (app, express) {


    var api = express.Router();

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
    
    api.get('/users', function(req, res) {
     
            User.find({}, function(err, users){
                if(err)  {
                    res.send(err); 
                    return; 
                }
                res.json(users); 
            })
            
    })
    
    
    
    

    return api; 
}