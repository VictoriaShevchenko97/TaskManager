mod={};
var io = app.core.io,
	http=app.core.http,
    server=http.Server(app),
    io = io(server);
/*############
Server to CLIENT
############
io.on('connection', function(socket) {  
    socket.emit('announcements', { message: 'A new user has joined!' });
});*/

io.on('connection', function(socket) { 
    
    console.log('connection start'); 
    
    socket.on('event', function(data) {
    	var auth=require(__dirname+'/auth');
    	var data_user=auth.CheckUser(data.login, data.password,function(){
    		if(auth.exist!=0){
                socket.emit('exist',{message:auth.exist});
            }    
    		else{
    			socket.emit('exist',{message:0});
    		}
    	});
    	
    });
    
    socket.on('register',function(data){
        var reg=require(__dirname+'/register');
        var data_user=reg.CheckUser(data.login, function(){
            if(reg.exist==1){
                socket.emit('exist',{message:'Логин занят!'});               
            }
            else{
                reg.Register(data.login, data.password,function(){
                    socket.emit('succes_reg',{message:'Вы успешно зарегистрировались', id:reg.id});
                });              
            }
        });
    })
});
server.listen(3000);
