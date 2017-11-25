import React from 'react';
import { render } from 'react-dom';
// import Popup from 'react-popup';
import MDEditor from './containers/MDEditor';
import Header from './components/Header.js'

render(
  <Header />,
  document.getElementById('header')
);

render(
  <MDEditor />,
  document.getElementById('editor_container')
);

/* render(
  <Popup className="mm-popup" />,
  document.getElementById('popup_container')
); */
