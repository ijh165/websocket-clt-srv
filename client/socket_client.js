const REMOTE_SERVER_URL = 'http://192.168.7.1:3000/';

var express = require('express');
var path = require('path');

var app = express();

app.get('/', function(req, res) {
	res.redirect('/index.html');
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

var http = require('http');
var server = http.createServer(app);
server.listen(1234);

var io = require('socket.io').listen(server);
io.on('connection', function (socket) {});

var socketClient = require('socket.io-client').connect(REMOTE_SERVER_URL, {
	reconnection: true
});

socketClient.on('result', function (data) {
	console.log('result = ' + data.result);
	io.sockets.emit('displayResult', data);
});

var num = 0;
setInterval(function() {
	socketClient.emit('compute', {number: num});
	num = num + 1 % 50000; //prevent overflow
}, 1000);