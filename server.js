var http = require('http');
var express = require('express');
 
var app = express();
app.set('port', process.env.PORT || 3000); 
 
app.get('/', function (req, res) {
  res.send('<html><body><h1>Hello World</h1><p>home of pick-a-park-api<br>use <pre>/api?latitude=123&longitude=234&feature=abc</pre></body></html>');
});

app.get('/api', function (req,res) {
  // res.send(req.query.latitude + ' ' + req.query.longitude + ' ' + req.query.feature);

  // sql query goes here, perhaps...

  var response_data = {
    'request': {
      'latitude': req.query.latitude, 
      'longitude': req.query.longitude, 
      'feature': req.query.feature
    'response': {
      'field1': 'some data from the server'
    }
    }
  }

  // http://expressjs.com/api.html#res.json
  res.json(response_data);
});
 
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});