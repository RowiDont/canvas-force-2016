// Crossbrowser requestAnimationFrame
var requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
if (canvas.width >= 500) {
		canvas.width  = 320;
		canvas.height = 480;
		canvas.style.border = "1px solid #000";
}
document.body.appendChild(canvas);

var lastTime;
function main() {
  var now = Date.now();
  var dt = (now - lastTime) / 1000.0;

  update(dt);
  render();

  lastTime = now;
  requestAnimFrame(main);
}

resources.load([
  'img/ship_sprite.gif'
]);
resources.onReady(init);

function init() {
  document.getElementById('play-again').addEventListener('click', function () {
    reset();
  });

  reset();
  lastTime = Date.now();
  main();
}

var player = {
  pos: [0, 0],
  sprite: new Sprite('img/ship_sprite.gif', [0, 0], [39, 39], 16, [0, 1])
};
