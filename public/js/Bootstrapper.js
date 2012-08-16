/**
 * Created with JetBrains PhpStorm.
 * User: ozangh
 * Date: 8/16/12
 * Time: 11:45 AM
 */
var tartcraft = {};

tartcraft.Bootstrapper = function(){

var socket = io.connect('http://' + window.location.host); //get current host address to set nodejs server location automatically

$("#login").submit(function() {
    socket.emit('login', { username:$("#loginuser").val(), password:$("#loginpass").val() });
    return false;
});

$("#register").submit(function() {
    socket.emit('register', { username:$("#reguser").val(), password:$("#regpass").val(), race:$("#regrace").val(), type:$("#regracetype").val()});
    return false;
});

$("#regrace").change(function(){
    var selectedRace = $("#regrace").val();
    socket.emit('getRace', {race:selectedRace});

});

socket.on('catchRace', function(data){
    $("#regracetype").find('option').remove().end();
    for (var typeRace in data.raceTypes){
        $("#regracetype").append($('<option></option>').val(data.raceTypes[typeRace]).html(data.raceTypes[typeRace]));
    }
});

socket.on('login', function(data) {
    console.log(data);
    if(data.status){
        console.log('login successful');
        document.getElementById('result').innerHTML = 'login successful';
        socket.emit('loginSuccess', data);
    }
    else{
        console.log('login not successful');
        document.getElementById('result').innerHTML = data.error.text;
    }
});

socket.on('register', function(data) {
    console.log(data);
    if(data.status){
        console.log();
        document.getElementById('result').innerHTML = 'You can log in now';
    }
    else{
        console.log('Registeration failed');
        document.getElementById('result').innerHTML = data.error.text;
    }
});

};

