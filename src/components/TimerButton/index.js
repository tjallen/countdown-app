import React, { PropTypes } from 'react';
import Icon from '../Icon';

const TimerButton = (props) =>
  <button
    onClick={props.action}
  >
    <Icon glyph={props.glyph} />
  </button>;
TimerButton.propTypes = {
  action: PropTypes.func.isRequired,
  glyph: PropTypes.string,
};
export default TimerButton;
