(function () {
  if (typeof window.CanvasForce === undefined) {
    window.CanvasForce = {};
  }

  var GameView = window.CanvasForce.GameView = function (ctx) {
    this.game = new CanvasForce.Game(ctx.width, ctx.height);
    this.context = ctx;
  };

  GameView.MOVES = {
    "w": [ 0, -1],
    "a": [-1,  0],
    "s": [ 0,  1],
    "d": [ 1,  0],
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.ship;

    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      // debugger
      key(k, function () {
        // for (var i = 0; i < 20; i++) {
          this.game.ship.power(move);
        // }
      }.bind(this));
    }.bind(this));

    key("space", function () { ship.fireBullet(); });
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    this.lastTime = 0;

    requestAnimationFrame(this.animate.bind(this));
  };

  GameView.prototype.animate = function(time){
    var timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.context);
    this.lastTime = time;

    //every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  };
})();
