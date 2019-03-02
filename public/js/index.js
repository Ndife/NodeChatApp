var socket = io();
        
socket.on('connect', function() {
    console.log('Connected to server');   
});

socket.on('disconnect', function(){
    console.log('Disconnected from server');
})

socket.on('newMessage', function(message){
    console.log('New Message', message);
    const li = jQuery('<li></li>');
    li.text(`${message.from} : ${message.text}`)

    jQuery('#messages').append(li);
})

jQuery('#message-from').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessage',{
        from:'Admin',
        text: jQuery('[name=message]').val()
    },function(){

    })
})

