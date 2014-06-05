var redis = require('redis');
var client = redis.createClient();
var http = require('http');

client.subscribe('demo');

client.on('message', function(channel, message) {
  for(var i = 0; i < clients.length; i++) {
    clients[i].write("data: " + message + "\n\n");
  }
});

var clients = [];

http.createServer(function (req, res) {
  clients.push(res);

  res.writeHead(200, { "Content-Type":"text/event-stream", "Cache-Control":"no-cache", "Connection":"keep-alive", "Access-Control-Allow-Origin": '*' });
  res.write("retry: 10000\n");
  res.write("event: push\n");
}).listen(4242, "0.0.0.0");
