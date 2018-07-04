import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import Markdown from 'react-markdown';
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

export default class MDEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.onChange = (editorState) => this._onChange(editorState);
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.keyBindingFn = (key) => insertMDchars(key);
  }

  _onChange(newState) {
    this.setState({editorState: newState});
    //previewMD(newState.getCurrentContent());
  }

  _handleKeyCommand(command) {

    const { editorState } = this.state;
    var index = commands.indexOf(command);
    var content   = editorState.getCurrentContent(),
        selection = editorState.getSelection();

    if (index !== -1 && index < 2) {

      let half  = textToInsert(command).length / 2,
          front = textToInsert(command).substring(0, half),
          back  = textToInsert(command).substring(half);

      if (selection.isCollapsed()) {
        let appendState = appendText(
          editorState,
          content,
          selection,
          front
        );
        let finalState = appendText(
          appendState,
          appendState.getCurrentContent(),
          appendState.getSelection(),
          back
        );
        this.setState({
          editorState: EditorState.forceSelection(finalState, appendState.getSelection())
        });
      } else {
        let block = content.getBlockForKey(selection.getAnchorKey()),
            start = selection.getStartOffset(),
            end   = selection.getEndOffset();
        let selectedText = block.getText().slice(start, end);
        let newText = front + selectedText + back;
        let finalState = appendText(editorState, content, selection, newText);
        this.setState({editorState: finalState});
      }

      return true;

    } else if (index !== -1) {
      if (selection.isCollapsed()) {
        this.setState({
          editorState: appendText(
            editorState,
            content,
            selection,
            textToInsert(command)
          )
        });
      } else {
        let block = content.getBlockForKey(selection.getAnchorKey()),
            start = selection.getStartOffset(),
            end   = selection.getEndOffset();
        let selectedText = block.getText().slice(start, end);
        let newText = textToInsert(command) + selectedText;
        this.setState({
          editorState: appendText(
            editorState,
            content,
            selection,
            newText
          )
        });
      }
      return true;
    }
    return false;
  }

  render() {
    const { editorState } = this.state;

    return (
      <div className="app">
        <SplitPane split="vertical" defaultSize="50%">
          <div className="editor">
            <Editor
              editorState={this.state.editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              keyBindingFn={this.keyBindingFn}
              placeholder="Write something ... "
            />
          </div>
          <div className="preview">
            <Markdown source={editorState.getCurrentContent().getPlainText()}/>
          </div>
        </SplitPane>
      </div>
    );
  }
}

function appendText(editorState, content, selection, text) {
  return EditorState.push(
    editorState,
    Modifier.replaceText(
      content,
      selection,
      text
    ),
    'insert-characters'
  );
}
