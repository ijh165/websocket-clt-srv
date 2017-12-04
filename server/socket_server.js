var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.json({message: 'this is the server endpoint'});
});

var http = require('http');
var server = http.createServer(app);
server.listen(3000);

var io = require('socket.io').listen(server);
io.on('connection', function (socket) {
	socket.on('compute', function (data) {
		console.log('number = ' + data.number);
		socket.emit('result', {
			result: (data.number+3)
		});
	});
});