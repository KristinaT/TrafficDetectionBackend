/**
 * Created by kristinataneva on 8/29/17.
 */
var express = require('express');
var index = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
Congestion = require('./congestion');


index.use(bodyParser.json());
// Add headers
index.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    // Pass to next layer of middleware
    next();
});


//connect to Mongoose
mongoose.connect('mongodb://test:test@ds111124.mlab.com:11124/traffic_db');

var db=mongoose.connection;
index.get('/', function (req,res) {
    // body...
    res.send('go to /api/congestion');
});

//http get request
index.get('/api/congestion', function(req, res){
    //var user = req.query.param;
    //console.dir(user);
    //Movie.getMovie(user, function(err, movie){
    //    if(err){
    //        throw err;
    //    }
    //    res.json(movie);
    //});
    Congestion.find( function(err) {
        if(err){
            console.log(err);
        } else{
           return res;
        }
    });

});

index.get('/api/congestion/:id', function(req, res){
    //Movie.getMovieById(req.params.id, function(err, movie){
    //    if(err){
    //        res.send(err);
    //    }
    //    res.json(movie);
    //});
});

//http post request
index.post('/api/congestion', function(req, res){
    //console.dir(req.body.userId);
    //console.dir(req.body.Search);
    //var user = req.body.userId;
    //var movie = req.body.Search;
    //Movie.addMovie(user, movie, function(err, movie){
    //    if(err){
    //        res.send(err);
    //    }
    //    res.json(movie);
    //});
});


index.listen(3000);
console.log('running on port 3000...');

