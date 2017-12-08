import socket
import struct
import json
import urllib2

DIRT_IP = "127.0.0.1"
DIRT_PORT = 20777

sock = socket.socket(socket.AF_INET,socket.SOCK_DGRAM) 
sock.bind((DIRT_IP, DIRT_PORT))

def parse(bytefrom,byteto):
	ParsedData = struct.unpack('f',data[bytefrom:byteto])
	return ParsedData[0]
def sendToServer(data):
    req = urllib2.Request('http://127.0.0.1:3000/data')
    req.add_header('Content-Type', 'application/json')
    response = urllib2.urlopen(req, json.dumps(data))
	
	
while True:
    data, addr = sock.recvfrom(512)
    time = parse(0,4)
    speed = int(parse(28,32)*3.6)
    gear = int(parse(132,136))
    distance = int(parse(8,12))
    distance2 = int(parse(12,16))
    brake = int(parse(124,128))
    throttle = int(parse(116,120))
    engineSpeed = int(parse(148,152)/100)
    PostData = {'gear':gear,'speed':speed,'rpm':engineSpeed,'brake':brake, 'throttle':throttle}
    sendToServer(PostData)
