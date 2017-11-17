import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

class MDEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
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
          onChange={this.onChange}
          placeholder="Write something ... "
          ref="editor"
        />
      </div>
    );
  }
}

export default MDEditor;
