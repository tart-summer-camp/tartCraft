/**
 * tartCraft - event bindings
 *
 * This file contains instant jQuery event binding of UI elements.
 */

tartCraft.mainPageEvents = function (socket) {

    // Chat message submission
    $("#chat").submit(function () {
        socket.emit('chatSend',
            {
                username:tartCraft.userdata.username,
                message:$("#chatMessage").val()
            }
        );
        $("#chatMessage").val("");
        return false;
    });

    // Clear button event
    $("#resetButton").click(function(){
        $("#dialogBox").text("");
    });
};
