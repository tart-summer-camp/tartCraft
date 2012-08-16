/**
 * tartCraft - socket bindings
 *
 * This file socket.on events.
 */

tartCraft.bindSockets = function (socket) {

    socket.on('login', function (data) {
        if (data.status) {
            document.getElementById('result').innerHTML = 'login successful';
            socket.emit('loginSuccess', data);
        }
        else {
            console.log('login not successful');
            document.getElementById('result').innerHTML = data.error.text;
        }
    });

    socket.on('register', function (data) {
        if (data.status) {
            document.getElementById('result').innerHTML = 'You can log in now';
        }
        else {
            document.getElementById('result').innerHTML = data.error.text;
        }
    });

    socket.on('catchRace', function (data) {
        $("#regracetype").find('option').remove().end();
        for (var typeRace in data.raceTypes) {
            $("#regracetype").append($('<option></option>').val(data.raceTypes[typeRace]).html(data.raceTypes[typeRace]));
        }
    });

    socket.on('mainPageData', function (data) {
        document.getElementById('indexcontainer').innerHTML = data;
    });
};
