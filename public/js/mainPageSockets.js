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
        console.log(data[0])
        $("#userList").find('option').remove().end();
        for(var i = 0 ;i<userCount;i++){
            $('#userList').append($('<option></option>').val(data[i].user).html(data[i].user+" Race: "+data[i].userRace+ " Type: "+data[i].userType));
        }
    });
    socket.on('duelRequest', function (data) {
        var isMe = false;
        if(data.user2 == tartCraft.userdata.username){
            $("#acceptDuel").show();
            isMe = true;
        }
        if(isMe)
            alert("You have duel request");
        $("#dialogBox").append("\n"+ data.user1 + " proposed duel with " + data.user2);
    });
    socket.on('duelEnd', function (data) {
        if(data.winner == tartCraft.userdata.username)
            alert("You won the duel!");
        else{
            alert("You lost the duel :c");
            window.location.reload()
        }
    })
};
