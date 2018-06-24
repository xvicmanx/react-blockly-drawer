'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ToolBoxTagsComponents = require('./ToolBoxTagsComponents');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = null;

var BlocklyToolbox = function (_React$Component) {
  _inherits(BlocklyToolbox, _React$Component);

  function BlocklyToolbox() {
    _classCallCheck(this, BlocklyToolbox);

    return _possibleConstructorReturn(this, (BlocklyToolbox.__proto__ || Object.getPrototypeOf(BlocklyToolbox)).apply(this, arguments));
  }

  _createClass(BlocklyToolbox, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.props.onUpdate();
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;

      var appearance = props.appearance || {};
      var groupedByCategory = props.tools.reduce(function (accumulated, item) {
        var result = accumulated;
        result[item.category] = result[item.category] || [];
        result[item.category].push(item.name);
        return result;
      }, {});

      var elements = Object.keys(groupedByCategory).map(function (key) {
        var blocks = groupedByCategory[key].map(function (type) {
          return _react2.default.createElement(_ToolBoxTagsComponents.Block, { type: type, key: type });
        });
        var categoryAppearance = appearance && appearance.categories && appearance.categories[key] || {};
        return _react2.default.createElement(
          _ToolBoxTagsComponents.Category,
          _extends({}, categoryAppearance, {
            key: key,
            name: key
          }),
          blocks
        );
      });

      return _react2.default.createElement(
        _ToolBoxTagsComponents.Xml,
        {
          style: styles.toolbox,
          onRef: props.onRef
        },
        elements,
        props.children
      );
    }
  }]);

  return BlocklyToolbox;
}(_react2.default.Component);

BlocklyToolbox.defaultProps = {
  onRef: function onRef() {},
  appearance: {},
  onUpdate: function onUpdate() {}
};

BlocklyToolbox.propTypes = {
  onRef: _propTypes2.default.func,
  onUpdate: _propTypes2.default.func,
  tools: _propTypes2.default.arrayOf(Object).isRequired,
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
  appearance: _propTypes2.default.object
};

styles = {
  toolbox: {
    display: 'none'
  }
};

exports.default = BlocklyToolbox;