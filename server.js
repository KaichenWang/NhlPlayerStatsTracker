var express = require('express');
var fs = require('fs');
var request = require('request');
var compression = require('compression');
var app = express();
var path = require('path');

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(express.static('./'));

if (process.env.NODE_ENV === 'development') {
    app.listen('8081');
}
if (process.env.NODE_ENV === 'production') {
    app.listen(server_port, server_ip_address, function () {

        console.log( "Listening on " + server_ip_address + ", server_port " + server_port  );

    });
}

exports = module.exports = app;