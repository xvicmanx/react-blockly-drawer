import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Blockly from 'node-blockly/browser';
import BlocklyToolbox from './BlocklyToolbox';

let styles = null;

const initTools = (tools) => {
  tools.forEach((tool) => {
    Blockly.Blocks[tool.name] = tool.block;
    Blockly.JavaScript[tool.name] = tool.generator;
  });
};

class BlocklyDrawer extends Component {
  constructor(props) {
    super(props);
    this.onResize = this.onResize.bind(this);
    this.wrapper = null;
    this.content = null;
  }

  componentWillMount() {
    initTools(this.props.tools);
  }

  componentDidMount() {
    if (this.wrapper) {
      window.addEventListener(
        'resize',
        this.onResize,
        false
      );
      this.onResize();

      this.workspacePlayground = Blockly.inject(
        this.content,
        Object.assign(
            { toolbox: this.toolbox },
            this.props.injectOptions
        )
      );

      if (this.props.workspaceXML) {
        Blockly.Xml.domToWorkspace(
          Blockly.Xml.textToDom(
            this.props.workspaceXML
          ),
          this.workspacePlayground
        );
      }

      Blockly.svgResize(this.workspacePlayground);

      this.workspacePlayground.addChangeListener(() => {
        const code = this.props.language
          ? this.props.language.workspaceToCode(this.workspacePlayground)
          : null;
        const xml = Blockly.Xml.workspaceToDom(this.workspacePlayground);
        const xmlText = Blockly.Xml.domToText(xml);
        this.props.onChange(code, xmlText);
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    initTools(nextProps.tools);
    this.workspacePlayground.clear();
    if (nextProps.workspaceXML) {
      const dom = Blockly.Xml.textToDom(nextProps.workspaceXML);
      Blockly.Xml.domToWorkspace(dom, this.workspacePlayground);
    }
  }

  componentWillUnmount() {
    window.removeEventListener(
      'resize',
      this.onResize
    );
  }

  onResize() {
    let x = 0;
    let y = 0;
    let element = this.wrapper;
    do {
      x += element.offsetLeft;
      y += element.offsetTop;
      element = element.offsetParent;
    } while (element);

    this.content.style.left = `${x}px`;
    this.content.style.top = `${y}px`;
    this.content.style.width = `${this.wrapper.offsetWidth}px`;
    this.content.style.height = `${this.wrapper.offsetHeight}px`;
  }

  render() {
    return (
      <div
        style={styles.wrapper}
        ref={(wrapper) => {
          this.wrapper = wrapper;
        }}
      >
        <div
          style={styles.content}
          ref={(content) => {
            this.content = content;
          }}
        />
        <BlocklyToolbox
          onRef={(toolbox) => {
            this.toolbox = toolbox;
          }}
          tools={this.props.tools}
        >
          {this.props.children}
        </BlocklyToolbox>
      </div>
    );
  }
}

BlocklyDrawer.defaultProps = {
  onChange: () => {},
  tools: [],
  workspaceXML: '',
  injectOptions: {},
  language: Blockly.JavaScript,
};

BlocklyDrawer.propTypes = {
  tools: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    category: PropTypes.string,
    block: PropTypes.shape({ init: PropTypes.func }),
    generator: PropTypes.func,
  })).isRequired,
  onChange: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  workspaceXML: PropTypes.string,
  injectOptions: PropTypes.object,
  language: PropTypes.object,
};

styles = {
  wrapper: {
    minHeight: '400px',
  },
  content: {
    position: 'absolute',
  },
};

export default BlocklyDrawer;
