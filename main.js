var WIFI_NAME = require("wifiConfig").name;
var WIFI_OPTIONS = require("wifiConfig").options;

var Tank = require("tank");
var tank = new Tank();

var ServoCam = require("servoCam");
var servoCam = new ServoCam();

// init microcontroller
function onInit() {

  var wifi = require("Wifi");

  wifi.connect(WIFI_NAME, WIFI_OPTIONS, function(err) {
    if (err) {
      console.log("Connection error: " + err);
      return;
    }
    console.log("Connected!");
    console.log("IP: " + wifi.getIP().ip);

    var server = require('ws').createServer(onPageRequest);
    server.listen(8251);
    server.on("websocket", function(ws) {
      ws.on('message',function(msg) {
        eventBus.trigger(msg);
        print("[WS] " + JSON.stringify(msg)); });
      ws.send("Hello!");
    });
  });

}

function onPageRequest(req, res) {
  // do something
}

// event bus
var eventMixin = require("eventMixin");

function EventBus() {}

for(var key in eventMixin) {
  EventBus.prototype[key] = eventMixin[key];
}

var eventBus = new EventBus();

eventBus.on('leftCat-forward-on', function () {
  tank.moveLeftCat();
});
eventBus.on('leftCat-forward-off', function () {
  tank.stopLeftCat();
});
eventBus.on('leftCat-backward-on', function () {
  tank.moveLeftCat('backward');
});
eventBus.on('leftCat-backward-off', function () {
  tank.stopLeftCat();
});

eventBus.on('rightCat-forward-on', function () {
  tank.moveRightCat();
});
eventBus.on('rightCat-forward-off', function () {
  tank.stopRightCat();
});
eventBus.on('rightCat-backward-on', function () {
  tank.moveRightCat('backward');
});
eventBus.on('rightCat-backward-off', function () {
  tank.stopRightCat();
});
eventBus.on('servoCam-pos1', function () {
  servoCam.moveToPos1();
});
eventBus.on('servoCam-pos2', function () {
  servoCam.moveToPos2();
});
eventBus.on('servoCam-pos3', function () {
  servoCam.moveToPos3();
});