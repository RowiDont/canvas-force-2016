(function () {
  if (typeof window.CanvasForce === "undefined") {
    window.CanvasForce = {};
  }

  var CanvasForce = window.CanvasForce;

  var Game = CanvasForce.Game = function (x, y) {
    this.DIM_X = x;
    this.DIM_Y = y;
    this.ship = new CanvasForce.Ship(this);
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.ship.draw(ctx);

    // this.allObjects().forEach(function (object) {
    //   object.draw(ctx);
    // });
  };

  // Game.prototype.draw = function (ctx) {
  //   ctx = ctx.getContext("2d");
  //   ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  //   this.ship.draw(ctx);
  // };

  Game.prototype.moveObjects = function (delta) {
    this.ship.move(delta);
  };

  Game.prototype.step = function (delta) {
    this.moveObjects(delta);
    // this.checkCollision();
  };
})();
