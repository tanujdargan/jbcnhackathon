"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _React = React,
    useRef = _React.useRef,
    useState = _React.useState,
    useEffect = _React.useEffect,
    createRef = _React.createRef;
/*--------------------
Items
--------------------*/

var items = [{
  name: "Home",
  color: "#5b3a85",
  href: "index.html"
}, {
  name: "About Us",
  color: "#5b3a85",
  href: "./about/about.html"
}, {
  name: "Learn More",
  color: "#5b3a85",
  href: "/learnmore/learnmore.html"
}, {
  name: "Contact Us",
  color: "#5b3a85",
  href: "./contact/contact.html"
}, {
  name: "Register",
  color: "#5b3a85",
  href: "./register/register.html"
}];
/*--------------------
Menu
--------------------*/

var Menu = function Menu(_ref) {
  var items = _ref.items;
  var $root = useRef();
  var $indicator1 = useRef();
  var $indicator2 = useRef();
  var $items = useRef(items.map(createRef));

  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      active = _useState2[0],
      setActive = _useState2[1];

  var animate = function animate() {
    var menuOffset = $root.current.getBoundingClientRect();
    var activeItem = $items.current[active].current;

    var _activeItem$getBoundi = activeItem.getBoundingClientRect(),
        width = _activeItem$getBoundi.width,
        height = _activeItem$getBoundi.height,
        top = _activeItem$getBoundi.top,
        left = _activeItem$getBoundi.left;

    var settings = {
      x: left - menuOffset.x,
      y: top - menuOffset.y,
      width: width,
      height: height,
      backgroundColor: items[active].color,
      ease: 'elastic.out(.7, .7)',
      duration: .8
    };
    gsap.to($indicator1.current, _objectSpread({}, settings));
    gsap.to($indicator2.current, _objectSpread({}, settings, {
      duration: 1
    }));
  };

  useEffect(function () {
    animate();
    window.addEventListener('resize', animate);
    return function () {
      window.removeEventListener('resize', animate);
    };
  }, [active]);
  return (
    /*#__PURE__*/
    React.createElement("div", {
      ref: $root,
      className: "menu"
    }, items.map(function (item, index) {
      return (
        /*#__PURE__*/
        React.createElement("a", {
          key: item.name,
          ref: $items.current[index],
          className: "item ".concat(active === index ? 'active' : ''),
          onMouseEnter: function onMouseEnter() {
            setActive(index);
          },
          href: item.href
        }, item.name)
      );
    }),
    /*#__PURE__*/
    React.createElement("div", {
      ref: $indicator1,
      className: "indicator"
    }),
    /*#__PURE__*/
    React.createElement("div", {
      ref: $indicator2,
      className: "indicator"
    }))
  );
};
/*--------------------
App
--------------------*/


var App = function App() {
  return (
    /*#__PURE__*/
    React.createElement("div", {
      className: "App"
    },
    /*#__PURE__*/
    React.createElement(Menu, {
      items: items
    }))
  );
};
/*--------------------
Render
--------------------*/


ReactDOM.render(
/*#__PURE__*/
React.createElement(App, null), document.getElementById("root"));