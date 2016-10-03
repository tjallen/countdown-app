import React, { PropTypes } from 'react';
import OverflowMenu from '../OverflowMenu';
import OverflowMenuItem from '../OverflowMenu/OverflowMenuItem';

const AppBar = ({ appTitle, toggleLoop, toggleLabel }) => {
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
  return (
    <div>
      <div style={upperBar}></div>
      <div style={lowerStyle}>
        <h1 style={upperStyle}>{appTitle}</h1>
        <OverflowMenu>
          <OverflowMenuItem
            preventMenuHide
            onClick={toggleLoop}
          >
            Toggle loop
          </OverflowMenuItem>
          <OverflowMenuItem
            preventMenuHide
            onClick={toggleLabel}
          >
            Toggle label
          </OverflowMenuItem>
          <OverflowMenuItem>
            <a href="#">Outside link with no preventMenuHide</a>
          </OverflowMenuItem>
        </OverflowMenu>
      </div>
    </div>
  );
};
AppBar.propTypes = {
  appTitle: PropTypes.string,
};
export default AppBar;
