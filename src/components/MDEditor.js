import React, { Component } from 'react';
import {
  Editor,
  EditorState,
  SelectionState,
  Modifier
} from 'draft-js';
import insertMDchars from '../utils/key_bindings.js';

class MDEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      selectionState: SelectionState.createEmpty()
    };
    this.onChange = (editorState) => this.setState({editorState});
  }

  handleKeyCommand(command) {
    var editorState = this.state.editorState;
    if (command === 'bold') {
      const newContent = Modifier.insertText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        '**'
      );
      editorState = EditorState.push(editorState, newContent);
      this.onChange(editorState);
      var newSelection = this.state.selectionState.getEndOffset() - 1;
      this.setState({selectionState: newSelection});
      return true;
    }
    return false;
  }

  render() {
    return (
      <div className="editor" id="MDEditor">
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={(command) => this.handleKeyCommand(command)}
          keyBindingFn={insertMDchars}
          onChange={this.onChange}
          placeholder="Write something ... "
          ref="editor"
        />
      </div>
    );
  }
}

export default MDEditor;
