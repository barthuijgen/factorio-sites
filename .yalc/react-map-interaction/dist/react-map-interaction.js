(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["prop-types", "React"], factory);
	else if(typeof exports === 'object')
		exports["ReactMapInteraction"] = factory(require("prop-types"), require("react"));
	else
		root["ReactMapInteraction"] = factory(root["PropTypes"], root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__1__) {
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "MapInteractionCSS", function() { return /* reexport */ src_MapInteractionCSS; });
__webpack_require__.d(__webpack_exports__, "MapInteraction", function() { return /* reexport */ MapInteraction; });

// EXTERNAL MODULE: external {"commonjs":"react","commonjs2":"react","amd":"React","root":"React"}
var external_commonjs_react_commonjs2_react_amd_React_root_React_ = __webpack_require__(1);
var external_commonjs_react_commonjs2_react_amd_React_root_React_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_react_commonjs2_react_amd_React_root_React_);

// EXTERNAL MODULE: external {"commonjs":"prop-types","commonjs2":"prop-types","commonj2s":"prop-types","amd":"prop-types","root":"PropTypes"}
var external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_ = __webpack_require__(0);
var external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_);

// CONCATENATED MODULE: ./src/Controls.jsx
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var Controls_Controls = /*#__PURE__*/function (_Component) {
  _inherits(Controls, _Component);

  var _super = _createSuper(Controls);

  function Controls() {
    _classCallCheck(this, Controls);

    return _super.apply(this, arguments);
  }

  _createClass(Controls, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          plusBtnContents = _this$props.plusBtnContents,
          minusBtnContents = _this$props.minusBtnContents,
          btnClass = _this$props.btnClass,
          plusBtnClass = _this$props.plusBtnClass,
          minusBtnClass = _this$props.minusBtnClass,
          controlsClass = _this$props.controlsClass,
          scale = _this$props.scale,
          minScale = _this$props.minScale,
          maxScale = _this$props.maxScale,
          onClickPlus = _this$props.onClickPlus,
          onClickMinus = _this$props.onClickMinus,
          disableZoom = _this$props.disableZoom;
      var btnStyle = {
        width: 30,
        paddingTop: 5,
        marginBottom: 5
      };
      var controlsStyle = controlsClass ? undefined : {
        position: 'absolute',
        right: 10,
        top: 10
      };

      function plusHandler(e) {
        e.preventDefault();
        e.target.blur();
        if (disableZoom) return;
        onClickPlus();
      }

      function minusHandler(e) {
        e.preventDefault();
        e.target.blur();
        if (disableZoom) return;
        onClickMinus();
      }

      return /*#__PURE__*/external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
        style: controlsStyle,
        className: controlsClass
      }, /*#__PURE__*/external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", null, /*#__PURE__*/external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("button", {
        ref: function ref(node) {
          _this.plusNode = node;
        },
        onClick: plusHandler,
        onTouchEnd: plusHandler,
        className: [btnClass ? btnClass : '', plusBtnClass ? plusBtnClass : ''].join(' '),
        type: "button",
        style: btnClass || plusBtnClass ? undefined : btnStyle,
        disabled: disableZoom || scale >= maxScale
      }, plusBtnContents)), /*#__PURE__*/external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", null, /*#__PURE__*/external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("button", {
        ref: function ref(node) {
          _this.minusNode = node;
        },
        onClick: minusHandler,
        onTouchEnd: minusHandler,
        className: [btnClass ? btnClass : '', minusBtnClass ? minusBtnClass : ''].join(' '),
        type: "button",
        style: btnClass || minusBtnClass ? undefined : btnStyle,
        disabled: disableZoom || scale <= minScale
      }, minusBtnContents)));
    }
  }]);

  return Controls;
}(external_commonjs_react_commonjs2_react_amd_React_root_React_["Component"]);

Controls_Controls.propTypes = {
  onClickPlus: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.func.isRequired,
  onClickMinus: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.func.isRequired,
  plusBtnContents: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.node,
  minusBtnContents: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.node,
  btnClass: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.string,
  plusBtnClass: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.string,
  minusBtnClass: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.string,
  controlsClass: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.string,
  scale: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.number,
  minScale: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.number,
  maxScale: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.number,
  disableZoom: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.bool
};
Controls_Controls.defaultProps = {
  plusBtnContents: '+',
  minusBtnContents: '-',
  disableZoom: false
};
/* harmony default export */ var src_Controls = (Controls_Controls);
// CONCATENATED MODULE: ./src/geometry.js
function clamp(min, value, max) {
  return Math.max(min, Math.min(value, max));
}

function distance(p1, p2) {
  var dx = p1.x - p2.x;
  var dy = p1.y - p2.y;
  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}

function midpoint(p1, p2) {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2
  };
}

function touchPt(touch) {
  return {
    x: touch.clientX,
    y: touch.clientY
  };
}

function touchDistance(t0, t1) {
  var p0 = touchPt(t0);
  var p1 = touchPt(t1);
  return distance(p0, p1);
}


// CONCATENATED MODULE: ./src/makePassiveEventOption.js
// We want to make event listeners non-passive, and to do so have to check
// that browsers support EventListenerOptions in the first place.
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
var passiveSupported = false;

try {
  var options = {
    get passive() {
      passiveSupported = true;
    }

  };
  window.addEventListener("test", options, options);
  window.removeEventListener("test", options, options);
} catch (_unused) {
  passiveSupported = false;
}

function makePassiveEventOption(passive) {
  return passiveSupported ? {
    passive: passive
  } : passive;
}

/* harmony default export */ var src_makePassiveEventOption = (makePassiveEventOption);
// CONCATENATED MODULE: ./src/MapInteraction.jsx
function MapInteraction_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { MapInteraction_typeof = function _typeof(obj) { return typeof obj; }; } else { MapInteraction_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return MapInteraction_typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function MapInteraction_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function MapInteraction_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function MapInteraction_createClass(Constructor, protoProps, staticProps) { if (protoProps) MapInteraction_defineProperties(Constructor.prototype, protoProps); if (staticProps) MapInteraction_defineProperties(Constructor, staticProps); return Constructor; }

function MapInteraction_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) MapInteraction_setPrototypeOf(subClass, superClass); }

function MapInteraction_setPrototypeOf(o, p) { MapInteraction_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return MapInteraction_setPrototypeOf(o, p); }

function MapInteraction_createSuper(Derived) { var hasNativeReflectConstruct = MapInteraction_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = MapInteraction_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = MapInteraction_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return MapInteraction_possibleConstructorReturn(this, result); }; }

function MapInteraction_possibleConstructorReturn(self, call) { if (call && (MapInteraction_typeof(call) === "object" || typeof call === "function")) { return call; } return MapInteraction_assertThisInitialized(self); }

function MapInteraction_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function MapInteraction_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function MapInteraction_getPrototypeOf(o) { MapInteraction_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return MapInteraction_getPrototypeOf(o); }





 // The amount that a value of a dimension will change given a new scale

var coordChange = function coordChange(coordinate, scaleRatio) {
  return scaleRatio * coordinate - coordinate;
};

var translationShape = external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.shape({
  x: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.number,
  y: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.number
});
/*
  This contains logic for providing a map-like interaction to any DOM node.
  It allows a user to pinch, zoom, translate, etc, as they would an interactive map.
  It renders its children with the current state of the translation and does not do any scaling
  or translating on its own. This works on both desktop, and mobile.
*/

var MapInteraction_MapInteractionControlled = /*#__PURE__*/function (_Component) {
  MapInteraction_inherits(MapInteractionControlled, _Component);

  var _super = MapInteraction_createSuper(MapInteractionControlled);

  function MapInteractionControlled(props) {
    var _this;

    MapInteraction_classCallCheck(this, MapInteractionControlled);

    _this = _super.call(this, props);
    _this.state = {
      shouldPreventTouchEndDefault: false
    };
    _this.startPointerInfo = undefined;
    _this.onMouseDown = _this.onMouseDown.bind(MapInteraction_assertThisInitialized(_this));
    _this.onTouchStart = _this.onTouchStart.bind(MapInteraction_assertThisInitialized(_this));
    _this.onMouseMove = _this.onMouseMove.bind(MapInteraction_assertThisInitialized(_this));
    _this.onTouchMove = _this.onTouchMove.bind(MapInteraction_assertThisInitialized(_this));
    _this.onMouseUp = _this.onMouseUp.bind(MapInteraction_assertThisInitialized(_this));
    _this.onTouchEnd = _this.onTouchEnd.bind(MapInteraction_assertThisInitialized(_this));
    _this.onWheel = _this.onWheel.bind(MapInteraction_assertThisInitialized(_this));
    return _this;
  }

  MapInteraction_createClass(MapInteractionControlled, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var passiveOption = src_makePassiveEventOption(false);
      this.getContainerNode().addEventListener('wheel', this.onWheel, passiveOption);
      /*
        Setup events for the gesture lifecycle: start, move, end touch
      */
      // start gesture

      this.getContainerNode().addEventListener('touchstart', this.onTouchStart, passiveOption);
      this.getContainerNode().addEventListener('mousedown', this.onMouseDown, passiveOption); // move gesture

      window.addEventListener('touchmove', this.onTouchMove, passiveOption);
      window.addEventListener('mousemove', this.onMouseMove, passiveOption); // end gesture

      var touchAndMouseEndOptions = _objectSpread({
        capture: true
      }, passiveOption);

      window.addEventListener('touchend', this.onTouchEnd, touchAndMouseEndOptions);
      window.addEventListener('mouseup', this.onMouseUp, touchAndMouseEndOptions);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.getContainerNode().removeEventListener('wheel', this.onWheel); // Remove touch events

      this.getContainerNode().removeEventListener('touchstart', this.onTouchStart);
      window.removeEventListener('touchmove', this.onTouchMove);
      window.removeEventListener('touchend', this.onTouchEnd); // Remove mouse events

      this.getContainerNode().removeEventListener('mousedown', this.onMouseDown);
      window.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('mouseup', this.onMouseUp);
    }
    /*
      Event handlers
       All touch/mouse handlers preventDefault because we add
      both touch and mouse handlers in the same session to support devicse
      with both touch screen and mouse inputs. The browser may fire both
      a touch and mouse event for a *single* user action, so we have to ensure
      that only one handler is used by canceling the event in the first handler.
       https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent
    */

  }, {
    key: "onMouseDown",
    value: function onMouseDown(e) {
      e.preventDefault();
      this.setPointerState([e]);
    }
  }, {
    key: "onTouchStart",
    value: function onTouchStart(e) {
      e.preventDefault();
      this.setPointerState(e.touches);
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp(e) {
      this.setPointerState();
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd(e) {
      this.setPointerState(e.touches);
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove(e) {
      if (!this.startPointerInfo || this.props.disablePan) {
        return;
      }

      e.preventDefault();
      this.onDrag(e);
    }
  }, {
    key: "onTouchMove",
    value: function onTouchMove(e) {
      if (!this.startPointerInfo) {
        return;
      }

      e.preventDefault();
      var _this$props = this.props,
          disablePan = _this$props.disablePan,
          disableZoom = _this$props.disableZoom;
      var isPinchAction = e.touches.length == 2 && this.startPointerInfo.pointers.length > 1;

      if (isPinchAction && !disableZoom) {
        this.scaleFromMultiTouch(e);
      } else if (e.touches.length === 1 && this.startPointerInfo && !disablePan) {
        this.onDrag(e.touches[0]);
      }
    } // handles both touch and mouse drags

  }, {
    key: "onDrag",
    value: function onDrag(pointer) {
      var _this2 = this;

      var _this$startPointerInf = this.startPointerInfo,
          translation = _this$startPointerInf.translation,
          pointers = _this$startPointerInf.pointers;
      var startPointer = pointers[0];
      var dragX = pointer.clientX - startPointer.clientX;
      var dragY = pointer.clientY - startPointer.clientY;
      var newTranslation = {
        x: translation.x + dragX,
        y: translation.y + dragY
      };
      var shouldPreventTouchEndDefault = Math.abs(dragX) > 1 || Math.abs(dragY) > 1;
      this.setState({
        shouldPreventTouchEndDefault: shouldPreventTouchEndDefault
      }, function () {
        _this2.props.onChange({
          scale: _this2.props.value.scale,
          translation: _this2.clampTranslation(newTranslation)
        });
      });
    }
  }, {
    key: "onWheel",
    value: function onWheel(e) {
      if (this.props.disableZoom) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      var scaleChange = Math.pow(2, e.deltaY * 0.010);
      var newScale = clamp(this.props.minScale, this.props.value.scale + (1 - scaleChange), this.props.maxScale);
      var mousePos = this.clientPosToTranslatedPos({
        x: e.clientX,
        y: e.clientY
      });
      this.scaleFromPoint(newScale, mousePos);
    }
  }, {
    key: "setPointerState",
    value: function setPointerState(pointers) {
      if (!pointers || pointers.length === 0) {
        this.startPointerInfo = undefined;
        return;
      }

      this.startPointerInfo = {
        pointers: pointers,
        scale: this.props.value.scale,
        translation: this.props.value.translation
      };
    }
  }, {
    key: "clampTranslation",
    value: function clampTranslation(desiredTranslation) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props;
      var x = desiredTranslation.x,
          y = desiredTranslation.y;
      var _props$translationBou = props.translationBounds,
          xMax = _props$translationBou.xMax,
          xMin = _props$translationBou.xMin,
          yMax = _props$translationBou.yMax,
          yMin = _props$translationBou.yMin;
      xMin = xMin != undefined ? xMin : -Infinity;
      yMin = yMin != undefined ? yMin : -Infinity;
      xMax = xMax != undefined ? xMax : Infinity;
      yMax = yMax != undefined ? yMax : Infinity;
      return {
        x: clamp(xMin, x, xMax),
        y: clamp(yMin, y, yMax)
      };
    }
  }, {
    key: "translatedOrigin",
    value: function translatedOrigin() {
      var translation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.value.translation;
      var clientOffset = this.getContainerBoundingClientRect();
      return {
        x: clientOffset.left + translation.x,
        y: clientOffset.top + translation.y
      };
    } // From a given screen point return it as a point
    // in the coordinate system of the given translation

  }, {
    key: "clientPosToTranslatedPos",
    value: function clientPosToTranslatedPos(_ref) {
      var x = _ref.x,
          y = _ref.y;
      var translation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props.value.translation;
      var origin = this.translatedOrigin(translation);
      return {
        x: x - origin.x,
        y: y - origin.y
      };
    }
  }, {
    key: "scaleFromPoint",
    value: function scaleFromPoint(newScale, focalPt) {
      var _this$props$value = this.props.value,
          translation = _this$props$value.translation,
          scale = _this$props$value.scale;
      var scaleRatio = newScale / (scale != 0 ? scale : 1);
      var focalPtDelta = {
        x: coordChange(focalPt.x, scaleRatio),
        y: coordChange(focalPt.y, scaleRatio)
      };
      var newTranslation = {
        x: translation.x - focalPtDelta.x,
        y: translation.y - focalPtDelta.y
      };
      this.props.onChange({
        scale: newScale,
        translation: this.clampTranslation(newTranslation)
      });
    } // Given the start touches and new e.touches, scale and translate
    // such that the initial midpoint remains as the new midpoint. This is
    // to achieve the effect of keeping the content that was directly
    // in the middle of the two fingers as the focal point throughout the zoom.

  }, {
    key: "scaleFromMultiTouch",
    value: function scaleFromMultiTouch(e) {
      var startTouches = this.startPointerInfo.pointers;
      var newTouches = e.touches; // calculate new scale

      var dist0 = touchDistance(startTouches[0], startTouches[1]);
      var dist1 = touchDistance(newTouches[0], newTouches[1]);
      var scaleChange = dist1 / dist0;
      var startScale = this.startPointerInfo.scale;
      var targetScale = startScale + (scaleChange - 1) * startScale;
      var newScale = clamp(this.props.minScale, targetScale, this.props.maxScale); // calculate mid points

      var startMidpoint = midpoint(touchPt(startTouches[0]), touchPt(startTouches[1]));
      var newMidPoint = midpoint(touchPt(newTouches[0]), touchPt(newTouches[1])); // The amount we need to translate by in order for
      // the mid point to stay in the middle (before thinking about scaling factor)

      var dragDelta = {
        x: newMidPoint.x - startMidpoint.x,
        y: newMidPoint.y - startMidpoint.y
      };
      var scaleRatio = newScale / startScale; // The point originally in the middle of the fingers on the initial zoom start

      var focalPt = this.clientPosToTranslatedPos(startMidpoint, this.startPointerInfo.translation); // The amount that the middle point has changed from this scaling

      var focalPtDelta = {
        x: coordChange(focalPt.x, scaleRatio),
        y: coordChange(focalPt.y, scaleRatio)
      }; // Translation is the original translation, plus the amount we dragged,
      // minus what the scaling will do to the focal point. Subtracting the
      // scaling factor keeps the midpoint in the middle of the touch points.

      var newTranslation = {
        x: this.startPointerInfo.translation.x - focalPtDelta.x + dragDelta.x,
        y: this.startPointerInfo.translation.y - focalPtDelta.y + dragDelta.y
      };
      this.props.onChange({
        scale: newScale,
        translation: this.clampTranslation(newTranslation)
      });
    }
  }, {
    key: "discreteScaleStepSize",
    value: function discreteScaleStepSize() {
      var _this$props2 = this.props,
          minScale = _this$props2.minScale,
          maxScale = _this$props2.maxScale;
      var delta = Math.abs(maxScale - minScale);
      return delta / 10;
    } // Scale using the center of the content as a focal point

  }, {
    key: "changeScale",
    value: function changeScale(delta) {
      var targetScale = this.props.value.scale + delta;
      var _this$props3 = this.props,
          minScale = _this$props3.minScale,
          maxScale = _this$props3.maxScale;
      var scale = clamp(minScale, targetScale, maxScale);
      var rect = this.getContainerBoundingClientRect();
      var x = rect.left + rect.width / 2;
      var y = rect.top + rect.height / 2;
      var focalPoint = this.clientPosToTranslatedPos({
        x: x,
        y: y
      });
      this.scaleFromPoint(scale, focalPoint);
    } // Done like this so it is mockable

  }, {
    key: "getContainerNode",
    value: function getContainerNode() {
      return this.containerNode;
    }
  }, {
    key: "getContainerBoundingClientRect",
    value: function getContainerBoundingClientRect() {
      return this.getContainerNode().getBoundingClientRect();
    }
  }, {
    key: "renderControls",
    value: function renderControls() {
      var _this3 = this;

      var step = this.discreteScaleStepSize();
      return /*#__PURE__*/external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement(src_Controls, {
        onClickPlus: function onClickPlus() {
          return _this3.changeScale(step);
        },
        onClickMinus: function onClickMinus() {
          return _this3.changeScale(-step);
        },
        plusBtnContents: this.props.plusBtnContents,
        minusBtnContents: this.props.minusBtnContents,
        btnClass: this.props.btnClass,
        plusBtnClass: this.props.plusBtnClass,
        minusBtnClass: this.props.minusBtnClass,
        controlsClass: this.props.controlsClass,
        scale: this.props.value.scale,
        minScale: this.props.minScale,
        maxScale: this.props.maxScale,
        disableZoom: this.props.disableZoom
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props4 = this.props,
          showControls = _this$props4.showControls,
          children = _this$props4.children;
      var scale = this.props.value.scale; // Defensively clamp the translation. This should not be necessary if we properly set state elsewhere.

      var translation = this.clampTranslation(this.props.value.translation);
      /*
        This is a little trick to allow the following ux: We want the parent of this
        component to decide if elements inside the map are clickable. Normally, you wouldn't
        want to trigger a click event when the user *drags* on an element (only if they click
        and then release w/o dragging at all). However we don't want to assume this
        behavior here, so we call `preventDefault` and then let the parent check
        `e.defaultPrevented`. That value being true means that we are signalling that
        a drag event ended, not a click.
      */

      var handleEventCapture = function handleEventCapture(e) {
        if (_this4.state.shouldPreventTouchEndDefault) {
          e.preventDefault();

          _this4.setState({
            shouldPreventTouchEndDefault: false
          });
        }
      };

      return /*#__PURE__*/external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
        ref: function ref(node) {
          _this4.containerNode = node;
        },
        style: {
          height: '100%',
          width: '100%',
          position: 'relative',
          // for absolutely positioned children
          touchAction: 'none'
        },
        onClickCapture: handleEventCapture,
        onTouchEndCapture: handleEventCapture
      }, (children || undefined) && children({
        translation: translation,
        scale: scale
      }), (showControls || undefined) && this.renderControls());
    }
  }], [{
    key: "propTypes",
    get: function get() {
      return {
        // The content that will be transformed
        children: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.func,
        // This is a controlled component
        value: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.shape({
          scale: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.number.isRequired,
          translation: translationShape.isRequired
        }).isRequired,
        onChange: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.func.isRequired,
        disableZoom: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.bool,
        disablePan: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.bool,
        translationBounds: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.shape({
          xMin: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.number,
          xMax: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.number,
          yMin: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.number,
          yMax: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.number
        }),
        minScale: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.number,
        maxScale: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.number,
        showControls: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.bool,
        plusBtnContents: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.node,
        minusBtnContents: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.node,
        btnClass: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.string,
        plusBtnClass: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.string,
        minusBtnClass: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.string,
        controlsClass: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.string
      };
    }
  }, {
    key: "defaultProps",
    get: function get() {
      return {
        minScale: 0.05,
        maxScale: 3,
        showControls: false,
        translationBounds: {},
        disableZoom: false,
        disablePan: false
      };
    }
  }]);

  return MapInteractionControlled;
}(external_commonjs_react_commonjs2_react_amd_React_root_React_["Component"]);
/*
  Main entry point component.
  Determines if it's parent is controlling (eg it manages state) or leaving us uncontrolled
  (eg we manage our own internal state)
*/

var MapInteraction_MapInteractionController = /*#__PURE__*/function (_Component2) {
  MapInteraction_inherits(MapInteractionController, _Component2);

  var _super2 = MapInteraction_createSuper(MapInteractionController);

  function MapInteractionController(props) {
    var _this5;

    MapInteraction_classCallCheck(this, MapInteractionController);

    _this5 = _super2.call(this, props);
    var controlled = MapInteractionController.isControlled(props);

    if (controlled) {
      _this5.state = {
        lastKnownValueFromProps: props.value
      };
    } else {
      // Set the necessary state for controlling map interaction ourselves
      _this5.state = {
        value: props.defaultValue || {
          scale: 1,
          translation: {
            x: 0,
            y: 0
          }
        },
        lastKnownValueFromProps: undefined
      };
    }

    return _this5;
  }
  /*
    Handle the parent switchg form controlled to uncontrolled or vice versa.
    This is at most a best-effort attempt. It is not gauranteed by our API
    but it will do its best to maintain the state such that if the parent
    accidentally switches between controlled/uncontrolled there won't be
    any jankiness or jumpiness.
     This tries to mimick how the React <input /> component behaves.
  */


  MapInteraction_createClass(MapInteractionController, [{
    key: "innerProps",
    value: // The subset of this component's props that need to be passed
    // down to the core RMI component
    function innerProps() {
      var _this$props5 = this.props,
          value = _this$props5.value,
          defaultValue = _this$props5.defaultValue,
          onChange = _this$props5.onChange,
          innerProps = _objectWithoutProperties(_this$props5, ["value", "defaultValue", "onChange"]);

      return innerProps;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      var controlled = MapInteractionController.isControlled(this.props);
      return controlled ? this.props.value : this.state.value;
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var _this$props6 = this.props,
          _onChange = _this$props6.onChange,
          children = _this$props6.children;
      var controlled = MapInteractionController.isControlled(this.props);
      var value = controlled ? this.props.value : this.state.value;
      return /*#__PURE__*/external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement(MapInteraction_MapInteractionControlled, _extends({
        onChange: function onChange(value) {
          controlled ? _onChange(value) : _this6.setState({
            value: value
          });
        },
        value: value
      }, this.innerProps()), children);
    }
  }], [{
    key: "propTypes",
    get: function get() {
      return {
        children: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.func,
        value: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.shape({
          scale: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.number.isRequired,
          translation: translationShape.isRequired
        }),
        defaultValue: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.shape({
          scale: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.number.isRequired,
          translation: translationShape.isRequired
        }),
        disableZoom: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.bool,
        disablePan: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.bool,
        onChange: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.func,
        translationBounds: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.shape({
          xMin: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.number,
          xMax: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.number,
          yMin: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.number,
          yMax: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.number
        }),
        minScale: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.number,
        maxScale: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.number,
        showControls: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.bool,
        plusBtnContents: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.node,
        minusBtnContents: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.node,
        btnClass: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.string,
        plusBtnClass: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.string,
        minusBtnClass: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.string,
        controlsClass: external_commonjs_prop_types_commonjs2_prop_types_commonj2s_prop_types_amd_prop_types_root_PropTypes_default.a.string
      };
    }
  }, {
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var nowControlled = MapInteractionController.isControlled(props);
      var wasControlled = state.lastKnownValueFromProps && MapInteractionController.isControlled({
        value: state.lastKnownValueFromProps
      });
      /*
        State transitions:
          uncontrolled --> controlled   (unset internal state, set last props from parent)
          controlled   --> uncontrolled (set internal state to last props from parent)
          controlled   --> controlled   (update last props from parent)
          uncontrolled --> uncontrolled (do nothing)
         Note that the second two (no change in control) will also happen on the
        initial render because we set lastKnownValueFromProps in the constructor.
      */

      if (!wasControlled && nowControlled) {
        return {
          value: undefined,
          lastKnownValueFromProps: props.value
        };
      } else if (wasControlled && !nowControlled) {
        return {
          value: state.lastKnownValueFromProps,
          lastKnownValueFromProps: undefined
        };
      } else if (wasControlled && nowControlled) {
        return {
          lastKnownValueFromProps: props.value
        };
      } else if (!wasControlled && !nowControlled) {
        return null;
      }
    }
  }, {
    key: "isControlled",
    value: function isControlled(props) {
      // Similar to React's <input /> API, setting a value declares
      // that you want to control this component.
      return props.value != undefined;
    }
  }]);

  return MapInteractionController;
}(external_commonjs_react_commonjs2_react_amd_React_root_React_["Component"]);

/* harmony default export */ var MapInteraction = (MapInteraction_MapInteractionController);
// CONCATENATED MODULE: ./src/MapInteractionCSS.jsx


/*
  This component provides a map like interaction to any content that you place in it. It will let
  the user zoom and pan the children by scaling and translating props.children using css.
*/

var MapInteractionCSS_MapInteractionCSS = function MapInteractionCSS(props) {
  return /*#__PURE__*/external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement(MapInteraction, props, function (_ref) {
    var translation = _ref.translation,
        scale = _ref.scale;
    // Translate first and then scale.  Otherwise, the scale would affect the translation.
    var transform = "translate(".concat(translation.x, "px, ").concat(translation.y, "px) scale(").concat(scale, ")");
    return /*#__PURE__*/external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
      style: {
        height: '100%',
        width: '100%',
        position: 'relative',
        // for absolutely positioned children
        overflow: 'hidden',
        touchAction: 'none',
        // Not supported in Safari :(
        msTouchAction: 'none',
        cursor: 'all-scroll',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none'
      }
    }, /*#__PURE__*/external_commonjs_react_commonjs2_react_amd_React_root_React_default.a.createElement("div", {
      style: {
        display: 'inline-block',
        // size to content
        transform: transform,
        transformOrigin: '0 0 '
      }
    }, props.children));
  });
};

/* harmony default export */ var src_MapInteractionCSS = (MapInteractionCSS_MapInteractionCSS);
// CONCATENATED MODULE: ./src/index.js



/* harmony default export */ var src = __webpack_exports__["default"] = (MapInteraction);

/***/ })
/******/ ]);
});