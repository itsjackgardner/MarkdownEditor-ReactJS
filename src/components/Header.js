import React, { Component } from 'react';
import { markdown } from 'markdown';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      previewText: 'Show'
    };
    this.helpPress = (e) => this.showHelp(e);
    this.previewPress = (e) => this.showHidePreview(e);
  }

  showHelp(e) {
    var lines = [
      markdown.toHTML("\\* and _ are interchangeable"),
      markdown.toHTML("**Bold**: \\*\\*text\\*\\* | cmd-b  "),
      markdown.toHTML("_Italics_: \\_text\\_ | cmd-i"),
      markdown.toHTML("# Header: # text | cmd-x")
    ];
    var preview = document.getElementById('preview_container');
    preview.innerHTML = '';
    for (let line of lines) preview.innerHTML += line;
    if (!this.state.show) this.showHidePreview();
  }

  showHidePreview(e) {
    var show = this.state.show;
    var editor = document.getElementById('editor_container'),
        preview = document.getElementById('preview_container'),
        divider = document.getElementById('middle');
    if (!show) {
      editor.setAttribute('style', "width: 50%; display: inline-block;");
      divider.setAttribute('style', "width: 2%; display: inline-block;");
      preview.setAttribute('style', "width: 40%; display: inline-block;");
    } else {
      editor.setAttribute('style', "width: 100%; display: inline-block;");
      divider.setAttribute('style', "width: 0%; display: none;");
      preview.setAttribute('style', "width: 0%; display: none;");
    }
    this.setState({show: !show, previewText: show ? 'Show' : 'Hide'});
  }

  render() {
    return (
      <div>
        Markdown Editor: <a onClick={this.helpPress}>Help</a> <a onClick={this.previewPress}>{this.state.previewText} Preview</a>
      </div>
    );
  }
}
