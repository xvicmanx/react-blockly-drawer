'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _browser = require('node-blockly/browser');

var _browser2 = _interopRequireDefault(_browser);

var _BlocklyToolbox = require('./BlocklyToolbox');

var _BlocklyToolbox2 = _interopRequireDefault(_BlocklyToolbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = null;

var initTools = function initTools(tools) {
  tools.forEach(function (tool) {
    _browser2.default.Blocks[tool.name] = tool.block;
    _browser2.default.JavaScript[tool.name] = tool.generator;
  });
};

var BlocklyDrawer = function (_Component) {
  _inherits(BlocklyDrawer, _Component);

  function BlocklyDrawer(props) {
    _classCallCheck(this, BlocklyDrawer);

    var _this = _possibleConstructorReturn(this, (BlocklyDrawer.__proto__ || Object.getPrototypeOf(BlocklyDrawer)).call(this, props));

    _this.onResize = _this.onResize.bind(_this);
    _this.wrapper = null;
    _this.content = null;
    return _this;
  }

  _createClass(BlocklyDrawer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      initTools(this.props.tools);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.wrapper) {
        window.addEventListener('resize', this.onResize, false);
        this.onResize();

        this.workspacePlayground = _browser2.default.inject(this.content, Object.assign({ toolbox: this.toolbox }, this.props.injectOptions));

        if (this.props.workspaceXML) {
          _browser2.default.Xml.domToWorkspace(_browser2.default.Xml.textToDom(this.props.workspaceXML), this.workspacePlayground);
        }

        _browser2.default.svgResize(this.workspacePlayground);

        this.workspacePlayground.addChangeListener(function () {
          var code = _this2.props.language ? _this2.props.language.workspaceToCode(_this2.workspacePlayground) : null;
          var xml = _browser2.default.Xml.workspaceToDom(_this2.workspacePlayground);
          var xmlText = _browser2.default.Xml.domToText(xml);
          _this2.props.onChange(code, xmlText);
        });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      initTools(nextProps.tools);
      this.workspacePlayground.clear();
      if (nextProps.workspaceXML) {
        var dom = _browser2.default.Xml.textToDom(nextProps.workspaceXML);
        _browser2.default.Xml.domToWorkspace(dom, this.workspacePlayground);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.onResize);
    }
  }, {
    key: 'onResize',
    value: function onResize() {
      var element = this.wrapper;
      do {
        element = element.offsetParent;
      } while (element);
      this.content.style.width = this.wrapper.offsetWidth + 'px';
      this.content.style.height = this.wrapper.offsetHeight + 'px';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var wrapperStyle = Object.assign({}, styles.wrapper, this.props.style);
      return _react2.default.createElement(
        'div',
        {
          className: this.props.className,
          style: wrapperStyle,
          ref: function ref(wrapper) {
            _this3.wrapper = wrapper;
          }
        },
        _react2.default.createElement('div', {
          style: styles.content,
          ref: function ref(content) {
            _this3.content = content;
          }
        }),
        _react2.default.createElement(
          _BlocklyToolbox2.default,
          {
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
          },
          this.props.children
        )
      );
    }
  }]);

  return BlocklyDrawer;
}(_react.Component);

BlocklyDrawer.defaultProps = {
  onChange: function onChange() {},
  tools: [],
  workspaceXML: '',
  injectOptions: {},
  language: _browser2.default.JavaScript,
  appearance: {},
  className: '',
  style: {}
};

BlocklyDrawer.propTypes = {
  tools: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    name: _propTypes2.default.string,
    category: _propTypes2.default.string,
    block: _propTypes2.default.shape({ init: _propTypes2.default.func }),
    generator: _propTypes2.default.func
  })).isRequired,
  onChange: _propTypes2.default.func,
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
  workspaceXML: _propTypes2.default.string,
  injectOptions: _propTypes2.default.object,
  language: _propTypes2.default.object,
  appearance: _propTypes2.default.object,
  className: _propTypes2.default.string,
  style: _propTypes2.default.object
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

exports.default = BlocklyDrawer;