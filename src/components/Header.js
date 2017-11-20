import React, { Component } from 'react';
import { markdown } from 'markdown';

export default class Header extends Component {
  constructor() {
    super();
    this.onPress = (e) => this._onPress(e);
  }

  _onPress(e) {
    // eslint-disable-next-line
    var line1 = markdown.toHTML("**Bold**: \\*\\*text\*\* | \\_\\_text\_\_ | cmd-b"),
    // eslint-disable-next-line
        line2 = markdown.toHTML("_Italics_: \\*text\* | \\_text\_ | cmd-i"),
    // eslint-disable-next-line
        line3 = markdown.toHTML("# Header: # text | cmd-x");
    var preview = document.getElementById('preview_container');
    preview.innerHTML = line1 + line2 + line3;
  }

  render() {
    return (
      <div>
        Markdown Editor: <a onClick={this.onPress}>Help</a>
      </div>
    );
  }
}
