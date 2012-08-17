/**
 * tartCraft - socket bindings
 *
 * This file socket.on events.
 */

tartCraft.mainPageSockets = function (socket) {
    socket.on('chatReceive', function (data) {
        $("#dialogBox").append("\n"+ data.username + " : " + data.message);
        var dBox = $('#dialogBox');
        dBox.scrollTop( dBox[0].scrollHeight - dBox.height() );
    });
    socket.on('onlineUserChanged',function(data){
        var userCount=data.length;
        $("#userList").find('option').remove().end();
        for(var i = 0 ;i<userCount;i++){
            $('#userList').append($('<option></option>').val(data[i].user).html(data[i].user));
        }
    });
};
