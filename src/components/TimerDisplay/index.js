import React, { PropTypes } from 'react';

import styles from './TimerDisplay.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const TimerDisplay = ({ time, perc, paused }) => {
  let className = cx({
    timer: true,
    paused,
  });
  const percPlayed = `${perc}%`;
  const percStyles = {
    width: percPlayed,
  };
  return (
    <div>
      <div className={styles.percbg}>
        <div className={styles.percfilled} style={percStyles}></div>
      </div>
      <h2 className={className}>{time}</h2>
    </div>
  );
};
TimerDisplay.propTypes = {
  time: PropTypes.string.isRequired,
  perc: PropTypes.number,
  paused: PropTypes.bool,
};

export default TimerDisplay;
