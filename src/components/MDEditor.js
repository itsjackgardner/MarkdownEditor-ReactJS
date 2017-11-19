import React, { Component } from 'react';
import {
  Editor,
  EditorState,
  Modifier
} from 'draft-js';
import {
  insertMDchars,
  textToInsert,
  commands
} from '../utils/keyBindings.js';
import convertToMD from '../utils/MDParser.js';

export default class MDEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this._onChange(editorState);
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.keyBindingFn = (key) => insertMDchars(key);
  }

  _onChange(newState) {
    var preview = document.getElementById('preview');
    preview.innerHTML = convertToMD(newState.getCurrentContent());
  }

  _handleKeyCommand(command) {
    const { editorState } = this.state;
    if (commands.indexOf(command) !== -1) {
      this.setState({editorState: EditorState.push(
        editorState,
        Modifier.insertText(
          editorState.getCurrentContent(),
          editorState.getSelection(),
          textToInsert(command)
        )
      )});
      return true;
    }
    return false;
  }

  render() {
    return (
      <div className="editor" id="MDEditor">
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          keyBindingFn={this.keyBindingFn}
          placeholder="Write something ... "
        />
      </div>
    );
  }
}
