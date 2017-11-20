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
import previewMD from '../utils/convertToMD.js';

export default class MDEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this._onChange(editorState);
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.keyBindingFn = (key) => insertMDchars(key);
  }

  _onChange(newState) {
    this.setState({editorState: newState});
    previewMD(newState.getCurrentContent());
  }

  _handleKeyCommand(command) {
    const { editorState } = this.state;
    var index = commands.indexOf(command);
    if (index !== -1 && index < 2) {
      index = textToInsert(command).length/2;
      var newState = appendText(editorState, textToInsert(command).substring(0, index));
      const newSelection = newState.getSelection();
      newState = appendText(newState, textToInsert(command).substring(index));
      newState = EditorState.forceSelection(newState, newSelection);
      this.setState({editorState: newState});
      return true;
    } else if (index !== -1) {
      this.setState({editorState: appendText(editorState, textToInsert(command))});
      return true;
    }
    return false;
  }

  render() {
    return (
      <div className="editor" id="editor">
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

function appendText(editorState, text): EditorState {
  return EditorState.push(
    editorState,
    Modifier.insertText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      text
    )
  );
}
