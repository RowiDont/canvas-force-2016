

(function () {
  if (typeof window.CanvasForce === undefined) {
    window.CanvasForce = {};
  }

  var GameView = window.CanvasForce.GameView = function (ctx) {
    this.game = new CanvasForce.Game(ctx.width, ctx.height);
    this.context = ctx;
  };

  GameView.prototype.start = function () {
    var that = this;
    setInterval(function () {
      that.game.step();
      that.game.draw(that.context);
    }, 20);
  };
})();
