function Tank() {
  this._busyUntil = null; // in milliseconds, Unix-time
}

Tank.prototype.sayHello = function () {
  return "Hello!";
};

Tank.prototype.take = function (date) {

  if (this._busyUntil || this._busyUntil < Date.now()) return false;

  this._busyUntil = date;
  return true;
};

Tank.prototype.moveLeftCat = function (direction) {
  // left caterpillar

  this.stopLeftCat();

  if (direction === 'backward') {
    D12.write(0);
  } else {
    D14.write(0); // forward
  }
};

Tank.prototype.stopLeftCat = function () {
  D14.write(1);
  D12.write(1);
};

Tank.prototype.moveRightCat = function (direction) {
  // right caterpillar

  this.stopLeftCat();

  if (direction === 'backward') {
    D4.write(0);
  } else {
    D0.write(0); // forward
  }
};

Tank.prototype.stopRightCat = function () {
  D4.write(1);
  D0.write(1);
};

/** return a Tank */
exports = Tank;
