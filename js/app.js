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

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
if (!isMobile.any()) {
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
  'img/ship_sprite1.png',
  'img/bullet.png'
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

// Sprite options hash contains: url, pos, size, speed, frames, dir, once
// dir is a vector of dx, dy
var player = {
  pos: [0, 0],
  lastFire: Date.now(),
  sprite: new Sprite({
    url: 'img/ship_sprite1.png',
    pos: [0, 0],
    size: [49, 42],
    speed: 10,
    frames: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    once: true
  })
};

var bullets = [],
    enemies = [],
    explosions = [];

var gameTime = 0,
    isGameOver;

var score = 0,
    scoreEl = document.getElementById('score');

var playerSpeed = 200,
    bulletSpeed = 400;

function update (dt) {
  gameTime += dt;

  handleInput(dt);
  updateEntities(dt);

  scoreEl.innerHTML = score;
}

function handleInput(dt) {
  if(input.isDown('DOWN') || input.isDown('s')) {
    player.pos[1] += playerSpeed * dt;
  }

  if(input.isDown('UP') || input.isDown('w')) {
    player.pos[1] -= playerSpeed * dt;
  }

  if(input.isDown('LEFT') || input.isDown('a')) {
    player.pos[0] -= playerSpeed * dt;
  }

  if(input.isDown('RIGHT') || input.isDown('d')) {
    player.pos[0] += playerSpeed * dt;
  }

  if(input.isDown('SPACE') &&
    !isGameOver &&
    Date.now() - player.lastFire > 200) {
      var x = player.pos[0] + 21;
      var y = player.pos[1] - 14;
      bullets.push({
        pos: [x, y],
        dir: [0, 1],
        sprite: new Sprite({
          url: 'img/bullet.png',
          pos: [0, 0],
          size: [9, 22]
        })
      });

      player.lastFire = Date.now();
  }
}

function updateEntities(dt) {
  // update the player first
  player.sprite.update(dt);

  var i;
  // update bullets
  for (i = 0; i < bullets.length; i++) {
    // debugger
    var bullet = bullets[i];


    bullet.pos[0] -= bulletSpeed * dt * bullet.dir[0];
    bullet.pos[1] -= bulletSpeed * dt * bullet.dir[1];

    console.log(bullet.pos[1]);

    if (outOfBounds(bullet)) {
      bullet.remove = true;
    }
  }

  // update enemy position
  for (i = 0; i < enemies.length; i++) {
    enemies[i].pos[1] -= enemySpeed * dt;
    enemies.sprite.update(dt);

    if (outOfBounds(enemies[i])) {
      enemies[i].remove = true;
    }
  }

  // update explosions!
  for (i = 0; i < explosions.length; i++) {
    explosions[i].sprite.update(dt);

    if (outOfBounds(explosions[i])) {
      explosions[i].remove = true;
    }
  }

  removeEntities();
}

function removeEntities() {
  var i;
  var list = [bullets, enemies, explosions];

  for (i = 0; i < list.length; i++) {
    var item = list[i];
    for (var j = 0; j < item.length; j++) {
      if (item[j].remove) {
        item.splice(j, 1);
        j--;
      }
    }
  }

}

function outOfBounds(sprite) {
  if (sprite.pos[1] < 0 ||
      sprite.pos[1] > canvas.height ||
      sprite.pos[0] > canvas.width ||
      sprite.pos[0] < 0
    ) {
    return true;
  }
  return false;
}

function checkCollisions () {
  checkPlayerBounds();
}

function checkPlayerBounds () {
  if(player.pos[0] < 0) {
    player.pos[0] = 0;
  }
  else if(player.pos[0] > canvas.width - player.sprite.size[0]) {
    player.pos[0] = canvas.width - player.sprite.size[0];
  }

  if(player.pos[1] < 0) {
    player.pos[1] = 0;
  }
  else if(player.pos[1] > canvas.height - player.sprite.size[1]) {
    player.pos[1] = canvas.height - player.sprite.size[1];
  }
}

function render () {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if(!isGameOver) {
    renderEntity(player);
  }
  checkCollisions();

  renderEntities(bullets);
  renderEntities(enemies);
  renderEntities(explosions);
}

function renderEntities(list) {
  for (var i = 0; i < list.length; i++) {
    renderEntity(list[i]);
  }
}

function renderEntity(entity) {
  ctx.save();
  ctx.translate(entity.pos[0], entity.pos[1]);
  entity.sprite.render(ctx);
  ctx.restore();
}

// Game over
function gameOver() {
  document.getElementById('game-over').style.display = 'block';
  document.getElementById('game-over-overlay').style.display = 'block';
  isGameOver = true;
}

// Reset game to original state
function reset() {
  document.getElementById('game-over').style.display = 'none';
  document.getElementById('game-over-overlay').style.display = 'none';
  isGameOver = false;
  gameTime = 0;
  score = 0;

  enemies = [];
  bullets = [];

  player.pos = [canvas.width/2 - 21, canvas.height - 80];
}
