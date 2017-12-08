var express = require('express');
var app = express();
var serv = require('http').Server(app);
app.use('/',express.static(__dirname + '/client'));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var io = require('socket.io')(serv,{});
var GameData = {'gear':0,'speed':0,'rpm':0,'brake':0, 'throttle':0}

app.post('/data', function (req, res) {
  console.log(req.body);
  res.end();
  GameData = req.body;
});

serv.listen(3000);

var SOCKET_LIST = [];

    var io = require('socket.io')(serv,{});
    io.sockets.on('connection', function(socket){
    	socket.id = Math.random();
    	SOCKET_LIST[socket.id] = socket;

    	socket.on('disconnect',function(){
    		delete SOCKET_LIST[socket.id];
    	});
    });

setInterval(function(){
	
    	for(var i in SOCKET_LIST){
    		var socket = SOCKET_LIST[i];
    		socket.emit('GameData',GameData);
		}
		
},1000/60);
