/**
 * tartCraft - socket bindings
 *
 * This file socket.on events.
 */

tartCraft.loginPageSockets = function (socket) {
    this.userdata={};
    socket.on('login', function (data) {
        if (data.status) {
            tartCraft.userdata=data.user;
            document.getElementById('result').innerHTML = 'login successful';
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
        document.getElementsByTagName('body')[0].innerHTML = data;
        $('#usertInfoText').append(tartCraft.userdata.username+" ("+tartCraft.userdata.race+": "+tartCraft.userdata.type+") ");
        tartCraft.mainPageEvents(socket);
        tartCraft.mainPageSockets(socket);
    });
};
