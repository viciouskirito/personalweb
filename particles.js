/* particles.js - A lightweight JavaScript library for creating particles
   Version: 2.0.0
   Author: Vincent Garreau
   License: MIT
   Website: https://vincentgarreau.com/particles.js/
*/

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["particlesJS"] = factory();
	else
		root["particlesJS"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.particlesJS = exports.pJSDom = undefined;

var _pJs = __webpack_require__(1);

var _pJs2 = _interopRequireDefault(_pJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pJSDom = exports.pJSDom = [];
var particlesJS = exports.particlesJS = function particlesJS(tag_id, params) {
  pJSDom.push(new _pJs2.default(tag_id, params));
  return pJSDom[pJSDom.length - 1];
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("get" in desc) { return desc.get.call(receiver); } else { return desc.value; } };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

__webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PJS = function () {
  function PJS(tag_id, params) {
    _classCallCheck(this, PJS);

    var canvas_el = document.getElementById(tag_id);

    if (!canvas_el) {
      throw new Error("particles.js: no tag_id element found");
    }

    canvas_el.style.opacity = 0;

    this.canvas = {
      el: canvas_el,
      w: canvas_el.offsetWidth,
      h: canvas_el.offsetHeight
    };

    this.particles = [];
    this.params = params || {};
    this.img_arr = [];

    this.init();
  }

  _createClass(PJS, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.canvas.ctx = this.canvas.el.getContext('2d');

      window.addEventListener('resize', function () {
        _this.canvas.w = _this.canvas.el.offsetWidth;
        _this.canvas.h = _this.canvas.el.offsetHeight;

        if (_this.params && _this.params.interactivity && _this.params.interactivity.events && _this.params.interactivity.events.onresize) {
          if (_this.params.interactivity.events.onresize.enable) {
            _this.canvas.el.width = _this.canvas.w;
            _this.canvas.el.height = _this.canvas.h;

            if (!_this.params.particles.move.enable) {
              _this.particlesEmpty();
              _this.particlesCreate();
              _this.particlesDraw();
            }
          }
        }
      });

      this.canvas.el.width = this.canvas.w;
      this.canvas.el.height = this.canvas.h;

      this.particlesCreate();

      this.canvas.el.style.opacity = 1;

      this.draw();
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this2 = this;

      if (this.params.particles.move.enable) {
        requestAnimationFrame(function () {
          _this2.draw();
        });
      }

      this.canvas.ctx.clearRect(0, 0, this.canvas.w, this.canvas.h);

      this.particlesDraw();

      if (this.params.interactivity.enable) {
        if (this.params.interactivity.events.onhover.enable && this.params.interactivity.events.onhover.mode) {
          this.interactivity.mouse.hover_status = "mousemove";
        }

        if (this.params.interactivity.events.onclick.enable && this.params.interactivity.events.onclick.mode) {
          this.interactivity.mouse.click_status = "mouseup";
        }
      }
    }
  }, {
    key: "particlesCreate",
    value: function particlesCreate() {
      var _this3 = this;

      var number = this.params.particles.number.value;
      var density = this.params.particles.number.density.enable ? this.params.particles.number.density.value_area : 1;

      var area = this.canvas.w * this.canvas.h / 1000;
      var particles_nb = number * area / density;

      for (var i = 0; i < particles_nb; i++) {
        var particle = {};

        particle.x = Math.random() * this.canvas.w;
        particle.y = Math.random() * this.canvas.h;

        particle.color = {};

        if (this.params.particles.color) {
          if (typeof this.params.particles.color.value === 'string') {
            particle.color.value = this.params.particles.color.value;
          } else if (this.params.particles.color.value instanceof Array) {
            particle.color.value = this.params.particles.color.value[Math.floor(Math.random() * this.params.particles.color.value.length)];
          }
        }

        particle.opacity = this.params.particles.opacity.value;

        particle.size = this.params.particles.size.value;

        particle.velocity = {
          x: (Math.random() - 0.5) * this.params.particles.move.speed,
          y: (Math.random() - 0.5) * this.params.particles.move.speed
        };

        particle.shape = this.params.particles.shape.type;

        if (this.params.particles.shape.image) {
          if (this.params.particles.shape.image.src) {
            particle.img = {
              src: this.params.particles.shape.image.src,
              ratio: this.params.particles.shape.image.width / this.params.particles.shape.image.height || 1
            };
          }
        }

        this.particles.push(particle);
      }

      if (this.params.particles.shape.image) {
        if (this.params.particles.shape.image.src) {
          this.img_arr = [];

          for (var _i = 0; _i < this.particles.length; _i++) {
            var _particle = this.particles[_i];

            if (_particle.shape == "image" && _particle.img && _particle.img.src) {
              var img = new Image();
              img.src = _particle.img.src;

              this.img_arr.push(img);
            }
          }
        }
      }

      this.interactivity = {};
      this.interactivity.mouse = {};

      var mouse_position = {
        x: 0,
        y: 0
      };

      window.addEventListener('mousemove', function (e) {
        mouse_position.x = e.clientX;
        mouse_position.y = e.clientY;

        _this3.interactivity.mouse = mouse_position;

        if (_this3.params.interactivity.events.onhover.enable && _this3.params.interactivity.events.onhover.mode) {
          _this3.interactivity.mouse.hover_status = "mousemove";
        }
      });

      window.addEventListener('mouseout', function (e) {
        mouse_position.x = e.clientX;
        mouse_position.y = e.clientY;

        _this3.interactivity.mouse = mouse_position;

        if (_this3.params.interactivity.events.onhover.enable && _this3.params.interactivity.events.onhover.mode) {
          _this3.interactivity.mouse.hover_status = "mouseout";
        }
      });

      window.addEventListener('click', function (e) {
        mouse_position.x = e.clientX;
        mouse_position.y = e.clientY;

        _this3.interactivity.mouse = mouse_position;

        if (_this3.params.interactivity.events.onclick.enable && _this3.params.interactivity.events.onclick.mode) {
          _this3.interactivity.mouse.click_status = "click";
        }
      });

      window.addEventListener('mouseup', function (e) {
        mouse_position.x = e.clientX;
        mouse_position.y = e.clientY;

        _this3.interactivity.mouse = mouse_position;

        if (_this3.params.interactivity.events.onclick.enable && _this3.params.interactivity.events.onclick.mode) {
          _this3.interactivity.mouse.click_status = "mouseup";
        }
      });
    }
  }, {
    key: "particlesDraw",
    value: function particlesDraw() {
      for (var i = 0; i < this.particles.length; i++) {
        var particle = this.particles[i];

        var dx = particle.x + particle.velocity.x;
        var dy = particle.y + particle.velocity.y;

        if (this.params.particles.move.out_mode == "bounce") {
          if (dx > this.canvas.w - particle.size * 2) {
            particle.velocity.x = -particle.velocity.x;
            dx = particle.x + particle.velocity.x;
          } else if (dx < particle.size * 2) {
            particle.velocity.x = -particle.velocity.x;
            dx = particle.x + particle.velocity.x;
          }

          if (dy > this.canvas.h - particle.size * 2) {
            particle.velocity.y = -particle.velocity.y;
            dy = particle.y + particle.velocity.y;
          } else if (dy < particle.size * 2) {
            particle.velocity.y = -particle.velocity.y;
            dy = particle.y + particle.velocity.y;
          }
        } else {
          if (dx > this.canvas.w || dx < 0) {
            dx = Math.random() * this.canvas.w;
          }

          if (dy > this.canvas.h || dy < 0) {
            dy = Math.random() * this.canvas.h;
          }
        }

        particle.x = dx;
        particle.y = dy;

        if (this.params.particles.move.enable) {
          this.canvas.ctx.beginPath();
          this.canvas.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          this.canvas.ctx.closePath();

          if (this.params.particles.shape.image) {
            if (this.params.particles.shape.image.src) {
              if (particle.shape == "image" && particle.img && particle.img.src) {
                this.canvas.ctx.drawImage(this.img_arr[i], particle.x - particle.size, particle.y - particle.size, particle.size * 2, particle.size * 2 / particle.img.ratio);
              }
            }
          } else {
            this.canvas.ctx.fillStyle = particle.color.value;
            this.canvas.ctx.globalAlpha = particle.opacity;
            this.canvas.ctx.fill();
          }
        }

        if (this.params.interactivity.enable) {
          if (this.params.interactivity.events.onhover.enable && this.params.interactivity.events.onhover.mode) {
            if (this.interactivity.mouse.hover_status == "mousemove") {
              var dist_mouse = Math.sqrt(Math.pow(particle.x - this.interactivity.mouse.x, 2) + Math.pow(particle.y - this.interactivity.mouse.y, 2));

              if (dist_mouse <= this.params.interactivity.modes.grab.distance) {
                if (this.params.interactivity.modes.grab.line_linked.opacity > 0) {
                  this.canvas.ctx.beginPath();
                  this.canvas.ctx.moveTo(particle.x, particle.y);
                  this.canvas.ctx.lineTo(this.interactivity.mouse.x, this.interactivity.mouse.y);
                  this.canvas.ctx.strokeStyle = this.params.particles.line_linked.color;
                  this.canvas.ctx.lineWidth = this.params.particles.line_linked.width;
                  this.canvas.ctx.stroke();
                  this.canvas.ctx.closePath();
                }
              }
            } else if (this.interactivity.mouse.hover_status == "mouseout") {
              // do nothing
            }
          }

          if (this.params.interactivity.events.onclick.enable && this.params.interactivity.events.onclick.mode) {
            if (this.interactivity.mouse.click_status == "click") {
              var _dist_mouse = Math.sqrt(Math.pow(particle.x - this.interactivity.mouse.x, 2) + Math.pow(particle.y - this.interactivity.mouse.y, 2));

              if (_dist_mouse <= this.params.interactivity.modes.push.particles_nb) {
                particle.velocity.x = (particle.x - this.interactivity.mouse.x) * this.params.interactivity.modes.push.speed / 100;
                particle.velocity.y = (particle.y - this.interactivity.mouse.y) * this.params.interactivity.modes.push.speed / 100;
              }
            } else if (this.interactivity.mouse.click_status == "mouseup") {
              // do nothing
            }
          }
        }
      }

      if (this.params.interactivity.enable) {
        if (this.params.interactivity.events.onhover.enable && this.params.interactivity.events.onhover.mode) {
          this.interactivity.mouse.hover_status = "";
        }

        if (this.params.interactivity.events.onclick.enable && this.params.interactivity.events.onclick.mode) {
          this.interactivity.mouse.click_status = "";
        }
      }
    }
  }, {
    key: "particlesEmpty",
    value: function particlesEmpty() {
      this.particles = [];
    }
  }]);

  return PJS;
}();

module.exports = PJS;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ());
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but not IETF specified setImmediate
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // Old versions of Firefox didn't have a setTimeout, so we try setImmediate
            return setImmediate(fun, 0);
        } catch (e) {
            // finally, fall back to just running it immediately
            return fun();
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but not IETF specified setImmediate
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // Old versions of Firefox didn't have a clearTimeout, so we try clearImmediate
            return clearImmediate(marker);
        } catch (e) {
            // finally, fall back to just running it immediately
            throw new Error('clearTimeout not defined');
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length > 0) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length > 0) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;
    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

/***/ })
/******/ ]);
});