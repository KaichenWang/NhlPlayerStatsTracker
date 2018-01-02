var express = require('express');
var fs = require('fs');
var request = require('request');
var app = express();
var path = require('path');
var parseString = require('xml2js').parseString;

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.get('/player/pksubban', function (req, res) {
    var url = 'http://www.tsn.ca/mobile/bbcard.aspx?hub=NHL&name=PK+SUBBAN';
    var json = {};
    request(url, function (err, response, data) {
        if (err || response.statusCode != 200) {
            console.log('REQUEST ERROR: ' + err);
        }
        else {
            parseString(data, function (err, result) {
                if(!err){
                    json = JSON.parse(JSON.stringify(result));
                }
            });
        }
        res.send(json);
    })
})

app.get('/player/sheaweber', function (req, res) {
    var url = 'http://www.tsn.ca/mobile/bbcard.aspx?hub=NHL&name=SHEA+WEBER';
    var json = {};
    request(url, function (err, response, data) {
        if (err || response.statusCode != 200) {
            console.log('REQUEST ERROR: ' + err);
        }
        else {
            parseString(data, function (err, result) {
                if(!err){
                    json = JSON.parse(JSON.stringify(result));
                }
            });
        }
        res.send(json);
    })
})

app.get('/search', function (req, res) {
    var value = req.query.value
    var url = 'https://suggest.svc.nhl.com/svc/suggest/v1/minactiveplayers/' + value + '/99999';
    var json = {};
    request(url, function (err, response, data) {
        if (err || response.statusCode != 200) {
            console.log('REQUEST ERROR: ' + err);
        }
        else {
            json = data;
            var test = json

        }
        res.send(json);
    })
})

app.get('/poll', function (req, res) {
    var url = 'https://api.polldaddy.com/';
    var json = {};
    var requestData = {
        "pdRequest": {
            "partnerGUID": "1ee4c797-af30-2a28-cb75-0000049ec0d5",
            "userCode": "$P$BgdIE24QfRZp3WI9zdCuiKsts2c0PI0",
            "demands": {
                "demand": {
                    "poll": {
                        "id": "9559362"
                    }, "id": "GetPollResults"
                }
            }
        }
    };
    request({
        url: url,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: requestData
    }, function (err, response, data) {
        if (err || response.statusCode != 200) {
            console.log('REQUEST ERROR: ' + err);
        }
        else {
            if(data.pdResponse.hasOwnProperty('demands')){
                json = data.pdResponse.demands;
            }
        }
        res.send(json);
    })
})

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(express.static('src/public'));

// app.get('/*', function(req, res) {
//     res.redirect('/');
// });


if (process.env.NODE_ENV === 'development') {
    app.listen('8081');
}
if (process.env.NODE_ENV === 'production') {
    app.listen(server_port, server_ip_address, function () {

        console.log( "Listening on " + server_ip_address + ", server_port " + server_port  );

    });
}

exports = module.exports = app;
