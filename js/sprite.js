// SPRITE OBJECT
// options hash contains: url, pos, size, speed, frames, dir, once, rotation
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
  this.rotation = options.rotation || null;
  this.subSprite = options.dependentSprite || null;
  this.offset = options.offset || null;
}

Sprite.prototype.update = function (dt) {
  this._index += this.speed*dt;
};

Sprite.prototype.render = function (ctx) {

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

  if (this.rotation) {
    this.subSprite.render(ctx);
    ctx.rotate(this.rotation);
    ctx.translate(-this.size[0]/2, -this.size[1]/2);
  }

  if (this.offset) {
    ctx.drawImage(
      resources.get(this.url),
      x, y,
      this.size[0], this.size[1],
      this.offset[0], this.offset[1],
      this.size[0], this.size[1]
    );
  } else {
    ctx.drawImage(
      resources.get(this.url),
      x, y,
      this.size[0], this.size[1],
      0, 0,
      this.size[0], this.size[1]
    );
  }
  //
  // if (this.rotation) {
  //   ctx.rotate(-this.rotation);
  //   // ctx.translate(+this.size[1]/2, +this.size[0]/2);
  // }

  // ctx.restore();
};
