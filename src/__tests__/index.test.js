import React from 'react';
import Drawer, { Category } from '../index';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount, render } from 'enzyme';

jest.mock('node-blockly/browser');

import Blockly from 'node-blockly/browser';

Enzyme.configure({ adapter: new Adapter() })

describe('BlocklyDrawerComponent', () => {
    let playground = null;
    beforeEach(() => {
        playground = {
            addChangeListener: jest.fn((cb) => { cb(); })
        };
        Blockly.svgResize.mockReset();
        Blockly.inject.mockReset();
        Blockly.JavaScript.workspaceToCode.mockReset();
        Blockly.Xml.workspaceToDom.mockReset();
        Blockly.Xml.domToText.mockReset()
        Blockly.inject.mockImplementation(() => playground);
        Blockly.JavaScript.workspaceToCode.mockImplementation(() => 'test-code');
        Blockly.Xml.workspaceToDom.mockImplementation(() => 'test-xml');
        Blockly.Xml.domToText.mockImplementation(() => 'test-dom-text');
        Blockly.Xml.textToDom.mockImplementation(() => 'test-dom');
    });

    it('renders correctly when no tools nor predefined categories are passed', () => {
        const tree = renderer
            .create(<Drawer />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });


    it('renders correctly when predefined categories are passed', () => {
        const comp = mount(
            <Drawer>
                <Category name="Functions" custom="PROCEDURE"></Category>
            </Drawer>
        );

        expect(comp.html()).toMatchSnapshot();
    });


    it('renders correctly when tools are passed', () => {
        const comp = mount(
            <Drawer tools={[
                {
                    name: 'TestName',
                    category: 'TestCategory',
                    block: {
                        init: () => { },
                    },
                    generator: () => { },
                }
            ]} />
        );

        expect(comp.html()).toMatchSnapshot();
    });


    it('is initialized correctly', () => {
        const onChange = jest.fn();
        const comp = mount(<Drawer onChange={onChange} />);
        expect(
            Blockly.inject.mock.calls.length
        ).toBe(1);
        expect(
            Blockly.svgResize.mock.calls.length
        ).toBe(1);
        expect(
            Blockly.JavaScript.workspaceToCode.mock.calls.length
        ).toBe(1);
        expect(
            Blockly.Xml.workspaceToDom.mock.calls.length
        ).toBe(1);
        expect(
            Blockly.Xml.domToText.mock.calls.length
        ).toBe(1);
        expect(
            onChange.mock.calls.length
        ).toBe(1);

        expect(
            Blockly.svgResize.mock.calls[0][0]
        ).toBe(playground);
        expect(
            Blockly.JavaScript.workspaceToCode.mock.calls[0][0]
        ).toBe(playground);
        expect(
            Blockly.Xml.workspaceToDom.mock.calls[0][0]
        ).toBe(playground);
        expect(
            Blockly.Xml.domToText.mock.calls[0][0]
        ).toBe('test-xml');

        expect(
            onChange.mock.calls[0][0]
        ).toBe('test-code');
        expect(
            onChange.mock.calls[0][1]
        ).toBe('test-dom-text');

        expect(
            '' + Blockly.inject.mock.calls[0][0].outerHTML
        ).toBe("<div style=\"position: absolute; left: 0px; top: 0px; width: 0px; height: 0px;\"></div>");
        expect(
            {
                toolbox: Blockly.inject.mock.calls[0][1].toolbox.outerHTML
            }
        ).toEqual({ toolbox: '<xml style="display: none;"></xml>' });
    });

    it('initializes correctly when initial workspace is passed', () => {
        const workspaceXML = '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="HelloWorld" id="gUb!;E2#;hgDD2tP3][/" x="264" y="101"><field name="NAME">sdfsd</field></block></xml>';
        const comp = mount(
            <Drawer
                workspaceXML={workspaceXML}
            />
        );

        expect(comp.html()).toMatchSnapshot();
        expect(
            Blockly.Xml.textToDom.mock.calls.length
        ).toBe(1);
        expect(
            Blockly.Xml.textToDom.mock.calls[0][0]
        ).toBe(workspaceXML);

        expect(
            Blockly.Xml.domToWorkspace.mock.calls.length
        ).toBe(1);
        expect(
            Blockly.Xml.domToWorkspace.mock.calls[0][0]
        ).toBe('test-dom');
        expect(
            Blockly.Xml.domToWorkspace.mock.calls[0][1]
        ).toBe(playground);
    });

    it('passes injectOptions to inject', () => {
        const comp = mount(
            <Drawer
                injectOptions={{foo: 42}}
            />
        );
        expect(Blockly.inject.mock.calls[0][1].foo).toBe(42);
    });
})

