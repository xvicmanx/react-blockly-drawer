'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Category = exports.Block = exports.Xml = undefined;

var _BlocklyDrawer = require('./BlocklyDrawer');

var _BlocklyDrawer2 = _interopRequireDefault(_BlocklyDrawer);

var _ToolBoxTagsComponents = require('./ToolBoxTagsComponents');

var tags = _interopRequireWildcard(_ToolBoxTagsComponents);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Xml = exports.Xml = tags.Xml;
var Block = exports.Block = tags.Block;
var Category = exports.Category = tags.Category;

exports.default = _BlocklyDrawer2.default;