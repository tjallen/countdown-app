import React, { PropTypes } from 'react';
import Icon from '../Icon';

import classNames from 'classnames/bind';
import styles from './TimerButton.scss';
const cx = classNames.bind(styles);

const TimerButton = ({
  action,
  glyph,
  text,
  title,
  type,
  active,
  customStyles,
}) => {
  let className = cx({
    btn: true,
    playpause: type === 'play' || type === 'pause',
    [type]: type !== undefined,
    active,
  });
  const optionalText = (text ? <span className={styles.text}>{text}</span> : null);
  const optionalGlyph = (glyph ? <Icon glyph={glyph} /> : null);
  return (
    <button
      style={customStyles}
      onClick={action}
      title={title}
      className={className}
    >
      {optionalGlyph}
      {optionalText}
    </button>
  );
};

TimerButton.propTypes = {
  action: PropTypes.func.isRequired,
  glyph: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  active: PropTypes.bool,
  className: PropTypes.string,
  customStyles: PropTypes.object,
};
export default TimerButton;
