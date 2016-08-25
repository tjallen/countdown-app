import React, { PropTypes } from 'react';
import Icon from '../Icon';

const TimerButton = ({ action, glyph, title }) =>
  <button
    onClick={action}
    title={title}
  >
    <Icon glyph={glyph} />
  </button>;
TimerButton.propTypes = {
  action: PropTypes.func.isRequired,
  glyph: PropTypes.string,
  title: PropTypes.string,
};
export default TimerButton;
