
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
  var file = req.files.file;
  if (file) return res.send(200);
  res.send(400);
});

app.post('/upload/body', function(req, res){
  res.status(200);
  res.setHeader('Content-Type', req.headers['content-type']);
  res.setHeader('Content-Length', req.headers['content-length']);
  req.pipe(res);
});

app.post('/failure', function(req, res){
  res.send(500, 'something blew up');
});

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/..'));

app.listen(4000);
console.log('listening on port 4000');
