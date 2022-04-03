"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*--------------------
Vars
--------------------*/
var deg = function deg(a) {
  return Math.PI / 180 * a;
};

var rand = function rand(v1, v2) {
  return Math.floor(v1 + Math.random() * (v2 - v1));
};

var opt = {
  particles: window.width / 500 ? 1000 : 500,
  noiseScale: 0.009,
  angle: Math.PI / 180 * -90,
  h1: rand(0, 360),
  h2: rand(0, 360),
  s1: rand(20, 90),
  s2: rand(20, 90),
  l1: rand(30, 80),
  l2: rand(30, 80),
  strokeWeight: 1.2,
  tail: 82
};
var Particles = [];
var time = 0;
document.body.addEventListener('click', function () {
  opt.h1 = rand(0, 360);
  opt.h2 = rand(0, 360);
  opt.s1 = rand(20, 90);
  opt.s2 = rand(20, 90);
  opt.l1 = rand(30, 80);
  opt.l2 = rand(30, 80);
  opt.angle += deg(random(0, 0)) * (Math.random() > .5 ? 1 : -1);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Particles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var p = _step.value;
      p.randomize();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
});
/*--------------------
Particle
--------------------*/

var Particle =
/*#__PURE__*/
function () {
  function Particle(x, y) {
    _classCallCheck(this, Particle);

    this.x = x;
    this.y = y;
    this.lx = x;
    this.ly = y;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.hueSemen = Math.random();
    this.hue = this.hueSemen > .5 ? 20 + opt.h1 : 20 + opt.h2;
    this.sat = this.hueSemen > .5 ? opt.s1 : opt.s2;
    this.light = this.hueSemen > .5 ? opt.l1 : opt.l2;
    this.maxSpeed = this.hueSemen > .5 ? 3 : 2;
  }

  _createClass(Particle, [{
    key: "randomize",
    value: function randomize() {
      this.hueSemen = Math.random();
      this.hue = this.hueSemen > .5 ? 20 + opt.h1 : 20 + opt.h2;
      this.sat = this.hueSemen > .5 ? opt.s1 : opt.s2;
      this.light = this.hueSemen > .1 ? opt.l1 : opt.l2;
      this.maxSpeed = this.hueSemen > .5 ? 3 : 2;
    }
  }, {
    key: "update",
    value: function update() {
      this.follow();
      this.vx += this.ax;
      this.vy += this.ay;
      var p = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      var a = Math.atan2(this.vy, this.vx);
      var m = Math.min(this.maxSpeed, p);
      this.vx = Math.cos(a) * m;
      this.vy = Math.sin(a) * m;
      this.x += this.vx;
      this.y += this.vy;
      this.ax = 0;
      this.ay = 0;
      this.edges();
    }
  }, {
    key: "follow",
    value: function follow() {
      var angle = noise(this.x * opt.noiseScale, this.y * opt.noiseScale, time * opt.noiseScale) * Math.PI * 0.5 + opt.angle;
      this.ax += Math.cos(angle);
      this.ay += Math.sin(angle);
    }
  }, {
    key: "updatePrev",
    value: function updatePrev() {
      this.lx = this.x;
      this.ly = this.y;
    }
  }, {
    key: "edges",
    value: function edges() {
      if (this.x < 0) {
        this.x = width;
        this.updatePrev();
      }

      if (this.x > width) {
        this.x = 0;
        this.updatePrev();
      }

      if (this.y < 0) {
        this.y = height;
        this.updatePrev();
      }

      if (this.y > height) {
        this.y = 0;
        this.updatePrev();
      }
    }
  }, {
    key: "render",
    value: function render() {
      stroke("hsla(".concat(this.hue, ", ").concat(this.sat, "%, ").concat(this.light, "%, .5)"));
      line(this.x, this.y, this.lx, this.ly);
      this.updatePrev();
    }
  }]);

  return Particle;
}();
/*--------------------
Setup
--------------------*/


function setup() {
  createCanvas(windowWidth, 4000);

  for (var i = 0; i < opt.particles; i++) {
    Particles.push(new Particle(Math.random() * width, Math.random() * height));
  }

  strokeWeight(opt.strokeWeight);
}
/*--------------------
Draw
--------------------*/


function draw() {
  time++;
  background(0, 86 - opt.tail);

  for (var _i = 0, _Particles = Particles; _i < _Particles.length; _i++) {
    var p = _Particles[_i];
    p.update();
    p.render();
  }
}
/*--------------------
Resize
--------------------*/


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}