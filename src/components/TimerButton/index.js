import React, { PropTypes } from 'react';
import Icon from '../Icon';

import classNames from 'classnames/bind';
import styles from './TimerButton.scss';
const cx = classNames.bind(styles);

const TimerButton = ({ action, glyph, title, type, active }) => {
  let className = cx({
    btn: true,
    playpause: type === 'play' || type === 'pause',
    [type]: type !== undefined,
    active,
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
  type: PropTypes.string,
  active: PropTypes.bool,
  className: PropTypes.string,
};
export default TimerButton;
