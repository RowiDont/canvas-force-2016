(function () {
  if (typeof window.CanvasForce === "undefined") {
    window.CanvasForce = {};
  }
  var CanvasForce = window.CanvasForce;

  var Ship = CanvasForce.Ship = function(game) {
    this.pos = [200, 300];
    this.vel = [0, 0];
    this.width = 49;
    this.height = 75;
    this.pixelsLeft = 49;
    this.pixelsTop = 10;
    this.game = game;
  };

  Ship.prototype.draw = function (ctx) {
    // debugger
    ctx.drawImage(
      ship,
      this.pos[0],
      this.pos[1]
    );
  };

//   Ship.prototype.draw = function (ctx) {
//   ctx.fillStyle = this.color;
//
//   ctx.beginPath();
//   ctx.arc(
//     this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
//   );
//   ctx.fill();
// };

  // Ship.prototype.move = function () {
  //   this.pos[0] += this.vel[0];
  //   this.pos[1] += this.vel[1];
  // };
  var NORMAL_FRAME_TIME_DELTA = 1000/60;

  Ship.prototype.move = function (timeDelta) {
    //timeDelta is number of milliseconds since last move
    //if the computer is busy the time delta will be larger
    //in this case the MovingObject should move farther in this frame
    //velocity of object is how far it should move in 1/60th of a second
    var velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
        offsetX = this.vel[0] * velocityScale,
        offsetY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

    // if (this.game.isOutOfBounds(this.pos)) {
    //   if (this.isWrappable) {
    //     this.pos = this.game.wrap(this.pos);
    //   } else {
    //     this.remove();
    //   }
    // }
  };

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  // Ship.prototype.isCollidedWith = function (otherObject) {
  //   var sumRadii = this.radius + otherObject.radius;
  //   var dist = Asteroids.Util.dist(this.pos, otherObject.pos);
  //   if (dist < sumRadii) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };
  //
  // Ship.prototype.collideWith = function (otherObject) {
  //   this.game.remove(this);
  //   this.game.remove(otherObject);
  // };
})();
