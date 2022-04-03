"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Stage =
/*#__PURE__*/
function () {
  function Stage() {
    _classCallCheck(this, Stage);

    this.renderParam = {
      clearColor: 0x666666,
      width: window.innerWidth,
      height: window.innerHeight
    };
    this.cameraParam = {
      left: -1,
      right: 1,
      top: 1,
      bottom: 1,
      near: 0,
      far: -1
    };
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.geometry = null;
    this.material = null;
    this.mesh = null;
    this.isInitialized = false;
  }

  _createClass(Stage, [{
    key: "init",
    value: function init() {
      this._setScene();

      this._setRender();

      this._setCamera();

      this.isInitialized = true;
    }
  }, {
    key: "_setScene",
    value: function _setScene() {
      this.scene = new THREE.Scene();
    }
  }, {
    key: "_setRender",
    value: function _setRender() {
      this.renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("webgl-canvas")
      });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setClearColor(new THREE.Color(this.renderParam.clearColor));
      this.renderer.setSize(this.renderParam.width, this.renderParam.height);
    }
  }, {
    key: "_setCamera",
    value: function _setCamera() {
      if (!this.isInitialized) {
        this.camera = new THREE.OrthographicCamera(this.cameraParam.left, this.cameraParam.right, this.cameraParam.top, this.cameraParam.bottom, this.cameraParam.near, this.cameraParam.far);
      }

      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      this.camera.aspect = windowWidth / windowHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(windowWidth, windowHeight);
    }
  }, {
    key: "_render",
    value: function _render() {
      this.renderer.render(this.scene, this.camera);
    }
  }, {
    key: "onResize",
    value: function onResize() {
      this._setCamera();
    }
  }, {
    key: "onRaf",
    value: function onRaf() {
      this._render();
    }
  }]);

  return Stage;
}();

var Mesh =
/*#__PURE__*/
function () {
  function Mesh(stage) {
    _classCallCheck(this, Mesh);

    this.canvas = document.getElementById("webgl-canvas");
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.uniforms = {
      resolution: {
        type: "v2",
        value: [this.canvasWidth, this.canvasHeight]
      },
      time: {
        type: "f",
        value: 0.0
      },
      xScale: {
        type: "f",
        value: 1.0
      },
      yScale: {
        type: "f",
        value: 0.5
      },
      distortion: {
        type: "f",
        value: 0.050
      }
    };
    this.stage = stage;
    this.mesh = null;
    this.xScale = 1.0;
    this.yScale = 0.5;
    this.distortion = 0.050;
  }

  _createClass(Mesh, [{
    key: "init",
    value: function init() {
      this._setMesh(); // this._setGui();

    }
  }, {
    key: "_setMesh",
    value: function _setMesh() {
      var position = [-1.0, -1.0, 0.0, 1.0, -1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0, 1.0, 0.0, 1.0, 1.0, 0.0];
      var positions = new THREE.BufferAttribute(new Float32Array(position), 3);
      var geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", positions);
      var material = new THREE.RawShaderMaterial({
        vertexShader: document.getElementById("js-vertex-shader").textContent,
        fragmentShader: document.getElementById("js-fragment-shader").textContent,
        uniforms: this.uniforms,
        side: THREE.DoubleSide
      });
      this.mesh = new THREE.Mesh(geometry, material);
      this.stage.scene.add(this.mesh);
    }
  }, {
    key: "_diffuse",
    value: function _diffuse() {// gsap.to(this.mesh.material.uniforms.xScale, {
      //   value: 2,
      //   duration: 0.1,
      //   ease: 'power2.inOut',
      //   repeat: -1,
      //   yoyo: true
      // });
      // gsap.to(this.mesh.material.uniforms.yScale, {
      //   value: 1,
      //   duration: 0.1,
      //   ease: 'power2.inOut',
      //   repeat: -1,
      //   yoyo: true
      // });
    }
  }, {
    key: "_render",
    value: function _render() {
      this.uniforms.time.value += 0.01;
    }
  }, {
    key: "_setGui",
    value: function _setGui() {
      var _this = this;

      var parameter = {
        xScale: this.xScale,
        yScale: this.yScale,
        distortion: this.distortion
      };
      var gui = new dat.GUI();
      gui.add(parameter, "xScale", 0.00, 5.00, 0.01).onChange(function (value) {
        _this.mesh.material.uniforms.xScale.value = value;
      });
      gui.add(parameter, "yScale", 0.00, 1.00, 0.01).onChange(function (value) {
        _this.mesh.material.uniforms.yScale.value = value;
      });
      gui.add(parameter, "distortion", 0.001, 0.100, 0.001).onChange(function (value) {
        _this.mesh.material.uniforms.distortion.value = value;
      });
    }
  }, {
    key: "onRaf",
    value: function onRaf() {
      this._render();
    }
  }]);

  return Mesh;
}();

(function () {
  var stage = new Stage();
  stage.init();
  var mesh = new Mesh(stage);
  mesh.init();
  window.addEventListener("resize", function () {
    stage.onResize();
  });
  window.addEventListener("load", function () {
    setTimeout(function () {
      mesh._diffuse();
    }, 1000);
  });

  var _raf = function _raf() {
    window.requestAnimationFrame(function () {
      stage.onRaf();
      mesh.onRaf();

      _raf();
    });
  };

  _raf();
})();