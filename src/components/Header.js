import React, { Component } from 'react';
import { markdown } from 'markdown';

export default class Header extends Component {
  constructor() {
    super();
    this.onPress = (e) => this._onPress(e);
  }

  _onPress(e) {
    var lines = [
      markdown.toHTML("\\* and _ are interchangeable"),
      markdown.toHTML("**Bold**: \\*\\*text\\*\\* | cmd-b  "),
      markdown.toHTML("_Italics_: \\_text\\_ | cmd-i"),
      markdown.toHTML("# Header: # text | cmd-x")
    ];
    var preview = document.getElementById('preview_container');
    preview.innerHTML = '';
    for (let line of lines) preview.innerHTML += line;
  }

  render() {
    return (
      <div>
        Markdown Editor: <a onClick={this.onPress}>Help</a>
      </div>
    );
  }
}
