#tartCraft
tartCraft is a browser based MMORPG game written with javascript, nodeJS and socket.io

##Install
1.  Be sure you have node.js and git installed.
2.  Get both files from the repository.
3.  In your application directory run ```npm install```

### Running the server
* In "index.html" file, change localhost address with your ip address or domain for enabling access from outside.
* Run ```node app``` in your application directory.

### Running the client
* Browse to ```yourdomain:1337```.

Current State
-------------
In current state, you will be seeing login and register forms. You can create a user with the register form, and when you submit the form, you will be given the result of the registeration. The result is either:
  *  Success: Your user has been created and you can log in
  *  Fail: The user already exist or something fishy is going on

After successful registration, you can use the newly created user to log in. Simply use the log in form to log in to the system. You will, again, be given the result of your log in. The result is either:
  *  Success: Log in was successful
  *  Fail: No such username or a username with such password exists in the server. Or something fishy is going on.


Next Step
---------
User should pick character class and type during registration.
User should get their user data from the server on successful log in.
Interface should be more beautiful (We can use the beautiful beautiful features of express and jade, or we can make custom).
Input check during registration.

Bugs
----
Bugs should be reported to [issues](https://github.com/tart-summer-camp/tartCraft/issues) page.
