var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var http = require('http');
var socketIO = require('socket.io');
const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validator');
const {Users} = require('./utils/users');

var app = express();
var server = http.createServer(app);
var io = socketIO(server)
var port = process.env.PORT||3000;
var users = new Users();

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
})

// for everyone
io.on('connection', (socket) => {
  console.log('New user connected');

 

  socket.on('join', (params,callback) =>{
    if(!isRealString(params.name) || !isRealString(params.room)){
     return callback('Name and room name are required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    
     // for the current user
  socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
  // excludes the current user only
  socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined.`));
    callback();

  });
   
  socket.on('createMessage',(message,callback) =>{
    var user = users.getUser(socket.id);

    if(user && isRealString(message.text)){
      io.to(user.room).emit('newMessage',generateMessage(user.name,message.text))
    }

    
    callback('This is from the server');
    
  })

  socket.on('createLocationMessage',(cords) =>{
    var user = users.getUser(socket.id);
    
    if(user){
      io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name, cords.latitude ,cords.longitude))
    }
  })
  
  socket.on('disconnect', () =>{
    var user = users.removeUser(socket.id);

    if(user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} has left`))
    }
  })

})

// view engine setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = server;
