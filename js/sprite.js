// SPRITE OBJECT
// options hash contains: url, pos, size, speed, frames, dir, once
function Sprite(options) {
  this.pos = options.pos;
  this.size = options.size;
  this.speed = options.speed || 0;
  this.frames = options.frames;
  this._index = 0;
  this.url = options.url;
  this.dir = options.dir || 'horizontal';
  this.once = options.once;
  this.remove = false;
}

Sprite.prototype.update = function (dt) {
  this._index += this.speed*dt;
};

Sprite.prototype.render = function (ctx) {
  // debugger
  var frame;
  if (this.done) {
    frame = this.frames.length - 1;
  } else if (this.speed > 0) {
    var max = this.frames.length;
    var idx = Math.floor(this._index);
    frame = this.frames[idx % max];
      if (this.once && idx >= max) {
        frame = this.frames.length - 1;
        this.done = true;
      }
  } else {
    frame = 0;
  }

  var x = this.pos[0],
      y = this.pos[1];

  if(this.dir == 'vertical') {
    y += frame * this.size[1];
  }
  else {
    x += frame * this.size[0];
  }

  ctx.drawImage(
    resources.get(this.url),
    x, y,
    this.size[0], this.size[1],
    0, 0,
    this.size[0], this.size[1]
  );
};
