import React from 'react';
import PropTypes from 'prop-types';

let styles = null;

const BlocklyToolbox = (props) => {
  const groupedByCategory = props.tools.reduce(
    (accumulated, item) => {
      const result = accumulated;
      result[item.category] = result[item.category] || [];
      result[item.category].push(item.name);
      return result;
    },
    {}
  );

  const elements = Object.keys(groupedByCategory).map((key) => {
    const blocks = groupedByCategory[key].map((type) => {
      return <block type={type} key={type} />;
    });
    return (
      <category
        key={key}
        name={key}
      >
        {blocks}
      </category>
    );
  });

  return (
    <xml
      style={styles.toolbox}
      ref={props.onRef}
    >
      {elements}
      {props.children}
    </xml>
  );
};

BlocklyToolbox.defaultProps = {
  onRef: () => {},
};

BlocklyToolbox.propTypes = {
  onRef: PropTypes.func,
  tools: PropTypes.arrayOf(Object).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

styles = {
  toolbox: {
    display: 'none',
  },
};

export default BlocklyToolbox;
