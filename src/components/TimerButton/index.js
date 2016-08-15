import React from 'react';
import Icon from '../Icon';

const TimerButton = (props) =>
  <button
    onClick={props.action}
  >
    <Icon glyph={props.glyph} />
  </button>;
export default TimerButton;
