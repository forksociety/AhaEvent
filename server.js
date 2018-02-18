var express = require('express'),
    mongoose = require('mongoose');
    
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(function(req, res, next) {
    console.log("Request from: ", req.get('User-Agent'));
    next();
});

app.get('/', function(req, res) {
    res.json({
        'hello': 'friend!'
    });
    //res.render('pages/index');
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
