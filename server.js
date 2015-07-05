var http = require('http');
http.createServer(function(req,res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  console.log("Hello World");
  res.end('Hello from Azure running node version: ' + process.version + '</br>');
}).listen(process.env.PORT || 3000);
console.log('Server running.');