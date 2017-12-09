# React Blockly Drawer
A React component to play with blockly.
## Example

```shell 
$ npm install react-blockly-drawer --save
```

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Blockly from 'node-blockly/browser'; 

import BlocklyDrawer from 'react-blockly-drawer';
  
  const helloWorld =  {
    name: 'HelloWorld',
    category: 'Demo',
    block: {
      init: function () {
        this.jsonInit({
          message0: 'Hello %1',
          args0: [
            {
              type: 'field_input',
              name: 'NAME',
              check: 'String',
            },
          ],
          output: 'String',
          colour: 160,
          tooltip: 'Says Hello',
        });
      },
    },
    generator: (block) => {
      const message = `'${block.getFieldValue('NAME')}'` || '\'\'';
      const code = `console.log('Hello ${message}')`;
      return [code, Blockly.JavaScript.ORDER_MEMBER];
    },
  };

  ReactDOM.render(
    <BlocklyDrawer
      tools={[helloWorld]}
      onChange={(code, workspace) => {
        console.log(code, workspace);
      }}
    >
      <category name="Variables" custom="VARIABLE" />
      <category name="Values">
        <block type="math_number" />
        <block type="text" />
      </category>
    </BlocklyDrawer>,
    document.getElementById('root')
);

```

