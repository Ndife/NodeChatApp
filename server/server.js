var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var socketIO = require('socket.io');


var app = express();
var server = http.createServer(app);
var io = socketIO(server)
var port = process.env.PORT||3000

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
})

io.on('connection', (socket) => {
  console.log('New user connected');


  socket.emit('newMessage',{
    from:'uche',
    text:'This is a new message',
    createdAt:'555'
  })

  socket.on('createMessage',(message) =>{
    console.log('New Message ',message);
  })
  
  socket.on('disconnect', () =>{
    console.log('User left');
  })

})

// view engine setup
// app.use(logger('dev'));
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
