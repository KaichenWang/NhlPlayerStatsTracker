var express = require('express');
// var fs = require('fs');
// var request = require('request');
// var compression = require('compression');
var app = express();
var path = require('path');

var PORT = process.env.PORT || 8080;

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.use(express.static('./dist'));

if (process.env.NODE_ENV === 'development') {
    app.listen(PORT, function () {
        console.log('localhost:' + PORT);
    });
}

exports = module.exports = app;