'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _enzymeAdapterReact = require('enzyme-adapter-react-16');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

var _enzyme = require('enzyme');

var _enzyme2 = _interopRequireDefault(_enzyme);

var _browser = require('node-blockly/browser');

var _browser2 = _interopRequireDefault(_browser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('node-blockly/browser');

_enzyme2.default.configure({ adapter: new _enzymeAdapterReact2.default() });

describe('BlocklyDrawerComponent', function () {
    var playground = null;
    beforeEach(function () {
        playground = {
            addChangeListener: jest.fn(function (cb) {
                cb();
            })
        };
        _browser2.default.svgResize.mockReset();
        _browser2.default.inject.mockReset();
        _browser2.default.JavaScript.workspaceToCode.mockReset();
        _browser2.default.Xml.workspaceToDom.mockReset();
        _browser2.default.Xml.domToText.mockReset();
        _browser2.default.inject.mockImplementation(function () {
            return playground;
        });
        _browser2.default.JavaScript.workspaceToCode.mockImplementation(function () {
            return 'test-code';
        });
        _browser2.default.Xml.workspaceToDom.mockImplementation(function () {
            return 'test-xml';
        });
        _browser2.default.Xml.domToText.mockImplementation(function () {
            return 'test-dom-text';
        });
    });

    it('renders correctly when no tools nor predefined categories are passed', function () {
        var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_index2.default, null)).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly when predefined categories are passed', function () {
        var comp = (0, _enzyme.mount)(_react2.default.createElement(
            _index2.default,
            null,
            _react2.default.createElement('category', { name: 'Functions', custom: 'PROCEDURE' })
        ));

        expect(comp.html()).toMatchSnapshot();
    });

    it('renders correctly when tools are passed', function () {
        var comp = (0, _enzyme.mount)(_react2.default.createElement(_index2.default, { tools: [{
                name: 'TestName',
                category: 'TestCategory',
                block: {
                    init: function init() {}
                },
                generator: function generator() {}
            }] }));

        expect(comp.html()).toMatchSnapshot();
    });

    it('is initialized correctly', function () {
        var onChange = jest.fn();
        var comp = (0, _enzyme.mount)(_react2.default.createElement(_index2.default, { onChange: onChange }));
        expect(_browser2.default.inject.mock.calls.length).toBe(1);
        expect(_browser2.default.svgResize.mock.calls.length).toBe(1);
        expect(_browser2.default.JavaScript.workspaceToCode.mock.calls.length).toBe(1);
        expect(_browser2.default.Xml.workspaceToDom.mock.calls.length).toBe(1);
        expect(_browser2.default.Xml.domToText.mock.calls.length).toBe(1);
        expect(onChange.mock.calls.length).toBe(1);

        expect(_browser2.default.svgResize.mock.calls[0][0]).toBe(playground);
        expect(_browser2.default.JavaScript.workspaceToCode.mock.calls[0][0]).toBe(playground);
        expect(_browser2.default.Xml.workspaceToDom.mock.calls[0][0]).toBe(playground);
        expect(_browser2.default.Xml.domToText.mock.calls[0][0]).toBe('test-xml');

        expect(onChange.mock.calls[0][0]).toBe('test-code');
        expect(onChange.mock.calls[0][1]).toBe('test-dom-text');

        expect('' + _browser2.default.inject.mock.calls[0][0].outerHTML).toBe("<div style=\"position: absolute; left: 0px; top: 0px; width: 0px; height: 0px;\"></div>");
        expect({
            toolbox: _browser2.default.inject.mock.calls[0][1].toolbox.outerHTML
        }).toEqual({ toolbox: '<xml style="display: none;"></xml>' });
    });
});