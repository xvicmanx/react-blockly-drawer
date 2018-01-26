import React, { Component } from 'react';

export const Block = (props) => {
    return React.createElement('block', props)
};
export const Category = (props) => {
    return React.createElement('category', props);
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
        return React.createElement('xml', injectedProps);
    }
};

export const Xml = XmlComponent;

export default {
    Block,
    Xml,
    Category
};
