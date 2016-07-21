var express = require("express");
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendfile('./app/views/index.html');
});

var port = 3000 || process.env.PORT;
app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Listening on port " + port);
    }
});
