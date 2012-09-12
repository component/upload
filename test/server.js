
/**
 * Module dependencies.
 */

var express = require('express');

var app = express();

app.use(express.logger('dev'));
app.use(express.bodyParser());

app.post('/upload', function(req, res){
  console.log(req.files);
});

app.listen(3000);
console.log('listening on port 3000');