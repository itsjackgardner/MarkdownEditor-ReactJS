import React from 'react';
import { render } from 'react-dom';
import MDEditor from './components/MDEditor';
// import Header from './components/Header';

// render(
//   <Header />,
//   document.getElementById('header')
// );

render(
  <MDEditor />,
  document.getElementById('container')
);
