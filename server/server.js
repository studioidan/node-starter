var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var _ = require('lodash');
var config = require('./config');

var app = express();

//add middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// CORS Support
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.static(__dirname + '/public'));

//connect to database
mongoose.connect(config.database);
mongoose.connection.once('open', function () {
    // Load the models.
    app.models = require('./models/index');
    
    var movieController = require('./controllers/MovieController');
    app.use('/api', movieController);

    app.use('/', function (req, res) {
        res.sendFile('/index.html');
    });

    app.listen(config.port);
    console.log("listening on port: " + config.port);
});