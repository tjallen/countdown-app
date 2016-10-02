import React, { PropTypes } from 'react';
import OverflowMenu from '../OverflowMenu';

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
  const overflowItems = [
    <a>Toggle loop</a>,
    <a>Toggle label</a>,
    <a>Repo</a>,
  ];
  return (
    <div>
      <div style={upperBar}></div>
      <div style={lowerStyle}>
        <h1 style={upperStyle}>{appTitle}</h1>
        <OverflowMenu>
          {overflowItems}
        </OverflowMenu>
      </div>
    </div>
  );
};
AppBar.propTypes = {
  appTitle: PropTypes.string,
};
export default AppBar;
