var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var _          = require('underscore');
var os         = require('os');

// ***********************
// ***********************
// Example usage of system-monitor
var monitoring = require('./../system-monitor/index.js');

// **** Custom Listener ****
var _la = monitoring.constructor('la');
_la = _.extend(_la, {
    persist: function(results) {
        var collection = monitoring.storage.collection(_la.configuration.collection);

        collection.insert({ createdAt: new Date(), value: results }, function(error, result) {
            if (error)
                console.log('Error while inserting metrics: ' + error);
        });
    },

    usage: function(callback) {
        callback(os.loadavg()[0]);
    }
});

console.log(_la);

monitoring.start();
// ***********************
// ***********************

// DB
var mongo = require('mongoskin');
var db    = mongo.db("mongodb://localhost:27017/system-monitor", {native_parser:true});

var routes = require('./routes/index');
var charts = require('./routes/charts');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/charts', charts);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
