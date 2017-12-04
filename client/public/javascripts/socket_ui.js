var socket = io();

$(document).ready(function() {
	socket.on('displayResult', function(data){
		$("#result").html(data.result);
	});
});