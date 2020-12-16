import React from 'react';
import Drawer, { Category } from '../index';
import { create, act, render } from 'react-test-renderer';

jest.mock('node-blockly/browser');

import Blockly from 'node-blockly/browser';

describe('BlocklyDrawerComponent', () => {
    let playground = null;
    const options = {
        createNodeMock: (element) => {
            if (element.type === 'div') {
                return {
                    offsetWidth: 10,
                    offsetHeight: 15,
                    style: {},
                };
            }
            return null;
        },
    };

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
        const tree = create(<Drawer />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });


    it('renders correctly when predefined categories are passed', () => {
        const comp = create(
            <Drawer>
                <Category name="Functions" custom="PROCEDURE"></Category>
            </Drawer>
        );

        expect(comp.toJSON()).toMatchSnapshot();
    });


    it('renders correctly when tools are passed', () => {
        const comp = create(
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

        expect(comp.toJSON()).toMatchSnapshot();
    });

    it('renders correctly when appearance is passed', () => {
        const comp = create(
            <Drawer
                tools={[
                    {
                        name: 'TestName',
                        category: 'TestCategory',
                        block: {
                            init: () => { },
                        },
                        generator: () => { },
                    }
                ]}
                appearance={
                    {
                        categories: {
                            TestCategory: {
                                colour: 'blue'
                            },
                        },
                    }
                } />
        );

        expect(comp.toJSON()).toMatchSnapshot();
    });


    it('is initialized correctly', () => {
        const onChange = jest.fn();
        let comp;

        act(() => {
            comp = create(
                <Drawer onChange={onChange} />,
                options,
            );
        });
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

        expect(Blockly.inject.mock.calls[0][0]).toEqual({
            offsetHeight: 15,
            offsetWidth: 10,
            style: {
              height: '15px',
              width: '10px',
            },
        });
        expect(Blockly.inject.mock.calls[0][1]).toEqual({ toolbox: null });
    });

    it('initializes correctly when initial workspace is passed', () => {
        const workspaceXML = '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="HelloWorld" id="gUb!;E2#;hgDD2tP3][/" x="264" y="101"><field name="NAME">sdfsd</field></block></xml>';
        let comp;

        act(() => {
            comp = create(
                <Drawer
                    workspaceXML={workspaceXML}
                />,
                options,
            );
        });

        expect(comp.toJSON()).toMatchSnapshot();
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
        let comp;
    
        act(() => {
            comp = create(
                <Drawer
                    injectOptions={{ foo: 42 }}
                />,
                options,
            );
        });
        expect(Blockly.inject.mock.calls[0][1].foo).toBe(42);
    });

    it('allows redefining a language', () => {
        const onChange = jest.fn();
        const mockLanguage = {
            workspaceToCode: jest.fn().mockReturnValue('more-test-code')
        }
        let comp;
        act(() => {
            comp = create(<Drawer onChange={onChange} language={mockLanguage} />, options);
        });

        expect(
            mockLanguage.workspaceToCode.mock.calls.length
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
            mockLanguage.workspaceToCode.mock.calls[0][0]
        ).toBe(playground);
        expect(
            Blockly.Xml.workspaceToDom.mock.calls[0][0]
        ).toBe(playground);
        expect(
            Blockly.Xml.domToText.mock.calls[0][0]
        ).toBe('test-xml');

        expect(
            onChange.mock.calls[0][0]
        ).toBe('more-test-code');
        expect(
            onChange.mock.calls[0][1]
        ).toBe('test-dom-text');
    });

    it('allows removing a language', () => {
        const onChange = jest.fn();
        let comp;
        act(() => {
            comp = create(<Drawer onChange={onChange} language={null} />, options);
        });
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
            Blockly.Xml.workspaceToDom.mock.calls[0][0]
        ).toBe(playground);
        expect(
            Blockly.Xml.domToText.mock.calls[0][0]
        ).toBe('test-xml');

        expect(
            onChange.mock.calls[0][0]
        ).toBe(null);
        expect(
            onChange.mock.calls[0][1]
        ).toBe('test-dom-text');
    });
})

