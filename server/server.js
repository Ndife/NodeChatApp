var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var http = require('http');
var socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

var app = express();
var server = http.createServer(app);
var io = socketIO(server)
var port = process.env.PORT||3000

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
})

io.on('connection', (socket) => {
  console.log('New user connected');

  // for the current user
  socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));

  // excludes the current user only
  socket.broadcast.emit('newMessage',generateMessage('Admin','New user Joined'));

  socket.on('createMessage',(message) =>{
    console.log('createMessage',message);
    io.emit('newMessage',generateMessage(message.from,message.text))

    // socket.broadcast.emit('newMessage',{
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })
  })
  
  socket.on('disconnect', () =>{
    console.log('User left');
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
