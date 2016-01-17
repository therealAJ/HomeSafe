var express = require("express");
var app = express();

app.set('views', __dirname + '/server/views');

app.set('view engine', 'ejs');

app.get("/", function(req, res){
   res.render("index");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started!!");
});