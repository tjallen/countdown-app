import React, { PropTypes } from 'react';
import Icon from '../Icon';

import classNames from 'classnames/bind';
import styles from './TimerButton.scss';
const cx = classNames.bind(styles);

const TimerButton = ({ action, glyph, title }) => {
  let className = cx({
    btn: true,
    playpause: title === 'Play' || title === 'Pause',
    play: title === 'Play',
    pause: title === 'Pause',
  });
  return (
    <button
      onClick={action}
      title={title}
      className={className}
    >
      <Icon glyph={glyph} />
    </button>
  );
};

TimerButton.propTypes = {
  action: PropTypes.func.isRequired,
  glyph: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
};
export default TimerButton;
