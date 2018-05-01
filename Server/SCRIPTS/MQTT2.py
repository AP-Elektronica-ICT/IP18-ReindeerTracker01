import socket

UDP_IP = "168.235.64.81" #listen to this UDP port
UDP_PORT = 1884

TCP_IP = "168.235.64.81" #resend the packet to MQTT port
TCP_PORT = 1883

sock = socket.socket(socket.AF_INET,socket.SOCK_DGRAM)

sock.bind((UDP_IP,UDP_PORT))

while True:
    
    data,addr = sock.recvfrom(1024)
    print "received:",data
    if data:
        sendSock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sendSock.connect ((TCP_IP, TCP_PORT))
        sendSock.send(data)
        sendSock.close()
