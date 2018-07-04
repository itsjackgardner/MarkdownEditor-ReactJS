import React, { Component } from 'react';
import { markdown } from 'markdown';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      fonts: false,
    };
    this.fonts = ['serif', 'sans-serif', 'monospace', 'cursive', 'funky'];
    this.fontPress = (e) => this._showFontOptions(e);
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
    container.setAttribute('style', options[this.fonts.indexOf(font)]);
  }

  render() {
    var fontOptions = [];
    for (let font of this.fonts)
      fontOptions.push(<a onClick={(e) => this.changeFont(font)} value={font}>{font}</a>);
    return (
      <div>
        <div class="dropdown">
          <a onClick={this.fontPress} class="dropbtn">Fonts <i class="fa fa-caret-down"></i></a>
          <div class="menu-options" id="font-options">
            {fontOptions}
          </div>
        </div>
      </div>
    );
  }
}
