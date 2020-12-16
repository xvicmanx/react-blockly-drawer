"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ToolBoxTagsComponents = require("./ToolBoxTagsComponents");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var styles = null;

var BlocklyToolbox = /*#__PURE__*/function (_React$Component) {
  _inherits(BlocklyToolbox, _React$Component);

  var _super = _createSuper(BlocklyToolbox);

  function BlocklyToolbox() {
    _classCallCheck(this, BlocklyToolbox);

    return _super.apply(this, arguments);
  }

  _createClass(BlocklyToolbox, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.props.onUpdate();
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props;
      var appearance = props.appearance || {};
      var noCategoryItems = [];
      var groupedByCategory = {};
      props.tools.forEach(function (item) {
        if (item.category) {
          groupedByCategory[item.category] = groupedByCategory[item.category] || [];
          groupedByCategory[item.category].push(item.name);
        } else {
          noCategoryItems.push(item.name);
        }
      });
      var elements = Object.keys(groupedByCategory).map(function (key) {
        var blocks = groupedByCategory[key].map(function (type) {
          return /*#__PURE__*/_react["default"].createElement(_ToolBoxTagsComponents.Block, {
            type: type,
            key: type
          });
        });
        var categoryAppearance = appearance && appearance.categories && appearance.categories[key] || {};
        return /*#__PURE__*/_react["default"].createElement(_ToolBoxTagsComponents.Category, _extends({}, categoryAppearance, {
          key: key,
          name: key
        }), blocks);
      });
      noCategoryItems.forEach(function (name) {
        elements.push( /*#__PURE__*/_react["default"].createElement(_ToolBoxTagsComponents.Block, {
          type: name,
          key: name
        }));
      });
      return /*#__PURE__*/_react["default"].createElement(_ToolBoxTagsComponents.Xml, {
        style: styles.toolbox,
        onRef: props.onRef
      }, elements, props.children);
    }
  }]);

  return BlocklyToolbox;
}(_react["default"].Component);

BlocklyToolbox.defaultProps = {
  onRef: function onRef() {},
  appearance: {},
  onUpdate: function onUpdate() {}
};
BlocklyToolbox.propTypes = {
  onRef: _propTypes["default"].func,
  onUpdate: _propTypes["default"].func,
  tools: _propTypes["default"].arrayOf(Object).isRequired,
  children: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].node), _propTypes["default"].node]),
  appearance: _propTypes["default"].object
};
styles = {
  toolbox: {
    display: 'none'
  }
};
var _default = BlocklyToolbox;
exports["default"] = _default;