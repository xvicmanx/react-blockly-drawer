import React from 'react';
import Drawer from '../index';
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
                <category name="Functions" custom="PROCEDURE"></category>
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
                        init: () => {},
                    },
                    generator: () => {},
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
        ).toEqual({ toolbox: '<xml style="display: none;"></xml>' }
    );
        
    });
})

