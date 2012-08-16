/**
 * tartCraft bootstrapper
 *
 * Copyright 2012
 * Tart Summer Camp '12 Campers
 */

var tartCraft = {};

tartCraft.Bootstrapper = function () {

    // Get current host address to set nodejs server location automatically.
    var socket = io.connect('http://' + window.location.host);

    tartCraft.bindEvents(socket);

    tartCraft.bindSockets(socket);
};
