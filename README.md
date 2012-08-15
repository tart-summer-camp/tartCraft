tartCraft
=========
tartCraft is a browser based MMORPG game written with javascript, nodeJS and socket.io

Install
=======
0.  Be sure you have nodeJS installed on your computer.
1.  Set up your server
	1.  Open command line.
	2.  Type ```express <directory name>```
	3.  cd into that directory.
	4.  run ```npm install socket.io```
	5.  run ```npm install express@2```
	6.  Place the files in git repository inside your new project folder.
	7.  run ```node app```.
2.  Run the client
	2.  Load ```localhost:1337``` in your browser, and you are done.

Current State
=============
In current state, you will be seeing login and register forms. You can create a user with the register form, and when you submit the form, you will be given the result of the registeration. The result is either:
  *  Success: Your user has been created and you can log in
  *  Fail: The user already exist or something fishy is going on

After successful registration, you can use the newly created user to log in. Simply use the log in form to log in to the system. You will, again, be given the result of your log in. The result is either:
  *  Success: Log in was successful
  *  Fail: No such username or a username with such password exists in the server. Or something fishy is going on.


Next Step
=========
User should pick character class and type during registration.
User should get their user data from the server on successful log in.
Interface should be more beautiful (We can use the beautiful beautiful features of express and jade, or we can make custom).
Input check during registration.

Bugs
====

