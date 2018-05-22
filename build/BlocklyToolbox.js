'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ToolBoxTagsComponents = require('./ToolBoxTagsComponents');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = null;

var BlocklyToolbox = function BlocklyToolbox(props) {
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
};

BlocklyToolbox.defaultProps = {
  onRef: function onRef() {},
  appearance: {}
};

BlocklyToolbox.propTypes = {
  onRef: _propTypes2.default.func,
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