var socket = io();

var gamedata;
socket.on('GameData',function(data){gamedata = data});
var motor_rpm = document.getElementById('motor_rpm');

function SetMotorRpmPicture(no){
	motor_rpm.src = "./motor_rpm/"+no+".png";
}

	setInterval(function(){
		SetMotorRpmPicture(gamedata.rpm)
	},1000/60);