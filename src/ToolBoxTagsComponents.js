import React, { Component } from 'react';

export const Block = (p) => {
    const { children, ...props } = p;
    props.is = "blockly";
    return React.createElement("block", props, children);
};

export const Category = (p) => {
    const { children, ...props } = p;
    props.is = "blockly";
    return React.createElement("category", props, children);
};


class XmlComponent extends Component {
    render() {
        const injectedProps = Object.assign(
            {},
            this.props,
            {
                ref: (x) => this.props.onRef(x)
            });
        delete injectedProps.onRef;
        injectedProps.is = "blockly";
        return React.createElement('xml', injectedProps);
    }
};

export const Xml = XmlComponent;

export default {
    Block,
    Xml,
    Category
};
