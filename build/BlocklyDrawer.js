"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _browser = _interopRequireDefault(require("node-blockly/browser"));

var _BlocklyToolbox = _interopRequireDefault(require("./BlocklyToolbox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var initTools = function initTools(tools) {
  var language = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _browser["default"].JavaScript;
  tools.forEach(function (tool) {
    _browser["default"].Blocks[tool.name] = tool.block;
    language[tool.name] = tool.generator;
  });
};

var BlocklyDrawer = /*#__PURE__*/function (_Component) {
  _inherits(BlocklyDrawer, _Component);

  var _super = _createSuper(BlocklyDrawer);

  function BlocklyDrawer(props) {
    var _this;

    _classCallCheck(this, BlocklyDrawer);

    _this = _super.call(this, props);
    _this.onResize = _this.onResize.bind(_assertThisInitialized(_this));
    _this.wrapper = null;
    _this.content = null;
    return _this;
  }

  _createClass(BlocklyDrawer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      initTools(this.props.tools, this.props.language);

      if (this.wrapper) {
        window.addEventListener('resize', this.onResize, false);
        this.onResize();
        this.workspacePlayground = _browser["default"].inject(this.content, Object.assign({
          toolbox: this.toolbox
        }, this.props.injectOptions));

        if (this.props.workspaceXML) {
          _browser["default"].Xml.domToWorkspace(_browser["default"].Xml.textToDom(this.props.workspaceXML), this.workspacePlayground);
        }

        _browser["default"].svgResize(this.workspacePlayground);

        this.workspacePlayground.addChangeListener(function () {
          var code = _this2.props.language ? _this2.props.language.workspaceToCode(_this2.workspacePlayground) : null;

          var xml = _browser["default"].Xml.workspaceToDom(_this2.workspacePlayground);

          var xmlText = _browser["default"].Xml.domToText(xml);

          _this2.props.onChange(code, xmlText);
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      initTools(this.props.tools, this.props.language);
      this.workspacePlayground.clear();

      if (this.props.workspaceXML) {
        var dom = _browser["default"].Xml.textToDom(this.props.workspaceXML);

        _browser["default"].Xml.domToWorkspace(dom, this.workspacePlayground);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.onResize);
    }
  }, {
    key: "onResize",
    value: function onResize() {
      var element = this.wrapper;

      do {
        element = element.offsetParent;
      } while (element);

      this.content.style.width = "".concat(this.wrapper.offsetWidth, "px");
      this.content.style.height = "".concat(this.wrapper.offsetHeight, "px");
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var wrapperStyle = Object.assign({}, styles.wrapper, this.props.style);
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: this.props.className,
        style: wrapperStyle,
        ref: function ref(wrapper) {
          _this3.wrapper = wrapper;
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: styles.content,
        ref: function ref(content) {
          _this3.content = content;
        }
      }), /*#__PURE__*/_react["default"].createElement(_BlocklyToolbox["default"], {
        onRef: function onRef(toolbox) {
          _this3.toolbox = toolbox;
        },
        tools: this.props.tools,
        appearance: this.props.appearance,
        onUpdate: function onUpdate() {
          if (_this3.workspacePlayground && _this3.toolbox) {
            _this3.workspacePlayground.updateToolbox(_this3.toolbox.outerHTML);
          }
        }
      }, this.props.children));
    }
  }]);

  return BlocklyDrawer;
}(_react.Component);

BlocklyDrawer.defaultProps = {
  onChange: function onChange() {},
  tools: [],
  workspaceXML: '',
  injectOptions: {},
  language: _browser["default"].JavaScript,
  appearance: {},
  className: '',
  style: {}
};
BlocklyDrawer.propTypes = {
  tools: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    name: _propTypes["default"].string,
    category: _propTypes["default"].string,
    block: _propTypes["default"].shape({
      init: _propTypes["default"].func
    }),
    generator: _propTypes["default"].func
  })).isRequired,
  onChange: _propTypes["default"].func,
  children: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].node), _propTypes["default"].node]),
  workspaceXML: _propTypes["default"].string,
  injectOptions: _propTypes["default"].object,
  language: _propTypes["default"].object,
  appearance: _propTypes["default"].object,
  className: _propTypes["default"].string,
  style: _propTypes["default"].object
};
styles = {
  wrapper: {
    minHeight: '400px',
    position: 'relative'
  },
  content: {
    position: 'absolute'
  }
};
var _default = BlocklyDrawer;
exports["default"] = _default;