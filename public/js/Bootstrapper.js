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
    socket.emit('login', {username:$("#loginuser").val(),password:$("#loginpass").val()});
    return false;
});
$("#register").submit(function() {
    socket.emit('register', {username:$("#reguser").val(),password:$("#regpass").val()});
    return false;
});
socket.on('login', function(data) {
    if(data){
        console.log('login successful');
        document.getElementById('result').innerHTML = 'login successful';
    }
    else{
        console.log('login not successful');
        document.getElementById('result').innerHTML = 'login not successful';
    }
});
socket.on('register', function(data) {
    if(data){
        console.log();
        document.getElementById('result').innerHTML = 'You can log in now';
    }
    else{
        console.log('Registeration failed');
        document.getElementById('result').innerHTML = 'Registeration failed';
    }
});

};

