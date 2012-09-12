
/**
 * Module dependencies.
 */

var express = require('express');

var app = express();

app.use(express.logger('dev'));
app.use(express.bodyParser());

app.get('/', function(req, res){
  res.sendfile('test/tests.html');
});

app.post('/upload', function(req, res){
  console.log(req.files);
});

app.use(express.static(__dirname));

app.listen(3000);
console.log('listening on port 3000');