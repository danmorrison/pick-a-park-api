var http = require('http');
var express = require('express');

// SQL Access
// Note: From the source, it currently only supports native sql server types.
// Query with explicit connection
// https://github.com/Azure/node-sqlserver/wiki

var sql = require('msnodesql');
var conn_str = "Driver={SQL Server Native Client 11.0};Server=tcp:yourserver.database.windows.net,1433;Database=parks;User ID=parks@hzbcrprwfg;Password=Cassie01;Trusted_Connection=False;Encrypt=True;Connection Timeout=30;";

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

  sql.open(conn_str, function (err, conn) {
    if (err) {
        console.log("Error opening the connection!");
        return;
    }
    conn.queryRaw("EXEC [Parks].[Find parks] " + req.query.latitude + ", " + req.query.latitude + ", '" + req.query.feature + "'", function (err, results) {
        if (err) {
            console.log("Error running query!");
            return;
        }
        for (var i = 0; i < results.rows.length; i++) {
            console.log("0:" + results.rows[i][0]);
        }
    });
  });

  var response_data = {
    'request': {
      'latitude': req.query.latitude, 
      'longitude': req.query.longitude, 
      'feature': req.query.feature
    },
    'response': [
      {'name': 'The Crescent Reserve Playground', 'latitude': -37.79409600, 'longitude': 144.91961600},
      {'name': 'Kensington Hall Reserve Playground', 'latitude': -37.78842300, 'longitude': 144.92751800},
      {'name': 'Liddy Street Reserve Playground', 'latitude': -37.78993400, 'longitude': 144.92578900},
      {'name': 'Mercantile Parade and Newman Street Playground', 'latitude': -37.79550300, 'longitude': 144.92038600},
      {'name': 'Bayswater Road Reserve Playground', 'latitude': -37.79371200, 'longitude': 144.92350700}
    ]
  }

  // Return a result as JSON
  // http://expressjs.com/api.html#res.json
  res.set('Content-Type', 'application/json');
  res.json(response_data);
});
 
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


