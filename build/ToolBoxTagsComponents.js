'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Xml = exports.Category = exports.Block = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Block = exports.Block = function Block(props) {
    return _react2.default.createElement('block', props);
};
var Category = exports.Category = function Category(props) {
    return _react2.default.createElement('category', props);
};

var XmlComponent = function (_Component) {
    _inherits(XmlComponent, _Component);

    function XmlComponent() {
        _classCallCheck(this, XmlComponent);

        return _possibleConstructorReturn(this, (XmlComponent.__proto__ || Object.getPrototypeOf(XmlComponent)).apply(this, arguments));
    }

    _createClass(XmlComponent, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var injectedProps = Object.assign({}, this.props, {
                ref: function ref(x) {
                    return _this2.props.onRef(x);
                }
            });
            delete injectedProps.onRef;
            return _react2.default.createElement('xml', injectedProps);
        }
    }]);

    return XmlComponent;
}(_react.Component);

;

var Xml = exports.Xml = XmlComponent;

exports.default = {
    Block: Block,
    Xml: Xml,
    Category: Category
};