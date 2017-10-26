var s = require("servo").connect(D5);

function ServoCam() {
  this._currentPosition = null;
}

ServoCam.prototype.moveToPos1 = function () {
  if (this._currentPosition === 1) return false;
  this._currentPosition = 1;
  s.move(0, 3000);
  return true;
};

ServoCam.prototype.moveToPos2 = function () {
  if (this._currentPosition === 2) return false;
  this._currentPosition = 2;
  s.move(0.5, 3000);
  return true;
};

ServoCam.prototype.moveToPos3 = function () {
  if (this._currentPosition === 3) return false;
  this._currentPosition = 3;
  s.move(1, 3000);
  return true;
};

exports = ServoCam;
