import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Block,
  Xml,
  Category
} from './ToolBoxTagsComponents';

let styles = null;

class BlocklyToolbox extends React.Component {
  componentDidUpdate() {
    this.props.onUpdate();
  }

  render() {
    const { props } = this;
    const appearance = props.appearance || {};
    const noCategoryItems = [];
    const groupedByCategory = {};
    props.tools.forEach((item) => {
      if (item.category) {
        groupedByCategory[item.category] = groupedByCategory[item.category] || [];
        groupedByCategory[item.category].push(item.name);
      } else {
        noCategoryItems.push(item.name);
      }
    });

    const elements = Object.keys(groupedByCategory).map((key) => {
      const blocks = groupedByCategory[key].map((type) => <Block type={type} key={type} />);
      const categoryAppearance = appearance && appearance.categories &&
        appearance.categories[key] || {};
      return (
        <Category
          {...categoryAppearance}
          key={key}
          name={key}
        >
          {blocks}
        </Category>
      );
    });

    noCategoryItems.forEach(name => {
      elements.push(<Block type={name} key={name} />);
    });

    return (
      <Xml
        style={styles.toolbox}
        onRef={props.onRef}
      >
        {elements}
        {props.children}
      </Xml>
    );
  }
}

BlocklyToolbox.defaultProps = {
  onRef: () => { },
  appearance: {},
  onUpdate: () => {},
};

BlocklyToolbox.propTypes = {
  onRef: PropTypes.func,
  onUpdate: PropTypes.func,
  tools: PropTypes.arrayOf(Object).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  appearance: PropTypes.object,
};

styles = {
  toolbox: {
    display: 'none',
  },
};

export default BlocklyToolbox;
