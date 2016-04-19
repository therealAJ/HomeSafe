var mongoose = require('mongoose');

var Schema = mongoose.Schema; 

var UserBusRoutes = new Schema({
    
    buses: [Number]
    
})