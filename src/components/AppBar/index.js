import React, { PropTypes } from 'react';

import kebab from '../../icons/ic_more_vert_24px.svg';
import Icon from '../Icon';

const AppBar = ({ appTitle }) => {
  const upperBar = {
    height: '14px',
    backgroundColor: '#263238',
  };
  const lowerStyle = {
    height: '56px',
    backgroundColor: '#37474F',
    padding: '15px',
  };
  const upperStyle = {
    margin: '0',
    float: 'left',
    fontWeight: 'normal',
    width: 'auto',
    display: 'inline-block',
  };
  const kebabStyle = {
    display: 'inline-block',
    float: 'right',
    fill: '#fff',
  };
  return (
    <div>
      <div style={upperBar}></div>
      <div style={lowerStyle}>
        <h1 style={upperStyle}>{appTitle}</h1>
        <a href="#" style={kebabStyle}><Icon glyph={kebab} /></a>
      </div>
    </div>
  );
};
AppBar.propTypes = {
  appTitle: PropTypes.string,
};
export default AppBar;
