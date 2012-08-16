/**
 * tartCraft - socket bindings
 *
 * This file socket.on events.
 */

tartCraft.mainPageSockets = function (socket) {
    socket.on('chatReceive', function (data) {
        $("#dialogBox").append("\n"+ data.username + " : " + data.message);
    });
};
