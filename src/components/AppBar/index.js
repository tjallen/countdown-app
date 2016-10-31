import React, { PropTypes } from 'react';
import OverflowMenu from '../OverflowMenu';
import OverflowMenuItem from '../OverflowMenu/OverflowMenuItem';

const AppBar = ({ appTitle, toggleLoop, loopStatus }) => {
  const upperBar = {
    height: '14px',
    backgroundColor: '#263238',
  };
  const lowerStyle = {
    height: '56px',
    backgroundColor: '#37474F',
    padding: '19px',
  };
  const upperStyle = {
    margin: '0',
    float: 'left',
    fontWeight: 'normal',
    width: 'auto',
    display: 'inline-block',
    fontSize: '1.5em',
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
            active={loopStatus}
            toggle
          >
            Looping timer
          </OverflowMenuItem>
          <OverflowMenuItem>
            <a href="https://github.com/tjallen/chime">Github repo</a>
          </OverflowMenuItem>
        </OverflowMenu>
      </div>
    </div>
  );
};
AppBar.propTypes = {
  appTitle: PropTypes.string,
  toggleLoop: PropTypes.func,
  loopStatus: PropTypes.bool,
};
export default AppBar;
