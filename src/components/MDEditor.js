import React, { Component } from 'react';
import {
  Editor,
  EditorState,
  Modifier
} from 'draft-js';
import { insertMDchars, textToInsert, commands } from '../utils/keyBindings.js';

export default class MDEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }

  handleKeyCommand(command) {
    const { editorState } = this.state;
    if (commands.indexOf(command) !== -1) {
      const newContent = Modifier.insertText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        textToInsert(command)
      );
      this.onChange(EditorState.push(editorState, newContent));
      return true;
    }
    return false;
  }

  render() {
    console.log('hi?');
    return (
      <div className="editor" id="MDEditor">
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={(command) => this.handleKeyCommand(command)}
          keyBindingFn={insertMDchars}
          onChange={this.onChange}
          placeholder="Write something ... "
        />
      </div>
    );
  }
}
