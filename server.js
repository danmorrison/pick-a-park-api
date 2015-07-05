var http = require('http');
var express = require('express');

// SQL Access
// Note: From the source, it currently only supports native sql server types.
var sql = require('node-sqlserver');
 
var app = express();
app.set('port', process.env.PORT || 3000); 

// return some helpful text if the base URL is called
// https://pickapark.azurewebsites.net/
app.get('/', function (req, res) {
  res.send('<html><body><h1>Hello World</h1><p>home of pick-a-park-api<br>use <pre>/api?latitude=123&longitude=234&feature=abc</pre></body></html>');
});

// call the API
// https://pickapark.azurewebsites.net/api?latitude=123&longitude=234&feature=abcdef
// currently only supports GET
app.get('/api', function (req,res) {
  // res.send(req.query.latitude + ' ' + req.query.longitude + ' ' + req.query.feature);

  // sql query goes here, perhaps...

  var response_data = {
    'request': {
      'latitude': req.query.latitude, 
      'longitude': req.query.longitude, 
      'feature': req.query.feature
    },
    'response': {
      'name': 'The Crescent Reserve Playground',
      'latitude': -37.79409600,
      'longitude': 144.91961600
    }
  }

  // Return a result as JSON
  // http://expressjs.com/api.html#res.json
  res.set('Content-Type', 'application/json');
  res.json(response_data);
});
 
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});