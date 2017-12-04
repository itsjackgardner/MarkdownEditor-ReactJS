import React, { Component } from 'react';
import { markdown } from 'markdown';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      fonts: false,
      show: false,
      previewText: 'Show',
    };
    this.helpPress = (e) => this._showHelp(e);
    this.previewPress = (e) => this._showHidePreview(e);
    this.fontPress = (e) => this._showFontOptions(e);
  }

  _showHelp(e) {
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

  _showHidePreview(e) {
    var show = this.state.show;
    var editor  = document.getElementById('editor_container'),
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

  _showFontOptions(e) {
    var fonts = this.state.fonts;
    var options = document.getElementById('font-options');
    if (!fonts) options.setAttribute('style', "display: block;");
    else options.setAttribute('style', "display: none;");
    this.setState({fonts: !fonts});
  }

  changeFont(font) {
    var container = document.getElementsByClassName('container')[0];
    var options = [
      "font-family: 'Cormorant Garamond', serif;  font-size: 30px;",
      "font-family: 'Proza Libre', sans-serif;    font-size: 23px;",
      "font-family: 'Share Tech Mono', monospace; font-size: 23px;",
      "font-family: 'Great Vibes', cursive;       font-size: 40px;",
      "font-family: 'Megrim', cursive;            font-size: 23px;",
    ]
    switch(font) {
      case 'serif':      container.setAttribute('style', options[0]); break;
      case 'sans-serif': container.setAttribute('style', options[1]); break;
      case 'monospace':  container.setAttribute('style', options[2]); break;
      case 'cursive':    container.setAttribute('style', options[3]); break;
      case 'funky':      container.setAttribute('style', options[4]); break;
    }
  }

  render() {
    var fontOptions = [];
    for (let font of ['serif', 'sans-serif', 'monospace', 'cursive', 'funky']) {
      fontOptions.push(<a onClick={(e) => this.changeFont(font)} value={font}>{font}</a>);
    }
    return (
      <div>
        Markdown Editor: <a onClick={this.helpPress}>Help</a> <a onClick={this.previewPress}>{this.state.previewText} Preview</a> <div class="dropdown">
          <a onClick={this.fontPress} class="dropbtn">Fonts <i class="fa fa-caret-down"></i></a>
          <div class="menu-options" id="font-options">
            {fontOptions}
          </div>
        </div>
      </div>
    );
  }
}
