var express = require('express');
var path = require('path');
var app = express();
var PORT = process.env.PORT || 8080;

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/docs/index.html'));
});

app.use(express.static('./docs'));

if (process.env.NODE_ENV === 'development') {
    app.listen(PORT, function () {
        console.log('localhost:' + PORT);
    });
}

exports = module.exports = app;