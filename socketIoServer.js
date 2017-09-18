/**
	
*/
var app = require('http').createServer();
var io = require('socket.io')(app);
var PORT = 3000;

var clientCount = 0;

app.listen(PORT);

console.log('chat server listen:' + PORT);

io.on('connection',function(socket){
	clientCount ++;
	socket.nickname = '用户' + clientCount;
	io.emit('enter',{type: 'enter',message:socket.nickname + '加入聊天'});
	
	socket.on('message',function(data){
		io.emit('message',data);
	});

	socket.on('disconnect',function(){
		io.emit('leave',{type:'leave',message:socket.nickname + '退出聊天'});
	})
})