/**
 * tartCraft - event bindings
 *
 * This file contains instant jQuery event binding of UI elements.
 */

tartCraft.bindEvents = function (socket) {

    // Login form submit event
    $("#login").submit(function () {
        socket.emit('login',
            {
                username:$("#loginuser").val(),
                password:$("#loginpass").val()
            }
        );
        return false;
    });

    // Register form submit event
    $("#register").submit(function () {
        socket.emit('register',
            {
                username:$("#reguser").val(),
                password:$("#regpass").val(),
                race:$("#regrace").val(),
                type:$("#regracetype").val()
            }
        );
        return false;
    });

    // Register form race select change event
    $("#regrace").change(function () {
        var selectedRace = $("#regrace").val();
        socket.emit('getRace',
            {
                race:selectedRace
            }
        );
    });
};
