# React Blockly Drawer
A React component to play with blockly.
## Example

```shell 
$ npm install react-blockly-drawer node-blockly --save
```

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Blockly from 'node-blockly/browser'; 

import BlocklyDrawer, { Block, Category } from 'react-blockly-drawer';
  
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
      appearance={
        {
          categories: {
            Demo: {
              colour: '270'
            },
          },
        }
      }
    >
      <Category name="Variables" custom="VARIABLE" />
      <Category name="Values">
        <Block type="math_number" />
        <Block type="text" />
      </Category>
    </BlocklyDrawer>,
    document.getElementById('root')
);

```

## Component Properties

#### `onChange`: function (code, workspaceXML) {}
Event listener to the workspace change.  Two arguments are passed to this callback:
- `code` is the generated code of your created program (see the property
  `language`);
- `workspaceXML` is an XML text that corresponds to the content of the workspace.

#### `language`: object [optional]
A language generator, either one of the languages described in the
[Blockly documentation on code generation](https://developers.google.com/blockly/guides/configure/web/code-generators) or
a custom object with method `workspaceToCode`. Default generator is
`Blockly.Javascript`. If `language` is set to `null`, no code is generated and
the first argument passed to the `onChange` function, `code` will be `null`.

#### `children`:  node(s)
Blockly predefined blocks/tools can be passed as children of this component.
For example, the following content could be passed.
```xml
<Category name="Variables" custom="VARIABLE" />
<Category name="Values">
  <Block type="math_number" />
  <Block type="text" />
</Category>
```

#### `workspaceXML`: string [optional]
Workspace XML initial content. It is no necessary to pass it if you want a new/empty workspace.

#### `injectOptions`: object [optional]
Options for the workspace. See [blocklyDocumentation](https://developers.google.com/blockly/guides/get-started/web#configuration) for details.

#### `appearance`: object [optional]
Options for styling.
In order to style the block categories an object containing the `categories`
property should be passed. This property categories is an object that has
the categories names as keys and the values contain the styling properties for that block category.
For example: 

```js
{
  categories: {
    Demo: {
      colour: '270'
    },
  },
}
```
This way the category `Demo` is colored.

See [blocklyDocumentation](https://developers.google.com/blockly/guides/get-started/web#configuration) for block categories styling. for details.

 #### `className`: string
Component's class

 #### `style`: object
 Component's style

#### `tools`: array [optional]
An array of your custom block/tools.
Each item should have the following properties:
 + ##### `name`: string
 + It is the name of the block/tool.
  
 + ##### `category`: string
 + The category where this block/tool is going to be inside of.
  
 + ##### `block`: object
 + Block's definition as it is done in Blockly.
 
 + ##### `generator`: function
 + Generator's definition as it is done in Blockly.
 
 
 For example:
 
 ```javascript
   {
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
    }
 ```

## Comments
Feel free to make any suggestion to improve this component.

