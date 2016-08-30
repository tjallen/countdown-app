import React, { PropTypes } from 'react';
import styles from './styles.scss';

const TimerDisplay = (props) => {
  const perc = `${props.percCompleted}%`;
  const percStyles = {
    width: perc,
  };
  return (
    <div>
      <h2 className={styles.timer}>{props.time}</h2>
      <div className={styles.perc} style={percStyles}></div>
    </div>
  );
};
TimerDisplay.propTypes = {
  time: PropTypes.string.isRequired,
  percCompleted: PropTypes.number,
};

export default TimerDisplay;
